import { Directive, HostBinding } from "@angular/core";

@Directive({
	selector: "[osToastCaption]"
})
export class ToastCaption {
	@HostBinding("class.bx--toast-notification__caption") baseClass = true;
}
