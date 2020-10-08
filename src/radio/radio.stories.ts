import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, select } from "@storybook/addon-knobs/angular";

import { RadioModule } from "../";
import { DocumentationModule } from "../documentation-component/documentation.module";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
	selector: "app-reactive-forms",
	template: `
		<form [formGroup]="formGroup">
			<os-radio-group
				aria-label="radiogroup"
				formControlName="radioGroup">
				<os-radio
					value="radio">
					zero
				</os-radio>
				<os-radio *ngFor="let radio of manyRadios"
					[value]="radio.num"
					[disabled]="radio.disabled">
					{{radio.num}}
				</os-radio>
			</os-radio-group>
		</form>

		<button (click)="changeSelected()">Set selected to three</button>
	`
})
class ReactiveFormsStory implements AfterViewInit, OnInit {
	public formGroup: FormGroup;

	manyRadios = [
		{ num: "one" },
		{ num: "two" },
		{ num: "three" },
		{ num: "four", disabled: true }
	];

	constructor(protected formBuilder: FormBuilder) {}

	changeSelected() {
		this.formGroup.get("radioGroup").setValue("three");
	}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			radioGroup: new FormControl()
		});
	}

	ngAfterViewInit() {
		this.formGroup.get("radioGroup").setValue("one");
	}
}

storiesOf("Components|Radio", module).addDecorator(
	moduleMetadata({
		declarations: [ReactiveFormsStory],
		imports: [RadioModule, DocumentationModule, ReactiveFormsModule]
	})
)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
		<fieldset class="bx--fieldset">
			<legend class="bx--label">{{label}}</legend>
			<os-radio-group
				aria-label="radiogroup"
				[(ngModel)]="radio"
				(change)="onChange($event)">
				<os-radio
					value="radio"
					[checked]="true">
					zero
				</os-radio>
				<os-radio *ngFor="let radio of manyRadios"
					[value]="radio.num"
					[disabled]="radio.disabled">
					{{radio.num}}
				</os-radio>
			</os-radio-group>
		</fieldset>
		`,
		props: {
			onChange: action("Radio change"),
			label: text("Label text", "Radio Button heading"),
			manyRadios: [
				{ num: "one" },
				{ num: "two" },
				{ num: "three" },
				{ num: "four", disabled: true }
			]
		}
	}))
	.add("Vertical", () => ({
		template: `
		<fieldset class="bx--fieldset">
			<legend class="bx--label">Radio button label</legend>

			<os-radio-group
				aria-label="radiogroup"
				orientation="vertical"
				[labelPlacement]="labelPlacement"
				[(ngModel)]="radio"
				(change)="onChange($event)">
				<os-radio
					value="radio"
					[checked]="true">
					zero
				</os-radio>
				<os-radio *ngFor="let radio of manyRadios"
					[value]="radio.num"
					[disabled]="radio.disabled">
					{{radio.num}}
				</os-radio>
			</os-radio-group>
		</fieldset>
		`,
		props: {
			onChange: action("Radio change"),
			labelPlacement: select("Label placement", ["right", "left"], "right"),
			manyRadios: [
				{ num: "one" },
				{ num: "two" },
				{ num: "three" },
				{ num: "four", disabled: true }
			]
		}
	}))
	.add("With reactive forms", () => ({
		template: `<app-reactive-forms></app-reactive-forms>`
	}))
	.add("Skeleton", () => ({
		template: `
		<os-radio-group skeleton="true">
			<os-radio></os-radio>
		</os-radio-group>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/RadioGroup.html"></os-documentation>
		`
	}));
