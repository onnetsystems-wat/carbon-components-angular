import {
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	TemplateRef,
	ViewEncapsulation
} from "@angular/core";
import { I18n } from "@onnetsystems-wat/onnet-design-systems/i18n";
import { OverflowMenuDirective } from "./overflow-menu.directive";

/**
 * The OverFlow menu component encapsulates the OverFlowMenu directive, and the menu iconography into one convienent component
 *
 * [See demo](../../?path=/story/overflow-menu--basic)
 *
 * html:
 * ```
 * <os-overflow-menu>
 *	<os-overflow-menu-option>Option 1</os-overflow-menu-option>
 *	<os-overflow-menu-option>Option 2</os-overflow-menu-option>
 * </os-overflow-menu>
 * ```
 *
 * <example-url>../../iframe.html?id=overflow-menu--basic</example-url>
 */
@Component({
	selector: "os-overflow-menu",
	template: `
		<div
			[osOverflowMenu]="options"
			[ngClass]="{'bx--overflow-menu--open': open}"
			[attr.aria-label]="buttonLabel"
			[flip]="flip"
			[isOpen]="open"
			(isOpenChange)="handleOpenChange($event)"
			[offset]="offset"
			[wrapperClass]="wrapperClass"
			role="button"
			aria-haspopup="true"
			class="bx--overflow-menu"
			[placement]="placement"
			tabindex="0">
			<ng-template *ngIf="customTrigger; else defaultIcon" [ngTemplateOutlet]="customTrigger"></ng-template>
		</div>
		<ng-template #options>
			<ng-content></ng-content>
		</ng-template>
		<ng-template #defaultIcon>
			<svg ibmIconOverflowMenuVertical size="16" class="bx--overflow-menu__icon"></svg>
		</ng-template>
	`,
	styles: [`
		.bx--overflow-menu--open {
			opacity: 1
		}

		/*
		Rotate the overflow menu container as well as the icon, since
		we calculate our menu position based on the container, not the icon.
		*/
		.bx--data-table-v2 .bx--overflow-menu {
			transform: rotate(90deg);
		}

		.bx--data-table-v2 .bx--overflow-menu__icon {
			transform: rotate(180deg);
		}
	`],
	encapsulation: ViewEncapsulation.None
})
export class OverflowMenu {
	@Input() buttonLabel = this.i18n.get().OVERFLOW_MENU.OVERFLOW;

	@Input() flip = false;

	@Input() placement: "bottom" | "top" = "bottom";

	@Input() open = false;

	@Output() openChange = new EventEmitter<boolean>();
	/**
	 * Sets the custom overflow menu trigger
	 */
	@Input() customTrigger: TemplateRef<any>;

	/**
	 * This specifies any vertical and horizontal offset for the position of the dialog
	 */
	@Input() offset: { x: number, y: number };

	@Input() wrapperClass = "";

	// @ts-ignore
	@ContentChild(OverflowMenuDirective, { static: false }) overflowMenuDirective: OverflowMenuDirective;

	constructor(protected elementRef: ElementRef, protected i18n: I18n) {}

	handleOpenChange(event: boolean) {
		this.open = event;
		this.openChange.emit(event);
	}
}
