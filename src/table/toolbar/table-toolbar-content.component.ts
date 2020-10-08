import { Component, HostBinding } from "@angular/core";

@Component({
	selector: "os-table-toolbar-content",
	template: `<ng-content></ng-content>`
})
export class TableToolbarContent {
	@HostBinding("class.bx--toolbar-content") class = true;
}
