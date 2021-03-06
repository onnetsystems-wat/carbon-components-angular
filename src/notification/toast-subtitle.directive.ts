import { Directive, HostBinding } from "@angular/core";

@Directive({
	selector: "[osToastSubtitle]"
})
export class ToastSubtitle {
	@HostBinding("class.bx--toast-notification__subtitle") baseClass = true;
}
