import { Directive, HostBinding } from "@angular/core";

@Directive({
	selector: "[osNotificationSubtitle]"
})
export class NotificationSubtitle {
	@HostBinding("class.bx--inline-notification__subtitle") baseClass = true;
}
