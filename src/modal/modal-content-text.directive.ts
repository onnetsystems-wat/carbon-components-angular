import { Directive, HostBinding } from "@angular/core";

@Directive({
	selector: "[osModalContentText]"
})
export class ModalContentText {
	@HostBinding("class.bx--modal-content__text") modalContentTextClass = true;
}
