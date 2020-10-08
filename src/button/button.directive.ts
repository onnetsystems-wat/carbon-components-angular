import {
	Directive,
	HostBinding,
	Input,
	OnInit
} from "@angular/core";
import { ButtonSize, ButtonType } from "./button.types";

/**
 * A convenience directive for applying styling to a button.
 *
 * [See demo](../../?path=/story/button--basic)
 *
 * Example:
 *
 * ```html
 * <button osButton>A button</button>
 * <button osButton="secondary">A secondary button</button>
 * ```
 *
 * See the [vanilla carbon docs](http://www.carbondesignsystem.com/components/button/code) for more detail.
 *
 * <example-url>../../iframe.html?id=button--basic</example-url>
 */
@Directive({
	selector: "[osButton]"
})
export class Button implements OnInit {
	/**
	 * sets the button type
	 */
	@Input() osButton: ButtonType = "primary";
	/**
	 * Specify the size of the button
	 */
	@Input() size: ButtonSize;
	// a whole lot of HostBindings ... this way we don't have to touch the elementRef directly
	@HostBinding("class.bx--btn") get baseClass() {
		return !this.toolbarAction;
	}
	@HostBinding("class.bx--btn--primary") get primaryButton() {
		return this.osButton === "primary";
	}
	@HostBinding("class.bx--btn--secondary") get secondaryButton() {
		return this.osButton === "secondary";
	}
	@HostBinding("class.bx--btn--tertiary") get tertiaryButton() {
		return this.osButton === "tertiary";
	}
	@HostBinding("class.bx--btn--ghost") get ghostButton() {
		return this.osButton === "ghost";
	}
	@HostBinding("class.bx--btn--danger") get dangerButton() {
		return this.osButton === "danger" || this.osButton === "danger--primary";
	}
	@HostBinding("class.bx--skeleton") @Input() skeleton = false;
	@HostBinding("class.bx--btn--sm") get smallSize() {
		return this.size === "sm";
	}
	@HostBinding("class.bx--btn--field") get fieldSize() {
		return this.size === "field";
	}
	@HostBinding("class.bx--toolbar-action") toolbarAction = false;
	@HostBinding("class.bx--overflow-menu") overflowMenu = false;

	ngOnInit() {
		if (!this.osButton) {
			this.osButton = "primary";
		}
	}
}
