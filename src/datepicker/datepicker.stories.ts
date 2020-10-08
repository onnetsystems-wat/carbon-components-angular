import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import {
	withKnobs,
	array,
	select,
	text,
	boolean
} from "@storybook/addon-knobs/angular";
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormsModule,
	ReactiveFormsModule
} from "@angular/forms";
import {
	Component,
	Output,
	EventEmitter,
	Input
} from "@angular/core";
import { DatePickerModule } from "../datepicker/index";
import { ButtonModule } from "../forms/index";
import { TabsModule } from "../tabs/index";
import { ModalModule, BaseModal } from "../modal/index";
import { DocumentationModule } from "./../documentation-component/documentation.module";

const modalText =
	`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non egestas neque.
	Etiam aliquet nisl non volutpat vehicula.
	Aliquam finibus sapien et erat suscipit euismod.
	Sed dapibus condimentum nisl, eu condimentum felis tempor sit amet. Pellentesque tempus velit vel nisi scelerisque facilisis.
	Ut dapibus nibh ac suscipit venenatis.
	Aliquam ex purus, consequat eu volutpat vel, scelerisque vel leo. Nunc congue tellus lectus, pretium lobortis erat mattis congue.
	Ut dapibus nibh ac suscipit venenatis.
	Aliquam ex purus, consequat eu volutpat vel, scelerisque vel leo. Nunc congue tellus lectus, pretium lobortis erat mattis congue.
	Integer facilisis, erat nec iaculis gravida, est libero ornare mauris, venenatis mollis risus eros et metus.
	Sed ornare massa tristique arcu pulvinar fermentum.`;

@Component({
	selector: "app-date-picker",
	template: `
		<form [formGroup]="formGroup">
			<os-date-picker
				formControlName="single"
				label="Date Picker Label"
				invalidText="Invalid date format"
				[invalid]="invalidSingle"
				(valueChange)="valueChange.emit($event)">
			</os-date-picker>
			<code>{{formGroup.controls["single"].value | json}}</code>
			<br><br>
			<os-date-picker
				range="true"
				formControlName="range"
				label="Date Picker Label"
				rangeLabel="Date Picker Label"
				invalidText="Invalid date format"
				[pattern]="pattern"
				[invalid]="invalidRange"
				(valueChange)="valueChange.emit($event)">
			</os-date-picker>
			<code>{{formGroup.controls["range"].value | json}}</code>
		</form>
	`
})
class DatePickerStory {
	@Output() valueChange = new EventEmitter();

	get invalidSingle() {
		return this.formGroup.controls["single"].invalid && this.formGroup.controls["single"].touched;
	}

	get invalidRange() {
		return this.formGroup.controls["range"].invalid && this.formGroup.controls["range"].touched;
	}

	formGroup: FormGroup;

	constructor(protected formBuilder: FormBuilder) {
		this.formGroup = this.formBuilder.group({
			single: [
				[new Date()],
				Validators.required
			],
			range: [
				[
					new Date(),
					new Date(
						new Date().getFullYear(),
						new Date().getMonth() + 1,
						new Date().getDate())
				],
				Validators.required
			]
		});
	}
}

@Component({
	selector: "app-date-picker-modal",
	template: `
        <os-modal [open]="true">
            <os-modal-header>Header label</os-modal-header>
            <section class="bx--modal-content">
                <h1>Sample modal works.</h1>
                <p class="bx--modal-content__text">{{modalText}}</p>
                <os-date-picker
                    label="Date Picker Label"
                    rangeLabel="Date Picker Label"
                    invalidText="Invalid date format">
                </os-date-picker>
                <p class="bx--modal-content__text">{{modalText}}</p>
            </section>
        </os-modal>
    `
})
class DatePickerModalStory {
	@Input() modalText: string;
}

