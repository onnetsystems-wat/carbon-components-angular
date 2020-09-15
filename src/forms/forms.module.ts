// modules
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

// imports
import { CheckboxModule } from "@onnetsystems-wat/onnet-design-systems/checkbox";
import { ToggleModule } from "@onnetsystems-wat/onnet-design-systems/toggle";
import { RadioModule } from "@onnetsystems-wat/onnet-design-systems/radio";
import { InputModule } from "@onnetsystems-wat/onnet-design-systems/input";
import { ButtonModule } from "@onnetsystems-wat/onnet-design-systems/button";

@NgModule({
	exports: [
		CheckboxModule,
		ToggleModule,
		RadioModule,
		InputModule,
		ButtonModule
	],
	imports: [
		CommonModule,
		FormsModule,
		CheckboxModule,
		ToggleModule,
		RadioModule,
		InputModule,
		ButtonModule
	]
})
export class NFormsModule { }
