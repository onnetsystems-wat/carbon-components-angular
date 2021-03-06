import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Loading } from "./loading.component";
import { I18nModule } from "@onnetsystems-wat/onnet-design-systems/i18n";

@NgModule({
	declarations: [Loading],
	exports: [Loading],
	imports: [CommonModule, I18nModule]
})
export class LoadingModule {}
