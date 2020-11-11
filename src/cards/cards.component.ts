import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
	HostBinding,
	HostListener
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
	selector: "os-card",
	template: `
		<div class="bx--card">
			<ng-content></ng-content>
		</div>
	`
})
export class Card {}
