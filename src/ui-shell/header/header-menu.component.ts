import {
	Component,
	Input,
	HostListener,
	ElementRef
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { HeaderItemInterface } from "./header-navigation-items.interface";

/**
 * Dropdown menu container for navigation items.
 */
@Component({
	selector: "os-header-menu",
	template: `
		<li
			class="bx--header__submenu"
			style="height: 100%">
			<a
				class="bx--header__menu-item bx--header__menu-title"
				[href]="href"
				role="menuitem"
				tabindex="0"
				aria-haspopup="true"
				[attr.aria-expanded]="expanded">
				{{title}}
				<svg class="bx--header__menu-arrow" width="12" height="7" aria-hidden="true">
					<path d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z" />
				</svg>
			</a>
			<ul class="bx--header__menu" role="menu" [attr.aria-label]="title">
				<ng-content></ng-content>
				<ng-container *ngFor="let headerItem of headerItems">
					<os-header-item
						[href]="headerItem.href"
						[route]="headerItem.route"
						[routeExtras]="headerItem.routeExtras">
						{{ headerItem.content }}
					</os-header-item>
				</ng-container>
			</ul>
		</li>
	`
})
export class HeaderMenu {
	@Input() title: string;
	@Input() set href(v: string) {
		// Needed when component is created dynamically with a model.
		if (v === undefined) {
			return;
		}
		this._href = v;
	}

	get href() {
		return this.domSanitizer.bypassSecurityTrustUrl(this._href) as string;
	}
	@Input() trigger: "click" | "mouseover" = "click";

	/**
	 * Used to create header items through a model.
	 */
	@Input() headerItems: HeaderItemInterface[];

	public expanded = false;

	protected _href = "javascript:void(0)";

	constructor(protected domSanitizer: DomSanitizer, protected elementRef: ElementRef) { }

	@HostListener("click")
	onClick() {
		if (this.trigger === "click") {
			this.expanded = !this.expanded;
		}
	}

	@HostListener("mouseover")
	onMouseOver() {
		if (this.trigger === "mouseover") {
			this.expanded = true;
		}
	}

	@HostListener("mouseout")
	onMouseOut() {
		if (this.trigger === "mouseover") {
			this.expanded = false;
		}
	}

	@HostListener("focusout", ["$event"])
	onFocusOut(event) {
		if (!this.elementRef.nativeElement.contains(event.relatedTarget)) {
			this.expanded = false;
		}
	}
}
