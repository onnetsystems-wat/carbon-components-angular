import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Tile } from "./tile.component";
import { ClickableTile } from "./clickable-tile.component";
import { ExpandableTile } from "./expandable-tile.component";
import { SelectionTile } from "./selection-tile.component";
import { TileGroup } from "./tile-group.component";
import { I18nModule } from "@onnetsystems-wat/onnet-design-systems/i18n";
import { LinkModule } from "@onnetsystems-wat/onnet-design-systems/link";

@NgModule({
	declarations: [
		Tile,
		ClickableTile,
		ExpandableTile,
		SelectionTile,
		TileGroup
	],
	exports: [
		Tile,
		ClickableTile,
		ExpandableTile,
		SelectionTile,
		TileGroup
	],
	imports: [
		CommonModule,
		I18nModule,
		LinkModule
	]
})
export class TilesModule {}
