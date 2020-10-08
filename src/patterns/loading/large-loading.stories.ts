import { Component } from "@angular/core";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs/angular";
import { GridModule } from "../../grid/index";
import { UIShellModule } from "../../ui-shell/index";
import { ProgressIndicatorModule } from "../../progress-indicator/index";
import { PlaceholderModule } from "../../placeholder/index";
import { InputModule } from "../../input/index";
import { DropdownModule } from "../../dropdown/index";
import { LoadingModule } from "../../loading/index";
import { ButtonModule } from "../../button/index";
import {
	FormGroup,
	FormControl,
	Validators,
	FormsModule,
	ReactiveFormsModule
} from "@angular/forms";

@Component({
	selector: "app-sample-large-loading",
	template: `
	<div osGrid>
		<div osRow class="header">
			<os-header name="Patterns">
				<os-hamburger></os-hamburger>
			</os-header>
		</div>
		<div osRow class="progress-indicator-wrapper">
			<os-progress-indicator [steps]="steps"></os-progress-indicator>
		</div>
		<div osRow class="form">
			<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
				<div class="bx--form-item">
					<os-label
						helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
						[invalid]="isInvalid('input')"
						invalidText="Please enter a response">
						Text input label
						<input
							osText
							formControlName="input"
							placeholder="Optional placeholder text">
					</os-label>
				</div>
				<div class="bx--form-item">
					<os-label
						helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
						[invalid]="isInvalid('textArea')"
						invalidText="Please enter a response">
						Text input label
						<textarea
							osTextArea
							formControlName="textArea"
							placeholder="Optional placeholder text">
						</textarea>
					</os-label>
				</div>
				<div class="bx--form-item">
					<div class="dropdown-wrapper">
						<os-dropdown
							label="Choose one option"
							[invalid]="isInvalid('dropdown')"
							invalidText="Please choose an option"
							placeholder="Select an option"
							formControlName="dropdown">
							<os-dropdown-list [items]="items"></os-dropdown-list>
						</os-dropdown>
					</div>
				</div>
				<div class="bx--form-item">
					<button
						class="form-button"
						osButton
						type="submit">
						Show Loading
					</button>
				</div>
			</form>
		</div>
	</div>
	<os-loading
		*ngIf="isLoading"
		[isActive]="isLoading"
		size="normal"
		[overlay]="overlay">
	</os-loading>
	`,
	styles: [`
		.header {
			margin-bottom: 80px;
		}

		.progress-indicator-wrapper {
			margin-bottom: 50px;
		}

		.dropdown-wrapper {
			width: 50%;
		}
	`
	]
})
class SampleLargeLoading {
	isLoading = false;
	overlay = false;

	formGroup = new FormGroup({
		input: new FormControl("", [ Validators.required ]),
		textArea: new FormControl("", [ Validators.required ]),
		dropdown: new FormControl("", [ Validators.required ])
	});

	steps = [
		{
			text: "First step",
			state: ["complete"]
		},
		{
			text: "Second step",
			state: ["complete"],
			tooltip: { content: "Overflow tooltip content.", trigger: "click", placement: "bottom" }
		},
		{
			text: "Third step",
			state: ["current"],
			tooltip: {
				content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Animi consequuntur hic ratione aliquid cupiditate, nesciunt saepe iste
					blanditiis cumque maxime tenetur veniam est illo deserunt sint quae pariatur.
					Laboriosam, consequatur.`,
				trigger: "click",
				placement: "bottom"
			}
		},
		{
			text: "Fourth step",
			state: ["incomplete"]
		},
		{
			text: "Fifth step",
			state: ["incomplete"]
		}
	];

	items = [
		{ content: "Option 1" },
		{ content: "Option 2" },
		{ content: "Option 3" },
		{ content: "Option 4" },
		{ content: "Option 5" }
	];

	onSubmit() {
		this.isLoading = true;
		this.overlay = true;

		setTimeout(() => {
			this.isLoading = false;
			this.overlay = false;
		}, 2000);

		if (this.formGroup.invalid) {
			const invalidFields = [].slice.call(document.getElementsByClassName("ng-invalid"));
			invalidFields[1].focus();
		}
		return;
	}

	isInvalid(controlName: string): boolean {
		const control = this.formGroup.get(controlName);

		return control && control.invalid && (control.dirty || control.touched);
	}
}

storiesOf("Patterns|Loading", module)
	.addDecorator(
		moduleMetadata({
			declarations: [ SampleLargeLoading ],
			imports: [
				DropdownModule,
				GridModule,
				UIShellModule,
				ProgressIndicatorModule,
				PlaceholderModule,
				InputModule,
				LoadingModule,
				FormsModule,
				ReactiveFormsModule,
				ButtonModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Large Loading", () => ({
		template: `<app-sample-large-loading></app-sample-large-loading>`
	}));
