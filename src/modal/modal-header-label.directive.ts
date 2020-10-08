import { Directive, HostBinding } from "@angular/core";

@Directive({
	selector: "[osModalHeaderLabel]"
})
export class ModalHeaderLabel {
	@HostBinding("class.bx--modal-header__label") modalHeaderLabelClass = true;
}
