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
		<ibm-tile>
			tile content goes here...
		</ibm-tile>
		`
	}))
	.add("Multiple", () => ({
		template: `
		<div style="display: flex; flex-flow: row wrap; justify-content: space-around;">
			<ibm-tile style="margin-right: 4px">
				Tile 1
			</ibm-tile>
			<ibm-tile style="margin-right: 4px">
				Tile 2
			</ibm-tile>
			<ibm-tile>
				Tile 3
			</ibm-tile>
		</div>
		`
	}))
	.add("Clickable", () => ({
		template: `
		<ibm-clickable-tile href="https://www.onnetsystems.net/" target="_blank">
			Click the tile to open the Onnet website
		</ibm-clickable-tile>
		`
	}))
	.add("Routable", () => ({
		template: `
			<ibm-clickable-tile [route]="['foo']">
				Click to trigger the <code>foo</code> route
			</ibm-clickable-tile>
			<ibm-clickable-tile [route]="['bar']">
				Click to trigger the <code>bar</code> route
			</ibm-clickable-tile>
			<router-outlet></router-outlet>
		`
	}))
	.add("Selectable", () => ({
		template: `
			<ibm-tile-group (selected)="selected($event)" [multiple]="false">
				<ibm-selection-tile value="tile1" [selected]="true">Selectable Tile</ibm-selection-tile>
				<ibm-selection-tile value="tile2">Selectable Tile</ibm-selection-tile>
				<ibm-selection-tile value="tile3">Selectable Tile</ibm-selection-tile>
			</ibm-tile-group>
		`,
		props: {
			selected: action("tile selected")
		}
	}))
	.add("Multi-select", () => ({
		template: `
			<ibm-tile-group (selected)="selected($event)" [multiple]="true">
				<ibm-selection-tile value="tile1" [selected]="true">Selectable Tile</ibm-selection-tile>
				<ibm-selection-tile value="tile2">Selectable Tile</ibm-selection-tile>
				<ibm-selection-tile value="tile3">Selectable Tile</ibm-selection-tile>
			</ibm-tile-group>
		`,
		props: {
			selected: action("tile selected")
		}
	}))
	.add("Expandable", () => ({
		template: `
		<ibm-expandable-tile>
			<span class="bx--tile-content__above-the-fold" style="height: 200px">Above the fold content here</span>
			<span class="bx--tile-content__below-the-fold" style="height: 400px">Below the fold content here</span>
		</ibm-expandable-tile>
		`
	}))
	.add("Skeleton", () => ({
		template: `
		<ibm-tile>
			<div class="skeleton-placeholder">
				<ibm-skeleton-placeholder></ibm-skeleton-placeholder>
			</div>
			<div class="skeleton-text">
				<ibm-skeleton-text [lines]="3"></ibm-skeleton-text>
			</div>
		</ibm-tile>
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
			<ibm-documentation src="documentation/components/Tile.html"></ibm-documentation>
		`
	}));
