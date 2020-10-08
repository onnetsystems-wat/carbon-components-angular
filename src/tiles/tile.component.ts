import {
	Component,
	HostBinding
} from "@angular/core";

/**
 * Build application's tiles using this component.
 *
 * [See demo](../../?path=/story/tiles--basic)
 *
 * ## Basic usage
 *
 * ```html
 * <os-tile>
 * 		tile content
 * </os-tile>
 * ```
 *
 * <example-url>../../iframe.html?id=tiles--basic</example-url>
 */
@Component({
	selector: "os-tile",
	template: `<ng-content></ng-content>`
})
export class Tile {
	@HostBinding("class.bx--tile") tileClass = true;
}
