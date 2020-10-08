import {
	Component,
	HostBinding,
	Input
} from "@angular/core";
import { NavigationItem } from "./header-navigation-items.interface";
/**
 * Container for header navigation items
 */
@Component({
	selector: "os-header-navigation",
	template: `
		<nav class="bx--header__nav" [attr.aria-label]="ariaLabel">
			<ul class="bx--header__menu-bar" role="menubar">
				<ng-content></ng-content>
				<ng-container *ngFor="let navigationItem of navigationItems">
					<os-header-item
						*ngIf="navigationItem.type === 'item'"
						[href]="navigationItem.href"
						[route]="navigationItem.route"
						[routeExtras]="navigationItem.routeExtras">
						{{ navigationItem.content }}
					</os-header-item>
					<os-header-menu
						*ngIf="navigationItem.type === 'menu'"
						[href]="navigationItem.href"
						[title]="navigationItem.title"
						[trigger]="navigationItem.trigger ? navigationItem.trigger : 'click'"
						[headerItems]="navigationItem.menuItems">
					</os-header-menu>
				</ng-container>
			</ul>
		</nav>
	`
})
export class HeaderNavigation {
	@HostBinding("style.height.%") height = 100;

	@Input() ariaLabel: string;

	/**
	 * Creates the header navigation items and menu items through a list of navigation item objects.
	 * In order for the navigation items to move to the side navigation when window size is less than 1056px,
	 * navigation items need to be passed into both os-header-navigation and os-sidenav.
	 */
	@Input() navigationItems: NavigationItem[];
}
