import { Component, HostBinding } from "@angular/core";

/**
 * Container for `HeaderAction`s.
 */
@Component({
	selector: "os-header-global",
	template: `
		<ng-content></ng-content>
	`
})
export class HeaderGlobal {
	@HostBinding("class.bx--header__global") hostClass = true;
}
