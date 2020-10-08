import { Directive, HostBinding } from "@angular/core";

@Directive({
	selector: "[osTableHeaderTitle]"
})
export class TableHeaderTitle {
	@HostBinding("class.bx--data-table-header__title") titleClass = true;
}
