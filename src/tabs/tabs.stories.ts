import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, boolean, select } from "@storybook/addon-knobs/angular";

import { TabsModule } from "../";
import { Component, Input } from "@angular/core";
import { DocumentationModule } from "../documentation-component/documentation.module";

@Component({
	selector: "os-header-group",
	template: `
		<os-tab-header-group
			[type]="type"
			[followFocus]="followFocus"
			[cacheActive]="cacheActive"
			[isNavigation]="isNavigation">
			<os-tab-header [paneReference]="content1">
				Content 1
			</os-tab-header>
			<os-tab-header [paneReference]="content2">
				Content 2
			</os-tab-header>
			<os-tab-header [paneReference]="content3" disabled="true">
				Content 3
			</os-tab-header>
			<os-tab-header [paneReference]="content4">
				Content 4
			</os-tab-header>
		</os-tab-header-group>

		<os-tab #content1>
			Tab Content 1
		</os-tab>
		<os-tab #content2>
			Tab Content 2
		</os-tab>
		<os-tab #content3>
			Tab Content 3
		</os-tab>
		<os-tab #content4>
			Tab Content 4
		</os-tab>
	`
})
class TabStory {
	@Input() followFocus = true;
	@Input() cacheActive = false;
	@Input() isNavigation = true;
	@Input() type = "default";
}

storiesOf("Components|Tabs", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				TabsModule,
				DocumentationModule
			],
			declarations: [TabStory]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<os-tabs [followFocus]="followFocus" [isNavigation]="isNavigation" [cacheActive]="cacheActive">
				<os-tab heading="one">Tab Content 1</os-tab>
				<os-tab heading="two">Tab Content 2</os-tab>
				<os-tab heading="three">Tab Content 3</os-tab>
				<os-tab heading="four" disabled="true">Tab Content 4</os-tab>
			</os-tabs>
		`,
		props: {
			followFocus: boolean("followFocus", true),
			isNavigation: boolean("isNavigation", false),
			cacheActive: boolean("Cache active", true)
		}
	}))
	.add("Container", () => ({
		template: `
			<os-tabs type="container" [followFocus]="followFocus" [isNavigation]="isNavigation" [cacheActive]="cacheActive">
				<os-tab heading="one">Tab Content 1</os-tab>
				<os-tab heading="two">Tab Content 2</os-tab>
				<os-tab heading="three">Tab Content 3</os-tab>
				<os-tab heading="four" disabled="true">Tab Content 4</os-tab>
			</os-tabs>
		`,
		props: {
			followFocus: boolean("followFocus", true),
			isNavigation: boolean("isNavigation", false),
			cacheActive: boolean("Cache active", true)
		}
	}))
	.add("With template", () => ({
		template: `
			<ng-template #customTabs let-item>
				{{item ? item.name : "wait for it"}}
			</ng-template>
			<ng-template #iconTab>
				<div style="height: 14px;">
					Something custom
					<svg width="16" height="16" viewBox="0 0 16 16"
					style="height: 14px; width: 14px; fill: #3d70b2;">
						<path d="M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path>
						<path d="M9 13H7V7h2z"></path>
						<path d="M7 4a1 1 0 1 1 2 0 1 1 0 1 1-2 0"></path>
					</svg>
				</div>
			</ng-template>
			<os-tabs [type]="type" [followFocus]="followFocus" [isNavigation]="isNavigation">
				<os-tab *ngFor="let item of data; let i = index;" [heading]="customTabs" [context]="item">Tab Content {{i + 1}}</os-tab>
				<os-tab [heading]="iconTab">Tab Content Custom</os-tab>
			</os-tabs>
		`,
		props: {
			followFocus: boolean("followFocus", true),
			isNavigation: boolean("isNavigation", false),
			data: [
				{ name: "one" },
				{ name: "two" },
				{ name: "three" }
			],
			type: select("type", ["default", "container"], "default")
		}
	}))
	.add("Width before and after content", () => ({
		template: `
			<div style="font-weight: 600; padding-bottom: 10px; padding-top: 20px;">before</div>
			<os-tabs [type]="type" [followFocus]="followFocus" [isNavigation]="isNavigation">
				<os-tab heading="one">foo</os-tab>
				<os-tab heading="two">bar</os-tab>
				<span before>content before</span>
			</os-tabs>
			<div style="font-weight: 600; padding-bottom: 10px; padding-top: 20px;">after</div>
			<os-tabs [type]="type" [followFocus]="followFocus" [isNavigation]="isNavigation">
				<os-tab heading="one">foo</os-tab>
				<os-tab heading="two">bar</os-tab>
				<span after>content after</span>
			</os-tabs>
			<div style="font-weight: 600; padding-bottom: 10px; padding-top: 20px;">both</div>
			<os-tabs [type]="type" [followFocus]="followFocus" [isNavigation]="isNavigation">
				<os-tab heading="one">foo</os-tab>
				<os-tab heading="two">bar</os-tab>
				<span before>content before</span>
				<span after>content after</span>
			</os-tabs>
		`,
		props: {
			followFocus: boolean("followFocus", true),
			isNavigation: boolean("isNavigation", false),
			type: select("type", ["default", "container"], "default")
		}
	}))
	.add("With TabHeaderGroup", () => ({
		template: `
			<os-header-group
				[type]="type"
				[followFocus]="followFocus"
				[cacheActive]="cacheActive"
				[isNavigation]="isNavigation">
			</os-header-group>
		`,
		props: {
			followFocus: boolean("followFocus", true),
			cacheActive: boolean("Cache active", true),
			isNavigation: boolean("isNavigation", true),
			type: select("type", ["default", "container"], "default")
		}
	}))
	.add("Skeleton", () => ({
		template: `
			<os-tabs skeleton="true">
				<os-tab></os-tab>
				<os-tab></os-tab>
			</os-tabs>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/Tabs.html"></os-documentation>
		`
	}));
