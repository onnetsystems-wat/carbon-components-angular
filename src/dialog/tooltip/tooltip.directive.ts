import {
	Directive,
	Input,
	TemplateRef,
	ElementRef,
	Injector,
	ComponentFactoryResolver,
	ViewContainerRef,
	HostBinding
} from "@angular/core";
import { DialogDirective } from "../dialog.directive";
import { Tooltip } from "./tooltip.component";
import { DialogService } from "../dialog.service";
import { EventService } from "@onnetsystems-wat/onnet-design-systems/utils";


/**
 * Directive for extending `Dialog` to create tooltips.
 *
 * [See demo](../../?path=/story/tooltip--basic)
 *
 * class: TooltipDirective (extends PopoverDirective)
 *
 *
 * selector: `nTooltip`
 *
 *
 * ```html
 * <button nTooltip="I am a tooltip" placement="right" trigger="mouseenter" type="danger">Tooltip Right</button>
 * <button nTooltip="I am a tooltip" type="warning">Tooltip Top warning on click</button>
 * ```
 *
 * <example-url>../../iframe.html?id=tooltip--basic</example-url>
 */
@Directive({
	selector: "[osTooltip]",
	exportAs: "osTooltip",
	providers: [
		DialogService
	]
})
export class TooltipDirective extends DialogDirective {
	/**
	 * The string or template content to be exposed by the tooltip.
	 */
	@Input() osTooltip: string | TemplateRef<any>;
	/**
	 * Set tooltip type to reflect 'warning' or 'error' styles.
	 */
	// tslint:disable-next-line:no-input-rename
	@Input("tooltip-type") tooltipType: "warning" | "error" | "" = "";

	@HostBinding("tabindex") tabIndex = 0;

	@HostBinding("class.bx--tooltip__trigger") className = true;

	@HostBinding("attr.aria-describedby") get descriptorId(): string {
		return this.isOpen ? this.dialogConfig.compID : null;
	}

	/**
	 * Creates an instance of `TooltipDirective`.
	 */
	constructor(
		protected elementRef: ElementRef,
		protected viewContainerRef: ViewContainerRef,
		protected dialogService: DialogService,
		protected eventService: EventService
	) {
		super(elementRef, viewContainerRef, dialogService, eventService);
		dialogService.setContext({ component: Tooltip });
	}

	updateConfig() {
		this.dialogConfig.content = this.osTooltip;
		this.dialogConfig.type = this.tooltipType;
		this.dialogConfig.offset = this.offset;
	}
}
