import {
	Directive,
	ElementRef,
	ViewContainerRef,
	Input,
	TemplateRef,
	HostListener
} from "@angular/core";
import { DialogDirective } from "../dialog.directive";
import { DialogService } from "../dialog.service";
import { OverflowMenuPane } from "./overflow-menu-pane.component";
import { EventService } from "@onnetsystems-wat/onnet-design-systems/utils";


/**
 * Directive for extending `Dialog` to create overflow menus.
 *
 * class: OverflowMenuDirective (extends DialogDirective)
 *
 *
 * selector: `osOverflowMenu`
 *
 *
 * ```html
 * <div [osOverflowMenu]="templateRef"></div>
 * <ng-template #templateRef>
 * 	<!-- overflow menu options here -->
 * </ng-template>
 * ```
 */
@Directive({
	selector: "[osOverflowMenu]",
	exportAs: "osOverflowMenu",
	providers: [
		DialogService
	]
})
export class OverflowMenuDirective extends DialogDirective {
	/**
	 * Takes a template ref of `OverflowMenuOptions`s
	 */
	@Input() osOverflowMenu: TemplateRef<any>;
	/**
	 * Controls wether the overflow menu is flipped
	 */
	@Input() flip = false;
	/**
	 * This specifies any vertical and horizontal offset for the position of the dialog
	 */
	@Input() offset: { x: number, y: number };
	/**
	 * Classes to add to the dialog container
	 */
	@Input() wrapperClass = "";

	/**
	 * Creates an instance of `OverflowMenuDirective`.
	 */
	constructor(
		protected elementRef: ElementRef,
		protected viewContainerRef: ViewContainerRef,
		protected dialogService: DialogService,
		protected eventService: EventService
	) {
		super(elementRef, viewContainerRef, dialogService, eventService);
		dialogService.setContext({ component: OverflowMenuPane });
	}

	updateConfig() {
		this.dialogConfig.content = this.osOverflowMenu;
		this.dialogConfig.flip = this.flip;
		this.dialogConfig.offset = this.offset;
		this.dialogConfig.wrapperClass = this.wrapperClass;
	}

	@HostListener("keydown", ["$event"])
	hostkeys(event: KeyboardEvent) {
		switch (event.key) {
			case "Enter":
			case " ":
				event.preventDefault();
				break;
		}
	}
}
