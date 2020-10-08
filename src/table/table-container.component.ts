import { Component, HostBinding } from "@angular/core";

@Component({
	selector: "os-table-container",
	template: `<ng-content></ng-content>`,
	styles: [`
		:host { display: block }
	`]
})
export class TableContainer {
	@HostBinding("class.bx--data-table-container") containerClass = true;
}
