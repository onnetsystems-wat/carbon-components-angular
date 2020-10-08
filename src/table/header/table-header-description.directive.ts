import { Directive, HostBinding } from "@angular/core";

@Directive({
	selector: "[osTableHeaderDescription]"
})
export class TableHeaderDescription {
	@HostBinding("class.bx--data-table-header__description") descriptionClass = true;
}
