import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import {
	withKnobs,
	number,
	text,
	boolean,
	select
} from "@storybook/addon-knobs/angular";

import { SliderModule } from "./index";
import { DocumentationModule } from "./../documentation-component/documentation.module";

storiesOf("Components|Slider", module).addDecorator(moduleMetadata({
	imports: [SliderModule, DocumentationModule]
}))
.addDecorator(withKnobs)
.add("Basic", () => ({
	template: `<os-slider [disabled]="disabled" aria-Label="Label for slider value"></os-slider>`,
	props: {
		disabled: boolean("disabled", false)
	}
}))
.add("Advanced", () => ({
	template: `
		<os-slider
			[label]="label"
			[min]="min"
			[max]="max"
			[step]="step"
			[value]="value"
			[shiftMultiplier]="shiftMultiplier"
			[disabled]="disabled"
			aria-Label="Label for slider value"
			(valueChange)="valueChange($event)">
			<span minLabel>{{minLabel}}</span>
			<span maxLabel>{{maxLabel}}</span>
			<input [ngClass]="{'bx--text-input--light': theme === 'light'}"/>
		</os-slider>
	`,
	props: {
		min: number("min", 0),
		max: number("max", 100),
		step: number("step", 1),
		value: number("value", 0),
		label: text("Label text", "Slider Label"),
		minLabel: text("minLabel", "0"),
		maxLabel: text("maxLabel", "100"),
		theme: select("Theme", ["dark", "light"], "dark"),
		disabled: boolean("disabled", false),
		shiftMultiplier: number("shiftMultiplier", 4),
		valueChange: action("Value changed")
	}
}))
.add("With NgModel", () => ({
	template: `
		<os-slider [(ngModel)]="model" [disabled]="disabled" aria-Label="Label for slider value"></os-slider>
		<br>
		<span>model: {{model}}</span>
	`,
	props: {
		model: 0,
		disabled: boolean("disabled", false)
	}
}))
.add("Skeleton", () => ({
	template: `
		<os-slider skeleton="true"></os-slider>
	`
}))
.add("Documentation", () => ({
	template: `
		<os-documentation src="documentation/components/Slider.html"></os-documentation>
	`
}));
