import { action } from "@storybook/addon-actions";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, boolean } from "@storybook/addon-knobs/angular";

import { UIShellModule } from "./index";
import { SearchModule } from "./../search/index";
import { DialogModule } from "./../dialog/index";
import { DocumentationModule } from "./../documentation-component/documentation.module";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
	CarbonModule,
	FadeModule
} from "@carbon/icons-angular";


@Component({
	selector: "app-bar",
	template: "<h1>bar</h1>"
})
class BarComponent { }

@Component({
	selector: "app-foo",
	template: "<h1>foo</h1>"
})
class FooComponent { }

storiesOf("Components|UI Shell", module)
	.addDecorator(
		moduleMetadata({
			declarations: [BarComponent, FooComponent],
			imports: [
				UIShellModule,
				CarbonModule,
				SearchModule,
				FadeModule,
				DialogModule,
				DocumentationModule,
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
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Header", () => ({
		template: `
			<os-header name="Systems">
				<os-hamburger *ngIf="hasHamburger" (click)="expanded($event)"></os-hamburger>
				<os-header-navigation>
					<os-header-item>Home</os-header-item>
					<os-header-item isCurrentPage="true">Users</os-header-item>
					<os-header-item>Statistics</os-header-item>
					<os-header-menu title="Settings">
						<os-header-item>Link 1</os-header-item>
						<os-header-item>Link 2</os-header-item>
						<os-header-item>Link 3</os-header-item>
					</os-header-menu>
				</os-header-navigation>
				<os-header-global>
					<os-header-action title="action">
						<svg icon ibmIconFade size="20"></svg>
					</os-header-action>
					<os-header-action title="action">
						<svg icon ibmIconFade size="20"></svg>
					</os-header-action>
				</os-header-global>
			</os-header>
		`,
		props: {
			hasHamburger: boolean("Show Hamburger", true),
			expanded: action("Menu clicked")
		}
	}))
	.add("Header with template", () => ({
		template: `
			<os-header name="[Platform]" [brand]="brandTemplate">
				<os-hamburger *ngIf="hasHamburger" (click)="expanded($event)"></os-hamburger>
				<os-header-navigation>
					<os-header-item>Catalog</os-header-item>
					<os-header-item>Docs</os-header-item>
					<os-header-item>Support</os-header-item>
					<os-header-menu title="Manage">
						<os-header-item>Link 1</os-header-item>
						<os-header-item>Link 2</os-header-item>
						<os-header-item>Link 3</os-header-item>
					</os-header-menu>
				</os-header-navigation>
				<os-header-global>
					<os-header-action title="action">
						<svg icon ibmIconFade size="20"></svg>
					</os-header-action>
					<os-header-action title="action">
						<svg icon ibmIconFade size="20"></svg>
					</os-header-action>
				</os-header-global>
			</os-header>

			<ng-template #brandTemplate>
				<a class="bx--header__name">
					<span class="bx--header__name--prefix">Onnet</span>
				</a>
			</ng-template>
		`,
		props: {
			hasHamburger: boolean("Show Hamburger", true),
			expanded: action("Menu clicked")
		}
	}))
	.add("Header with router", () => ({
		template: `
			<os-header name="[Platform]" [route]="['bar']">
				<os-header-navigation>
					<os-header-item [route]="['foo']">Catalog</os-header-item>
					<os-header-item [route]="['bar']">Docs</os-header-item>
					<os-header-item [route]="['foo']">Support</os-header-item>
					<os-header-menu title="Manage">
						<os-header-item [route]="['foo']">Link 1</os-header-item>
						<os-header-item [route]="['bar']">Link 2</os-header-item>
						<os-header-item [route]="['foo']">Link 3</os-header-item>
					</os-header-menu>
				</os-header-navigation>
			</os-header>
			<div style="margin-top: 2rem">
				<router-outlet></router-outlet>
			</div>
		`,
		props: {
			expanded: action("Menu clicked")
		}
	}))
	.add("Side Navigation", () => ({
		template: `
			<os-sidenav>
				<os-sidenav-item>
					<svg icon ibmIconFade size="16"></svg>
					Link
				</os-sidenav-item>
				<os-sidenav-item>
					<svg icon ibmIconFade size="16"></svg>
					Link
				</os-sidenav-item>
				<os-sidenav-menu title="Category title">
					<svg icon ibmIconFade size="16"></svg>
					<os-sidenav-item>Link</os-sidenav-item>
					<os-sidenav-item>Link</os-sidenav-item>
					<os-sidenav-item>Link</os-sidenav-item>
				</os-sidenav-menu>
			</os-sidenav>
		`,
		props: {
			options: [
				{
					content: "Option 1",
					value: 1
				},
				{
					content: "Option 2",
					value: 2
				},
				{
					content: "Option 3",
					value: 3
				}
			]
		}
	}))
	.add("Side Navigation with router", () => ({
		template: `
			<os-sidenav>
				<os-sidenav-item [route]="['foo']">
					<svg icon ibmIconFade size="16"></svg>
					Link
				</os-sidenav-item>
				<os-sidenav-item [route]="['bar']">
					<svg icon ibmIconFade size="16"></svg>
					Link
				</os-sidenav-item>
				<os-sidenav-menu title="Category title">
					<svg icon ibmIconFade size="16"></svg>
					<os-sidenav-item [route]="['foo']">Link</os-sidenav-item>
					<os-sidenav-item [route]="['bar']">Link</os-sidenav-item>
					<os-sidenav-item [route]="['foo']">Link</os-sidenav-item>
				</os-sidenav-menu>
			</os-sidenav>
			<div>
				<router-outlet></router-outlet>
			</div>
		`
	}))
	.add("Right Panel with router", () => ({
		template: `
			<os-panel expanded="true">
				<os-switcher-list>
					<os-switcher-list-item [route]="['foo']">Switcher item one</os-switcher-list-item>
					<os-switcher-list-item [route]="['bar']">Switcher item two</os-switcher-list-item>
					<os-switcher-list-item [route]="['foo']">Switcher item three</os-switcher-list-item>
					<os-switcher-list-item [route]="['bar']">Switcher item four</os-switcher-list-item>
				</os-switcher-list>
			</os-panel>
			<div>
				<router-outlet></router-outlet>
			</div>
		`
	}))
	.add("Together", () => ({
		template: `
			<os-header name="[Platform]">
				<os-hamburger *ngIf="hasHamburger" [active]="active" (selected)="active = !active"></os-hamburger>
				<os-header-navigation>
					<os-header-item>Catalog</os-header-item>
					<os-header-item>Docs</os-header-item>
					<os-header-item>Support</os-header-item>
					<os-header-menu title="Manage">
						<os-header-item>Link 1</os-header-item>
						<os-header-item>Link 2</os-header-item>
						<os-header-item>Link 3</os-header-item>
					</os-header-menu>
				</os-header-navigation>
				<os-header-global>
					<os-header-action #firstAction title="action">
						<svg icon ibmIconFade size="20" ></svg>
					</os-header-action>
					<os-header-action [(active)]="secondAction" title="action">
						<svg icon ibmIconFade size="20" ></svg>
					</os-header-action>
				</os-header-global>
			</os-header>
			<os-sidenav [expanded]="active">
				<os-sidenav-item>
					<svg icon ibmIconFade size="16"></svg>
					Link
				</os-sidenav-item>
				<os-sidenav-item>
					<svg icon ibmIconFade size="16"></svg>
					Link
				</os-sidenav-item>
				<os-sidenav-menu title="Category title">
					<svg icon ibmIconFade size="16"></svg>
					<os-sidenav-item>Link</os-sidenav-item>
					<os-sidenav-item [active]="hasActiveChild">Link</os-sidenav-item>
					<os-sidenav-item>Link</os-sidenav-item>
				</os-sidenav-menu>
			</os-sidenav>
			<os-panel [expanded]="firstAction.active"></os-panel>
			<os-panel [expanded]="secondAction">
				<os-switcher-list>
					<os-switcher-list-item active="true">Switcher item one</os-switcher-list-item>
					<os-switcher-list-item>Switcher item two</os-switcher-list-item>
					<os-switcher-list-item>Switcher item three</os-switcher-list-item>
					<os-switcher-list-item>Switcher item four</os-switcher-list-item>
				</os-switcher-list>
			</os-panel>
		`,
		props: {
			hasHamburger: boolean("Show Hamburger", true),
			active: boolean("Left panel active", true),
			secondAction: boolean("Second right panel active", false),
			hasActiveChild: boolean("Active side nav child", true),
			options: [
				{
					content: "Option 1",
					value: 1
				},
				{
					content: "Option 2",
					value: 2
				},
				{
					content: "Option 3",
					value: 3
				}
			]
		}
	}))
	.add("Side Navigation Rail", () => ({
		template: `
			<os-sidenav rail="true" [expanded]="false">
				<os-sidenav-item>
					<svg icon ibmIconFade size="16"></svg>
					Link
				</os-sidenav-item>
				<os-sidenav-item>
					<svg icon ibmIconFade size="16"></svg>
					Link
				</os-sidenav-item>
				<os-sidenav-menu title="Category title">
					<svg icon ibmIconFade size="16"></svg>
					<os-sidenav-item>Link</os-sidenav-item>
					<os-sidenav-item>Link</os-sidenav-item>
					<os-sidenav-item>Link</os-sidenav-item>
				</os-sidenav-menu>
			</os-sidenav>
		`,
		props: {
			options: [
				{
					content: "Option 1",
					value: 1
				},
				{
					content: "Option 2",
					value: 2
				},
				{
					content: "Option 3",
					value: 3
				}
			]
		}
	}))
	.add("With Model", () => ({
		template: `
			<os-header name="[Platform]">
				<os-hamburger *ngIf="hasHamburger" [active]="active" (selected)="active = !active"></os-hamburger>
				<os-header-navigation [navigationItems]="headerItems">
				</os-header-navigation>
				<os-header-global>
					<os-header-action #firstAction title="action">
						<svg
							width="20"
							height="20"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							aria-hidden="true">
							<path
								d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12
								12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86
								23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14
								14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59
								10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59
								10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
						</svg>
					</os-header-action>
					<os-header-action #secondAction title="action">
						<svg
							width="20"
							height="20"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							aria-hidden="true">
							<path
								d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12
								12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86
								23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14
								14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59
								10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59
								10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
						</svg>
					</os-header-action>
				</os-header-global>
			</os-header>
			<os-sidenav [navigationItems]="headerItems">
				<os-sidenav-menu title="Category title">
					<svg icon width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
						<path
							d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12
							12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86
							23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14
							14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59
							10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59
							10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
					</svg>
					<os-sidenav-item>Link</os-sidenav-item>
					<os-sidenav-item>Link</os-sidenav-item>
					<os-sidenav-item>Link</os-sidenav-item>
				</os-sidenav-menu>
			</os-sidenav>
			<os-panel [expanded]="firstAction.active"></os-panel>
			<os-panel [expanded]="secondAction.active">
				<os-switcher-list>
					<os-switcher-list-item active="true">Switcher item one</os-switcher-list-item>
					<os-switcher-list-item>Switcher item two</os-switcher-list-item>
					<os-switcher-list-item>Switcher item three</os-switcher-list-item>
					<os-switcher-list-item>Switcher item four</os-switcher-list-item>
				</os-switcher-list>
			</os-panel>
			<router-outlet></router-outlet>
		`,
		props: {
			hasHamburger: boolean("Show Hamburger", true),
			active: boolean("Left panel active", true),
			options: [
				{
					content: "Option 1",
					value: 1
				},
				{
					content: "Option 2",
					value: 2
				},
				{
					content: "Option 3",
					value: 3
				}
			],
			headerItems: [{
					type: "item",
					route: ["foo"],
					content: "Catalog"
				},
				{
					type: "item",
					route: ["bar"],
					content: "Docs"
				},
				{
					type: "item",
					route: ["foo"],
					content: "Support"
				},
				{
					type: "menu",
					title: "Manage",
					trigger: "click",
					menuItems: [
						{
							type: "item",
							route: ["foo"],
							content: "Link 1"
						},
						{
							type: "item",
							route: ["bar"],
							content: "Link 2"
						}
					]
				}
			]
		}
	}))
	.add("Use angular router attributes for routing", () => (
		{
			template: `
			<os-header name="[Platform]" [route]="['bar']" [useRouter]="true">
				<os-header-navigation>
					<os-header-item [route]="['foo']" [useRouter]="true" [activeLinkClass]="'item--active'">Catalog</os-header-item>
					<os-header-item [route]="['bar']" [useRouter]="true" [activeLinkClass]="['item--active', 'another-class']">Docs</os-header-item>
					<os-header-item [route]="['foo']" [useRouter]="true">Support</os-header-item>
					<os-header-menu title="Manage">
						<os-header-item [route]="['foo']" [useRouter]="true">Link 1</os-header-item>
						<os-header-item [route]="['bar']" [useRouter]="true">Link 2</os-header-item>
						<os-header-item [route]="['foo']" [useRouter]="true">Link 3</os-header-item>
					</os-header-menu>
				</os-header-navigation>
			</os-header>
			<div style="margin-top: 2rem">
				<router-outlet></router-outlet>
			</div>`
		}
	))
	.add("Header Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/Header.html"></os-documentation>
		`
	}))
	.add("Side Nav Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/SideNav.html"></os-documentation>
		`
	}));
