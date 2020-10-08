import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs/angular";

import { ComboBoxModule } from "./combobox.module";
import { ButtonModule } from "../button/button.module";
import { DocumentationModule } from "./../documentation-component/documentation.module";
import {
	ReactiveFormsModule,
	FormGroup,
	FormBuilder,
	FormControl
} from "@angular/forms";
import {
	Component,
	OnInit,
	Input,
	AfterViewInit
} from "@angular/core";
import { ModalModule } from "../modal";
import { PlaceholderModule } from "../placeholder";

const getOptions = (override = {}) => {
	const options = {
		disabled: boolean("disabled", false),
		invalid: boolean("Invalid", false),
		invalidText: text("Invalid text", "A valid value is required"),
		label: text("Label", "ComboBox label"),
		helperText: text("Helper text", "Optional helper text."),
		items: [
			{
				content: "one"
			},
			{
				content: "two"
			},
			{
				content: "three"
			},
			{
				content: "four"
			}
		],
		selected: action("selection changed"),
		submit: action("submit"),
		size: select("size", ["sm", "md", "xl"], "md"),
		theme: select("theme", ["dark", "light"], "dark"),
		search: action("search")
	};

	return Object.assign({}, options, override);
};

@Component({
	selector: "app-dynamic-list-combobox",
	template: `
		<os-combo-box
			[(items)]="items"
			type="multi"
			(selected)="updateSelected($event)">
			<os-dropdown-list></os-dropdown-list>
		</os-combo-box>
	`
})
class DynamicListComboBox implements AfterViewInit {
	items = [
		{
			content: "one"
		},
		{
			content: "two"
		},
		{
			content: "three"
		},
		{
			content: "four"
		}
	];

	updateSelected(event) {
		this.items.forEach((item: any) => {
			if (event.some(selectedItem => selectedItem.content === item.content)) {
				item.selected = true;
			} else {
				item.selected = false;
			}
		});
	}

	ngAfterViewInit() {
		setInterval(() => {
			const newItems = JSON.parse(JSON.stringify(this.items));
			newItems.push({ content: `New ${newItems.length}` });
			this.items = newItems;
		}, 4000);
	}
}

@Component({
	selector: "app-reactive-combobox",
	template: `
		<form [formGroup]="sampleForm" (ngSubmit)="onSubmit(sampleForm)">
			<os-combo-box
				formControlName="combobox"
				[size]="size"
				[label]="label"
				[helperText]="helperText"
				itemValueKey="content"
				[theme]="theme"
				[items]="items">
				<os-dropdown-list></os-dropdown-list>
			</os-combo-box>
			selected: {{ sampleForm.get("combobox").value | json }}
			<os-combo-box
				style="margin-top: 40px"
				formControlName="multibox"
				[label]="label"
				[size]="size"
				itemValueKey="content"
				[helperText]="helperText"
				type="multi"
				[items]="items">
				<os-dropdown-list></os-dropdown-list>
			</os-combo-box>
			selected: {{ sampleForm.get("multibox").value | json }}
		</form>
	`
})
class ReactiveFormsCombobox implements OnInit {
	public sampleForm: FormGroup;
	@Input() items = [];
	@Input() label = "";
	@Input() helperText = "";
	@Input() size = "md";
	@Input() theme = "dark";

	constructor(private fb: FormBuilder) {}

	ngOnInit() {
		this.sampleForm = this.fb.group({
			combobox: new FormControl,
			multibox: new FormControl
		});

		this.sampleForm.get("combobox").setValue("four");
		this.sampleForm.get("multibox").setValue(["four", "two"]);
	}
}

@Component({
	selector: "app-mock-query-search",
	template: `
		<os-combo-box
			appendInline="true"
			[items]="filterItems"
			(search)="onSearch($event)">
			<os-dropdown-list></os-dropdown-list>
		</os-combo-box>
	`
})
class MockQueryCombobox {
	filterItems = [];

	onSearch() {
		setTimeout(() => {
			this.filterItems = [
				{ content: `Random ${Math.random()}` },
				{ content: `Random ${Math.random()}` },
				{ content: `Random ${Math.random()}` },
				{ content: `Random ${Math.random()}` }
			];
		}, 1000);
	}
}

@Component({
	selector: "app-combobox-modal",
	template: `
        <os-modal [open]="true" [hasScrollingContent]="false">
            <os-modal-header>Header label</os-modal-header>
            <section class="bx--modal-content">
                <h1>Sample modal works.</h1>
                <p class="bx--modal-content__text">{{modalText}}</p>
                <os-combo-box [items]="items">
					<os-dropdown-list></os-dropdown-list>
				</os-combo-box>
            </section>
		</os-modal>
		<os-placeholder></os-placeholder>
    `
})
class ComboBoxModal {
	@Input() modalText: string;
	@Input() items: any;
}

