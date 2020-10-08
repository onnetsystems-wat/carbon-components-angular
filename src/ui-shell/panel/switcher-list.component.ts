import { Component } from "@angular/core";

/**
 * Container for switcher items.
 *
 * ```html
 * <os-switcher-list>
 * 	<os-switcher-list-item>one</os-switcher-list-item>
 * 	<os-switcher-list-item [active]="true">two</os-switcher-list-item>
 * 	<os-switcher-list-item>three</os-switcher-list-item>
 * </os-switcher-list>
 * ```
 */
@Component({
	selector: "os-switcher-list",
	template: `
		<ul class="bx--switcher">
			<ng-content></ng-content>
		</ul>
	`
})
export class SwitcherList {}
