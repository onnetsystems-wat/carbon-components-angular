import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	ChevronDownModule,
	CloseModule,
	WarningFilledModule
} from "@carbon/icons-angular";

import { ComboBox } from "./combobox.component";
import { DropdownModule, DropdownService } from "@onnetsystems-wat/onnet-design-systems/dropdown";
import { I18nModule } from "@onnetsystems-wat/onnet-design-systems/i18n";
import { UtilsModule } from "@onnetsystems-wat/onnet-design-systems/utils";

@NgModule({
	declarations: [
		ComboBox
	],
	exports: [
		ComboBox,
		DropdownModule
	],
	imports: [
		CommonModule,
		DropdownModule,
		ChevronDownModule,
		CloseModule,
		WarningFilledModule,
		I18nModule,
		UtilsModule
	],
	providers: [ DropdownService ]
})
export class ComboBoxModule {}
