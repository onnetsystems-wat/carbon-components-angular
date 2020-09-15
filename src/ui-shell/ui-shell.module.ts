import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { I18nModule } from "@onnetsystems-wat/onnet-design-systems/i18n";

import { HeaderModule } from "./header/header.module";
import { SideNavModule } from "./sidenav/sidenav.module";
import { PanelModule } from "./panel/panel.module";

@NgModule({
	imports: [
		CommonModule,
		I18nModule,
		HeaderModule,
		SideNavModule,
		PanelModule
	],
	exports: [
		HeaderModule,
		SideNavModule,
		PanelModule
	]
})
export class UIShellModule { }