storiesOf("Components|Date Picker", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				DatePickerModule,
				FormsModule,
				ReactiveFormsModule,
				DocumentationModule,
				ButtonModule,
				TabsModule,
				ModalModule
			],
			declarations: [
				DatePickerStory,
				DatePickerModalStory
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Simple", () => ({
		template: `
		<os-date-picker-input
			[theme]="theme"
			[label]="label"
			[placeholder]="placeholder"
			[disabled]="disabled"
			[size]="size"
			[invalid]="invalid"
			[invalidText]="invalidText"
			(valueChange)="valueChange($event)">
		</os-date-picker-input>
		`,
		props: {
			theme: select("Theme", ["dark", "light"], "dark"),
			label: text("Label text", "Date Picker Label"),
			placeholder: text("Placeholder text", "mm/dd/yyyy"),
			invalidText: text("Form validation content", "Invalid date format"),
			invalid: boolean("Show form validation", false),
			size: select("Size", ["sm", "md", "xl"], "md"),
			disabled: boolean("Disabled", false),
			valueChange: action("Date change fired!")
		}
	}))
	.add("Single", () => ({
		template: `
			<p>With initial value</p>
			<os-date-picker
				[label]="label"
				id="initial-value-datepicker"
				[placeholder]="placeholder"
				[language]="language"
				[size]="size"
				[theme]="theme"
				[value]="value"
				[disabled]="disabled"
				[invalid]="invalid"
				[invalidText]="invalidText"
				[dateFormat]="dateFormat"
				(valueChange)="valueChange($event)">
			</os-date-picker>
			<p style="margin-top: 20px;">Without initial value</p>
			<os-date-picker
				[label]="label"
				[placeholder]="placeholder"
				[language]="language"
				[size]="size"
				[theme]="theme"
				[disabled]="disabled"
				[invalid]="invalid"
				[invalidText]="invalidText"
				[dateFormat]="dateFormat"
				(valueChange)="valueChange($event)">
			</os-date-picker>
		`,
		props: {
			language: select("Calendar language", ["en", "de", "fi", "ja", "zh", "es", "fr", "it", "ko", "pt"], "en"),
			size: select("Size", ["sm", "md", "xl"], "md"),
			valueChange: action("Date change fired!"),
			theme: select("Theme", ["dark", "light"], "dark"),
			label: text("Label text", "Date Picker Label"),
			placeholder: text("Placeholder text", "mm/dd/yyyy"),
			invalidText: text("Form validation content", "Invalid date format"),
			invalid: boolean("Show form validation", false),
			disabled: boolean("Disabled", false),
			dateFormat: text("Date format", "m/d/Y"),
			value: array("Value", ["10/19/2019"])
		}
	}))
	.add("Range", () => ({
		template: `
		<p>With initial value</p>
		<os-date-picker
			[label]="label"
			[rangeLabel]="label"
			[size]="size"
			range="true"
			id="initial-value-datepicker"
			[placeholder]="placeholder"
			[language]="language"
			[theme]="theme"
			[disabled]="disabled"
			[invalid]="invalid"
			[invalidText]="invalidText"
			[rangeInvalid]="invalid"
			[rangeInvalidText]="invalidText"
			[dateFormat]="dateFormat"
			[value]="value"
			(valueChange)="valueChange($event)">
		</os-date-picker>
		<p style="margin-top: 20px;">Without initial value</p>
		<os-date-picker
			[label]="label"
			[rangeLabel]="label"
			[size]="size"
			range="true"
			[language]="language"
			[placeholder]="placeholder"
			[theme]="theme"
			[disabled]="disabled"
			[invalid]="invalid"
			[invalidText]="invalidText"
			[dateFormat]="dateFormat"
			(valueChange)="valueChange($event)">
		</os-date-picker>
		`,
		props: {
			language: select("Calendar language", ["en", "de", "fi", "ja", "zh", "es", "fr", "it", "ko", "pt"], "en"),
			size: select("Size", ["sm", "md", "xl"], "md"),
			valueChange: action("Date change fired!"),
			theme: select("Theme", ["dark", "light"], "dark"),
			label: text("Label text", "Date Picker Label"),
			placeholder: text("Placeholder text", "mm/dd/yyyy"),
			invalidText: text("Form validation content", "Invalid date format"),
			invalid: boolean("Show form validation", false),
			disabled: boolean("Disabled", false),
			dateFormat: text("Date format", "m/d/Y"),
			value: array("Value", ["09/19/2019", "10/19/2019"])
		}
	}))
	.add("With reactive forms", () => ({
		template: `
		<app-date-picker
			(valueChange)="valueChange($event)">
		</app-date-picker>
		`,
		props: {
			valueChange: action("Date change fired!")
		}
	}))
	.add("With ngModel", () => ({
		template: `
			<div>
				<os-date-picker
					label="Date picker label"
					[size]="size"
					[(ngModel)]="single">
				</os-date-picker>
				<button
					osButton
					(click)="single = null"
					style="margin-top: 5px">
					Send null
				</button>
				<button
					osButton
					(click)="single = [date]"
					style="margin-left: 5px; margin-top: 5px">
					Send date
				</button>
				<br>
				<code>{{ single | json }}</code>
			</div>
			<div style="margin-top: 15px;">
				<os-date-picker
					[size]="size"
					label="Date picker"
					rangeLabel="Range label"
					range="true"
					[(ngModel)]="range">
				</os-date-picker>
				<button
					osButton
					(click)="range = null"
					style="margin-top: 5px">
					Send null
				</button>
				<button
					osButton
					(click)="range = rangeDates"
					style="margin-left: 5px; margin-top: 5px">
					Send date
				</button>
				<br>
				<code>{{ range | json }}</code>
			</div>
		`,
		props: {
			date: new Date(new Date().getFullYear(), 5, 15),
			size: select("Size", ["sm", "md", "xl"], "md"),
			rangeDates: [
				new Date(new Date().getFullYear(), 5, 15),
				new Date(new Date().getFullYear(), 8, 19)
			]
		}
	}))
	.add("In tabs", () => ({
		template: `
			<os-tabs>
				<os-tab heading="one">
					Tab Content 1
					<p>With initial value</p>
					<os-date-picker
						[label]="label"
						[size]="size"
						[placeholder]="placeholder"
						[theme]="theme"
						[value]="value"
						[disabled]="disabled"
						[invalid]="invalid"
						[invalidText]="invalidText"
						[dateFormat]="dateFormat"
						(valueChange)="valueChange($event)">
					</os-date-picker>
					<p style="margin-top: 20px;">Without initial value</p>
					<os-date-picker
						[label]="label"
						[size]="size"
						[placeholder]="placeholder"
						[theme]="theme"
						[disabled]="disabled"
						[invalid]="invalid"
						[invalidText]="invalidText"
						[dateFormat]="dateFormat"
						(valueChange)="valueChange($event)">
					</os-date-picker>
				</os-tab>
				<os-tab heading="two">
					<p>With initial value</p>
					<os-date-picker
						[label]="label"
						[placeholder]="placeholder"
						[size]="size"
						[theme]="theme"
						[value]="value"
						[disabled]="disabled"
						[invalid]="invalid"
						[invalidText]="invalidText"
						[dateFormat]="dateFormat"
						(valueChange)="valueChange($event)">
					</os-date-picker>
					<p style="margin-top: 20px;">Without initial value</p>
					<os-date-picker
						[label]="label"
						[placeholder]="placeholder"
						[size]="size"
						[theme]="theme"
						[disabled]="disabled"
						[invalid]="invalid"
						[invalidText]="invalidText"
						[dateFormat]="dateFormat"
						(valueChange)="valueChange($event)">
					</os-date-picker>
				</os-tab>
				<os-tab heading="three">Tab Content 3</os-tab>
			</os-tabs>
		`,
		props: {
			valueChange: action("Date change fired!"),
			size: select("Size", ["sm", "md", "xl"], "md"),
			theme: select("Theme", ["dark", "light"], "dark"),
			label: text("Label text", "Date Picker Label"),
			placeholder: text("Placeholder text", "mm/dd/yyyy"),
			invalidText: text("Form validation content", "Invalid date format"),
			invalid: boolean("Show form validation", false),
			disabled: boolean("Disabled", false),
			dateFormat: text("Date format", "m/d/Y"),
			value: array("Value", ["10/19/2019"])
		}
	}))
	.add("In modal", () => ({
		template: `<app-date-picker-modal [modalText]="modalText"></app-date-picker-modal>`,
		props: {
			modalText: text("modal text", modalText)
		}
	}))
	.add("Skeleton", () => ({
		template: `
		<os-date-picker
			range="true"
			skeleton="true">
		</os-date-picker>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/DatePicker.html"></os-documentation>
		`
	}));
