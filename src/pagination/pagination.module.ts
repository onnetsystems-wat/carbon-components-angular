import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
	ChevronDownModule,
	CaretLeftModule,
	CaretRightModule
} from "@carbon/icons-angular";

import { Pagination } from "./pagination.component";
import { I18nModule } from "@onnetsystems-wat/onnet-design-systems/i18n";
import { ExperimentalModule } from "@onnetsystems-wat/onnet-design-systems/experimental";

@NgModule({
	declarations: [
		Pagination
	],
	exports: [
		Pagination
	],
	imports: [
		CommonModule,
		FormsModule,
		I18nModule,
		ExperimentalModule,
		ChevronDownModule,
		CaretLeftModule,
		CaretRightModule
	]
})
export class PaginationModule {}
