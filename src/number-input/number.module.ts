// modules
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
	CaretUpModule,
	CaretDownModule,
	WarningFilledModule
} from "@carbon/icons-angular";

// imports
import { Number } from "./number.component";
import { I18nModule } from "@onnetsystems-wat/onnet-design-systems/i18n";

@NgModule({
	declarations: [
		Number
	],
	exports: [
		Number
	],
	imports: [
		FormsModule,
		CommonModule,
		I18nModule,
		CaretUpModule,
		CaretDownModule,
		WarningFilledModule
	]
})
export class NumberModule { }