storiesOf("Components|Combobox", module)
	.addDecorator(
		moduleMetadata({
			declarations: [
				DynamicListComboBox,
				ReactiveFormsCombobox,
				MockQueryCombobox,
				ComboBoxModal
			],
			imports: [
				ComboBoxModule,
				ButtonModule,
				ReactiveFormsModule,
				DocumentationModule,
				ModalModule,
				PlaceholderModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<div style="width: 300px">
				<os-combo-box
					[disabled]="disabled"
					[invalid]="invalid"
					[size]="size"
					[invalidText]="invalidText"
					[label]="label"
					[helperText]="helperText"
					[items]="items"
					[theme]="theme"
					(selected)="selected($event)"
					(submit)="submit($event)"
					(search)="search($event)">
					<os-dropdown-list></os-dropdown-list>
				</os-combo-box>
			</div>
		`,
		props: getOptions()
	}))
	.add("Dynamically added list items", () => ({
		template: `
			<div style="width: 300px">
				<app-dynamic-list-combobox></app-dynamic-list-combobox>
			</div>
		`
	}))
	.add("Basic with max length", () => ({
		template: `
			<div style="width: 300px">
				<os-combo-box
					[disabled]="disabled"
					[invalid]="invalid"
					[size]="size"
					[invalidText]="invalidText"
					[label]="label"
					[helperText]="helperText"
					[items]="items"
					[theme]="theme"
					(selected)="selected($event)"
					(submit)="submit($event)"
					[maxLength]="maxLength">
					<os-dropdown-list></os-dropdown-list>
				</os-combo-box>
			</div>
		`,
		props: {
			...getOptions(),
			maxLength: number("Max length", 5)
		}
	}))
	.add("With dynamic search", () => ({
		template: `
			<div style="width: 300px">
				<os-combo-box
					[disabled]="disabled"
					[invalid]="invalid"
					[size]="size"
					[invalidText]="invalidText"
					[label]="label"
					[helperText]="helperText"
					[items]="items"
					[theme]="theme"
					(selected)="onSelected()"
					(search)="onSearch($event)">
					<os-dropdown-list></os-dropdown-list>
				</os-combo-box>
			</div>
		`,
		props: getOptions({
			onSelected: function() {
				this.invalid = false;
			},
			onSearch: function(event) {
				const selected = this.items.find(
					({ content }) => content.toLowerCase().includes(event.toLowerCase())
				);

				if (!selected) {
					this.invalid = true;
				} else {
					this.invalid = false;
				}
			}
		})
	}))
	.add("With template", () => ({
		template: `
			<div style="width: 300px">
				<os-combo-box
					[disabled]="disabled"
					[invalid]="invalid"
					[invalidText]="invalidText"
					[label]="label"
					[size]="size"
					[helperText]="helperText"
					[items]="items"
					[theme]="theme"
					(selected)="onSelected()"
					(search)="onSearch($event)">
					<os-dropdown-list></os-dropdown-list>
				</os-combo-box>

				<ng-template #invalidText>
					<div class="bx--form-requirement">This is a template</div>
				</ng-template>
			</div>
		`,
		props: getOptions({
			onSelected: function() {
				this.invalid = false;
			},
			onSearch: function(event) {
				const selected = this.items.find(
					({ content }) => content.toLowerCase().includes(event.toLowerCase())
				);

				if (!selected) {
					this.invalid = true;
				} else {
					this.invalid = false;
				}
			}
		})
	}))
	.add("Multi-select", () => ({
		template: `
			<div style="width: 300px">
				<os-combo-box
					[invalid]="invalid"
					[invalidText]="invalidText"
					[label]="label"
					[size]="size"
					[helperText]="helperText"
					[items]="items"
					[theme]="theme"
					[selectionFeedback]="selectionFeedback"
					type="multi"
					(selected)="selected($event)"
					(submit)="submit($event)">
					<os-dropdown-list></os-dropdown-list>
				</os-combo-box>
			</div>
		`,
		props: {
			...getOptions(),
			selectionFeedback: select("Selection feedback", ["top", "fixed", "top-after-reopen"], "top-after-reopen")
		}
	}))
	.add("With reactive forms", () => ({
		template: `
			<div style="width: 300px">
				<app-reactive-combobox
					[items]="items"
					[size]="size"
					[label]="label"
					[theme]="theme"
					[helperText]="helperText">
				</app-reactive-combobox>
			</div>
		`,
		props: getOptions()
	}))
	.add("With submit", () => ({
		template: `
			<div style="width: 300px">
				<os-combo-box
					[invalid]="invalid"
					[invalidText]="invalidText"
					[label]="label"
					[helperText]="helperText"
					[items]="items"
					[theme]="theme"
					[selectionFeedback]="selectionFeedback"
					[size]="size"
					type="multi"
					(selected)="selected($event)"
					(submit)="submit($event)">
					<os-dropdown-list></os-dropdown-list>
				</os-combo-box>
			</div>
		`,
		props: {
			...getOptions({
				submit: function(event) {
					// so the action still shows up in the "actions" panel
					action("submit")(event);
					if (event.value.content) {
						this.items = [
							...event.items,
							Object.assign({}, event.value, { selected: true })
						];
					}
				}
			}),
			selectionFeedback: select("Selection feedback", ["top", "fixed", "top-after-reopen"], "top-after-reopen")
		}
	}))
	.add("With ngModel", () => ({
		template: `
			<div style="width: 300px">
				<os-combo-box
					[invalid]="invalid"
					[invalidText]="invalidText"
					[label]="label"
					[size]="size"
					itemValueKey="content"
					[helperText]="helperText"
					[items]="items"
					[theme]="theme"
					[(ngModel)]="model"
					(selected)="selected($event)"
					(submit)="submit($event)">
					<os-dropdown-list></os-dropdown-list>
				</os-combo-box>

				<p>model: {{model | json}}</p>
			</div>
		`,
		props: getOptions({
			model: "three"
		})
	}))
	.add("Mock query search", () => ({
		template: `
			<app-mock-query-search></app-mock-query-search>
		`
	}))
	.add("In modal", () => ({
		template: `<app-combobox-modal [modalText]="modalText" [items]="items"></app-combobox-modal>`,
		props: getOptions({
			modalText: text("modal text", "Hello")
		})
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/ComboBox.html"></os-documentation>
		`
	}));
