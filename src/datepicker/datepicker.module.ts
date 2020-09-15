import { DatePickerInputModule } from "@onnetsystems-wat/onnet-design-systems/datepicker-input";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatePicker } from "./datepicker.component";
import { UtilsModule } from "@onnetsystems-wat/onnet-design-systems/utils";
import { I18nModule } from "@onnetsystems-wat/onnet-design-systems/i18n";

@NgModule({
	declarations: [
		DatePicker
	],
	exports: [
		DatePicker,
		DatePickerInputModule
	],
	imports: [
		CommonModule,
		DatePickerInputModule,
		UtilsModule,
		I18nModule
	]
})
export class DatePickerModule { }
