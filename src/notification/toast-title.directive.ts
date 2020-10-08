import { Directive, HostBinding } from "@angular/core";

@Directive({
	selector: "[osToastTitle]"
})
export class ToastTitle {
	@HostBinding("class.bx--toast-notification__title") baseClass = true;
}
