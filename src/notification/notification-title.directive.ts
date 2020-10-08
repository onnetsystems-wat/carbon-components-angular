import { Directive, HostBinding } from "@angular/core";

@Directive({
	selector: "[osNotificationTitle]"
})
export class NotificationTitle {
	@HostBinding("class.bx--inline-notification__title") baseClass = true;
}
