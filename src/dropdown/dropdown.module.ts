import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { Dropdown } from "./dropdown.component";
import { DropdownList } from "./list/dropdown-list.component";
import { AbstractDropdownView } from "./abstract-dropdown-view.class";

import { ScrollableList } from "./scrollable-list.directive";
import { I18nModule } from "@onnetsystems-wat/onnet-design-systems/i18n";
import { PlaceholderModule } from "@onnetsystems-wat/onnet-design-systems/placeholder";
import { DropdownService } from "./dropdown.service";
import { ChevronDownModule, WarningFilledModule, CheckmarkModule } from "@carbon/icons-angular";
import { UtilsModule } from "@onnetsystems-wat/onnet-design-systems/utils";

@NgModule({
	declarations: [
		Dropdown,
		DropdownList,
		ScrollableList,
		AbstractDropdownView
	],
	exports: [
		Dropdown,
		DropdownList,
		ScrollableList,
		AbstractDropdownView
	],
	imports: [
		CommonModule,
		CheckmarkModule,
		FormsModule,
		I18nModule,
		PlaceholderModule,
		ChevronDownModule,
		WarningFilledModule,
		UtilsModule
	],
	providers: [ DropdownService ]
})
export class DropdownModule {}
