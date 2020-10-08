import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import {
	withKnobs,
	select,
	boolean,
	text
} from "@storybook/addon-knobs/angular";

import { SelectModule } from "../";
import { DocumentationModule } from "../documentation-component/documentation.module";
import { Component, OnInit } from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	FormControl,
	ReactiveFormsModule
} from "@angular/forms";

@Component({
	selector: "app-reactive-form",
	template: `
		<form [formGroup]="formGroup">
			<os-select formControlName="selecterino">
				<option value="default" disabled selected hidden>Choose an option</option>
				<option value="option1">Option 1</option>
				<option value="option2">Option 2</option>
				<option value="option3">Option 3</option>
			</os-select>
		</form>

		<button (click)="clearSelection()">Clear selection</button>
	`
})
class ReactiveFormsSelect implements OnInit {
	public formGroup: FormGroup;

	constructor(protected formBuilder: FormBuilder) {}

	clearSelection() {
		this.formGroup.get("selecterino").setValue("default");
	}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			selecterino: new FormControl()
		});

		this.formGroup.get("selecterino").setValue("option2");
	}
}

storiesOf("Components|Select", module).addDecorator(
	moduleMetadata({
		declarations: [ReactiveFormsSelect],
		imports: [
			SelectModule,
			DocumentationModule,
			ReactiveFormsModule
		]
	})
)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<os-select
				[disabled]="disabled"
				[size]="size"
				[invalid]="invalid"
				[invalidText]="invalidText"
				[label]="label"
				[helperText]="helperText"
				[theme]="theme"
				[display]="display">
				<option value="" disabled selected hidden>Choose an option</option>
				<option value="solong">A much longer option that is worth having around to check how text flows</option>
				<optgroup label="Category 1">
					<option value="option1">Option 1</option>
					<option value="option2">Option 2</option>
				</optgroup>
				<optgroup label="Category 2">
					<option value="option1">Option 1</option>
					<option value="option2">Option 2</option>
				</optgroup>
			</os-select>
	`,
		props: {
			disabled: boolean("Disabled", false),
			size: select("Size", ["sm", "md", "xl"], "md"),
			invalid: boolean("Show form validation", false),
			invalidText: text("Form validation content", "Please select an option."),
			label: text("Label text", "Select Label"),
			helperText: text("Helper text", "Optional helper text."),
			theme: select("Theme", ["dark", "light"], "dark"),
			display: select("Display", ["default", "inline"], "default")
		}
	}))
	.add("With ngModel", () => ({
		template: `
			<div style="width: 165px">
				<os-select [(ngModel)]="model" [size]="size">
					<option value="default" disabled selected hidden>Choose an option</option>
					<option value="option1">Option 1</option>
					<option value="option2">Option 2</option>
					<option value="option3">Option 3</option>
				</os-select>
				<br>
				<span>Selected: {{ model }}</span>
			</div>
		`,
		props: {
			size: select("Size", ["sm", "md", "xl"], "md"),
			model: "default"
		}
	}))
	.add("With reactive forms", () => ({
		template: `<app-reactive-form></app-reactive-form>`
	}))
	.add("Skeleton", () => ({
		template: `
		<div style="width: 300px">
			<os-select skeleton="true"></os-select>
		</div>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/Select.html"></os-documentation>
		`
	}));
