import {
	Component,
	Input,
	Output,
	EventEmitter,
	ElementRef,
	ViewChild,
	OnInit,
	AfterViewInit,
	OnDestroy,
	HostListener
} from "@angular/core";
import {
	Observable,
	Subscription,
	fromEvent
} from "rxjs";
import { throttleTime } from "rxjs/operators";
// the AbsolutePosition is required to import the declaration correctly
import Position, { position, AbsolutePosition, Positions } from "@carbon/utils-position";
import { cycleTabs, getFocusElementList } from "@onnetsystems-wat/onnet-design-systems/common";
import { DialogConfig } from "./dialog-config.interface";
import { ElementService } from "@onnetsystems-wat/onnet-design-systems/utils";

/**
 * Implements a `Dialog` that can be positioned anywhere on the page.
 * Used to implement a popover or tooltip.
 */
@Component({
	selector: "ibm-dialog",
	template: ""
})
export class Dialog implements OnInit, AfterViewInit, OnDestroy {
	/**
	 * Emits event that handles the closing of a `Dialog` object.
	 */
	@Output() close: EventEmitter<any> = new EventEmitter();
	/**
	 * Receives `DialogConfig` interface object with properties of `Dialog`
	 * explicitly defined.
	 */
	@Input() dialogConfig: DialogConfig;
	/**
	 * Maintains a reference to the view DOM element of the `Dialog`.
	 */
	// @ts-ignore
	@ViewChild("dialog", { static: false }) dialog: ElementRef;

	/**
	 * Stores the data received from `dialogConfig`.
	 */
	public data = {};

	/**
	 * The placement of the `Dialog` is received from the `Position` service.
	 */
	public placement: string;

	protected visibilitySubscription = new Subscription();
	/**
	 * Handles offsetting the `Dialog` item based on the defined position
	 * to not obscure the content beneath.
	 */
	protected addGap = {
		"left": pos => position.addOffset(pos, 0, -this.dialogConfig.gap),
		"right": pos => position.addOffset(pos, 0, this.dialogConfig.gap),
		"top": pos => position.addOffset(pos, -this.dialogConfig.gap),
		"bottom": pos => position.addOffset(pos, this.dialogConfig.gap),
		"left-bottom": pos => position.addOffset(pos, 0, -this.dialogConfig.gap),
		"right-bottom": pos => position.addOffset(pos, 0, this.dialogConfig.gap)
	};

	/**
	 * Extra placements. Child classes can add to this for use in `placeDialog`.
	 */
	protected placements: Positions = {};

	/**
	 * Creates an instance of `Dialog`.
	 * @param elementRef
	 * @param elementService
	 */
	constructor(
		protected elementRef: ElementRef,
		protected elementService: ElementService
	) {}

	/**
	 * Initialize the `Dialog`, set the placement and gap, and add a `Subscription` to resize events.
	 */
	ngOnInit() {
		this.placement = this.dialogConfig.placement.split(",")[0];
		this.data = this.dialogConfig.data;

		// run any additional initialization code that consuming classes may have
		this.onDialogInit();
	}

	/**
	 * After the DOM is ready, focus is set and dialog is placed
	 * in respect to the parent element.
	 */
	ngAfterViewInit() {
		const dialogElement = this.dialog.nativeElement;
		// split the wrapper class list and apply separately to avoid IE
		// 1. throwing an error due to assigning a readonly property (classList)
		// 2. throwing a SyntaxError due to passing an empty string to `add`
		if (this.dialogConfig.wrapperClass) {
			for (const extraClass of this.dialogConfig.wrapperClass.split(" ")) {
				dialogElement.classList.add(extraClass);
			}
		}

		// only focus the dialog if there are focusable elements within the dialog
		if (getFocusElementList(this.dialog.nativeElement).length > 0) {
			dialogElement.focus();
		}

		const parentElement = this.dialogConfig.parentRef.nativeElement;

		this.visibilitySubscription = this.elementService
			.visibility(parentElement, parentElement)
			.subscribe(value => {
				this.placeDialog();
				if (!value.visible) {
					this.doClose();
				}
			}
		);

		this.placeDialog();
		// run afterDialogViewInit on the next tick
		setTimeout(() => this.afterDialogViewInit());
	}

	/**
	 * Empty method to be overridden by consuming classes to run any additional initialization code.
	 */
	onDialogInit() {}

	/**
	 * Empty method to be overridden by consuming classes to run any additional initialization code after the view is available.
	 * NOTE: this does _not_ guarantee the dialog will be positioned, simply that it will exist in the DOM
	 */
	afterDialogViewInit() {}

	/**
	 * Uses the position service to position the `Dialog` in screen space
	 */
	placeDialog(): void {
		const positionService = new Position(this.placements);
		// helper to find the position based on the current/given environment
		const findPosition = (reference, target, placement) => {
			let pos;
			if (this.dialogConfig.appendInline) {
				pos = this.addGap[placement](positionService.findRelative(reference, target, placement));
			} else {
				pos = this.addGap[placement](positionService.findAbsolute(reference, target, placement));
			}

			if (this.dialogConfig.offset) {
				// Apply vertical and horizontal offsets given through the dialogConfig
				pos.top = pos.top + this.dialogConfig.offset.y;
				pos.left = pos.left + this.dialogConfig.offset.x;
			}

			return pos;
		};

		let parentEl = this.dialogConfig.parentRef.nativeElement;
		let el = this.dialog.nativeElement;
		let dialogPlacement = this.placement;

		// split always returns an array, so we can just use the auto position logic
		// for single positions too
		const placements = this.dialogConfig.placement.split(",");

		// find the best placement
		dialogPlacement = positionService.findBestPlacement(parentEl, el, placements);

		// calculate the final position
		const pos = findPosition(parentEl, el, dialogPlacement);

		// update the element
		positionService.setElement(el, pos);
		setTimeout(() => { this.placement = dialogPlacement; });
	}

	/**
	 * Sets up a KeyboardEvent to close `Dialog` with Escape key.
	 * @param event
	 */
	@HostListener("keydown", ["$event"])
	escapeClose(event: KeyboardEvent) {
		switch (event.key) {
			case "Esc": // IE specific value
			case "Escape": {
				event.stopImmediatePropagation();
				this.doClose();
				break;
			}
			case "Tab": {
				cycleTabs(event, this.elementRef.nativeElement);
				break;
			}
		}
	}

	/**
	 * Sets up a event Listener to close `Dialog` if click event occurs outside
	 * `Dialog` object.
	 * @param event
	 */
	@HostListener("document:click", ["$event"])
	clickClose(event) {
		if (!this.elementRef.nativeElement.contains(event.target)
			&& !this.dialogConfig.parentRef.nativeElement.contains(event.target) ) {
			this.doClose();
		}
	}

	/**
	 * Closes `Dialog` object by emitting the close event upwards to parents.
	 */
	public doClose() {
		this.close.emit();
	}

	/**
	 * At destruction of component, `Dialog` unsubscribes from all the subscriptions.
	 */
	ngOnDestroy() {
		this.visibilitySubscription.unsubscribe();
	}
}
