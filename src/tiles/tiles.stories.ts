import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs/angular";
import { action } from "@storybook/addon-actions";

import { TilesModule } from "../tiles";
import { SkeletonModule } from "../skeleton/index";
import { RouterModule } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";
import { Component } from "@angular/core";
import { DocumentationModule } from "../documentation-component/documentation.module";

@Component({
	selector: "app-bar",
	template: "<h1>bar</h1>"
})
class BarComponent { }

@Component({
	selector: "app-foo",
	template: "<h1>foo</h1>"
})
class FooComponent {}

storiesOf("Components|Tiles", module)
	.addDecorator(
		moduleMetadata({
			declarations: [FooComponent, BarComponent],
			imports: [
				TilesModule,
				DocumentationModule,
				SkeletonModule,
				RouterModule.forRoot([
					{
						path: "bar",
						component: BarComponent
					},
					{
						path: "foo",
						component: FooComponent
					}
				], {
					initialNavigation: false,
					useHash: true
				})
			],
			providers: [
				{provide: APP_BASE_HREF, useValue: "/"}
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
		<os-tile>
			tile content goes here...
		</os-tile>
		`
	}))
	.add("Multiple", () => ({
		template: `
		<div style="display: flex; flex-flow: row wrap; justify-content: space-around;">
			<os-tile style="margin-right: 4px">
				Tile 1
			</os-tile>
			<os-tile style="margin-right: 4px">
				Tile 2
			</os-tile>
			<os-tile>
				Tile 3
			</os-tile>
		</div>
		`
	}))
	.add("Clickable", () => ({
		template: `
		<os-clickable-tile href="https://www.onnetsystems.net/" target="_blank">
			Click the tile to open the Onnet website
		</os-clickable-tile>
		`
	}))
	.add("Routable", () => ({
		template: `
			<os-clickable-tile [route]="['foo']">
				Click to trigger the <code>foo</code> route
			</os-clickable-tile>
			<os-clickable-tile [route]="['bar']">
				Click to trigger the <code>bar</code> route
			</os-clickable-tile>
			<router-outlet></router-outlet>
		`
	}))
	.add("Selectable", () => ({
		template: `
			<os-tile-group (selected)="selected($event)" [multiple]="false">
				<os-selection-tile value="tile1" [selected]="true">Selectable Tile</os-selection-tile>
				<os-selection-tile value="tile2">Selectable Tile</os-selection-tile>
				<os-selection-tile value="tile3">Selectable Tile</os-selection-tile>
			</os-tile-group>
		`,
		props: {
			selected: action("tile selected")
		}
	}))
	.add("Multi-select", () => ({
		template: `
			<os-tile-group (selected)="selected($event)" [multiple]="true">
				<os-selection-tile value="tile1" [selected]="true">Selectable Tile</os-selection-tile>
				<os-selection-tile value="tile2">Selectable Tile</os-selection-tile>
				<os-selection-tile value="tile3">Selectable Tile</os-selection-tile>
			</os-tile-group>
		`,
		props: {
			selected: action("tile selected")
		}
	}))
	.add("Expandable", () => ({
		template: `
		<os-expandable-tile>
			<span class="bx--tile-content__above-the-fold" style="height: 200px">Above the fold content here</span>
			<span class="bx--tile-content__below-the-fold" style="height: 400px">Below the fold content here</span>
		</os-expandable-tile>
		`
	}))
	.add("Skeleton", () => ({
		template: `
		<os-tile>
			<div class="skeleton-placeholder">
				<os-skeleton-placeholder></os-skeleton-placeholder>
			</div>
			<div class="skeleton-text">
				<os-skeleton-text [lines]="3"></os-skeleton-text>
			</div>
		</os-tile>
		`,
		styles: [`
			.skeleton-placeholder {
				margin-bottom: 10px;
			}
		`
		]
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/Tile.html"></os-documentation>
		`
	}));
