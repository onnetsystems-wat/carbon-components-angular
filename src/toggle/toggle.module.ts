// modules
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

// imports
import { I18nModule } from "@onnetsystems-wat/onnet-design-systems/i18n";
import { Toggle } from "./toggle.component";

@NgModule({
	declarations: [
		Toggle
	],
	exports: [
		Toggle
	],
	imports: [
		CommonModule,
		FormsModule,
		I18nModule
	]
})
export class ToggleModule { }
