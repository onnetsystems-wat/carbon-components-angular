import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
} from "@angular/core";
import {
	ReactiveFormsModule,
	FormBuilder,
	FormGroup,
	FormControl
} from "@angular/forms";

import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import {
	withKnobs,
	select,
	boolean,
	object,
	text
} from "@storybook/addon-knobs/angular";

import { of } from "rxjs";
import { PlaceholderModule } from "../placeholder/index";
import { DocumentationModule } from "./../documentation-component/documentation.module";
import { DropdownModule } from "./dropdown.module";
import { ModalModule } from "../modal";

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
	Sed ornare massa tristique arcu pulvinar fermentum.
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non egestas neque.
	Etiam aliquet nisl non volutpat vehicula.
	Aliquam finibus sapien et erat suscipit euismod.
	Sed dapibus condimentum nisl, eu condimentum felis tempor sit amet. Pellentesque tempus velit vel nisi scelerisque facilisis.
	Ut dapibus nibh ac suscipit venenatis.
	Aliquam ex purus, consequat eu volutpat vel, scelerisque vel leo. Nunc congue tellus lectus, pretium lobortis erat mattis congue.
	Ut dapibus nibh ac suscipit venenatis.
	Aliquam ex purus, consequat eu volutpat vel, scelerisque vel leo. Nunc congue tellus lectus, pretium lobortis erat mattis congue.
	Integer facilisis, erat nec iaculis gravida, est libero ornare mauris, venenatis mollis risus eros et metus.
	Sed ornare massa tristique arcu pulvinar fermentum.`;

const getProps = (overrides = {}) => Object.assign({}, {
	invalid: boolean("Invalid", false),
	size: select("Size", ["sm", "md", "xl"], "md"),
	invalidText: "This is not a validation text",
	disabled: boolean("disabled", false),
	label: text("Label", "Dropdown label"),
	helperText: text("Helper text", "Optional helper text."),
	items: object("items", [
		{ content: "one" },
		{ content: "two", selected: true },
		{ content: "three" },
		{ content: "four" }
	]),
	selected: action("Selected fired for dropdown"),
	onClose: action("Dropdown closed"),
	theme: select("theme", ["dark", "light"], "dark"),
	dropUp: boolean("Drop up", false)
}, overrides);

@Component({
	selector: "app-reactive-forms",
	template: `
		<form [formGroup]="formGroup">
			<div style="width: 300px">
				<os-dropdown
					[label]="label"
					[helperText]="helperText"
					[invalid]="invalid"
					[invalidText]="invalidText"
					[theme]="theme"
					[selectionFeedback]="selectionFeedback"
					placeholder="Multi-select"
					value="oid"
					(selected)="selected.emit($event)"
					(onClose)="onClose.emit($event)"
					formControlName="roles">
					<os-dropdown-list [items]="items"></os-dropdown-list>
				</os-dropdown>
			</div>
		</form>

		<br>

		<code>{{ formGroup.get("roles").value | json }}</code>
	`
})
class ReactiveFormsStory implements OnInit {
	public formGroup: FormGroup;

	@Input() items = [];
	@Input() label = "";
	@Input() helperText = "";
	@Input() invalid = false;
	@Input() invalidText = "";
	@Input() selectionFeedback = "top-after-reopen";
	@Input() set disabled(value) {
		if (!this.formGroup) { return; }
		if (value) {
			this.formGroup.get("roles").disable();
		} else {
			this.formGroup.get("roles").enable();
		}
	}
	@Output() selected = new EventEmitter();
	@Output() onClose = new EventEmitter();

	constructor(protected formBuilder: FormBuilder) { }

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			roles: new FormControl()
		});
		this.selectRoles();
	}

	private selectRoles() {
		this.formGroup.get("roles").setValue(1);
	}
}

@Component({
	selector: "app-dropdown-modal",
	template: `
        <os-modal [open]="true">
            <os-modal-header>Header label</os-modal-header>
            <section class="bx--modal-content">
                <h1>Sample modal works.</h1>
                <p class="bx--modal-content__text">{{modalText}}</p>
                <div style="width: 300px">
					<os-dropdown placeholder="Select">
						<os-dropdown-list [items]="items"></os-dropdown-list>
					</os-dropdown>
				</div>
                <p class="bx--modal-content__text">{{modalText}}</p>
            </section>
        </os-modal>
    `
})
class DropdownModal {
	@Input() modalText: string;
	@Input() items: any[];
}

storiesOf("Components|Dropdown", module)
	.addDecorator(
		moduleMetadata({
			declarations: [ReactiveFormsStory, DropdownModal],
			imports: [
				DropdownModule,
				ModalModule,
				PlaceholderModule,
				DocumentationModule,
				ReactiveFormsModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
		<div style="width: 300px">
			<os-dropdown
				[label]="label"
				[helperText]="helperText"
				[size]="size"
				[dropUp]="dropUp"
				[invalid]="invalid"
				[invalidText]="invalidText"
				[theme]="theme"
				placeholder="Select"
				[disabled]="disabled"
				(selected)="selected($event)"
				(onClose)="onClose($event)">
				<os-dropdown-list [items]="items"></os-dropdown-list>
			</os-dropdown>
		</div>
	`,
		props: getProps()
	}))
	.add("Multi-select", () => ({
		template: `
		<div style="width: 300px">
			<os-dropdown
				[label]="label"
				[helperText]="helperText"
				[size]="size"
				[dropUp]="dropUp"
				[invalid]="invalid"
				[invalidText]="invalidText"
				[selectionFeedback]="selectionFeedback"
				type="multi"
				placeholder="Multi-select"
				[disabled]="disabled"
				(selected)="selected($event)"
				(onClose)="onClose($event)">
				<os-dropdown-list [items]="items"></os-dropdown-list>
			</os-dropdown>
		</div>
	`,
		props: {
			...getProps(),
			selectionFeedback: select("Selection feedback", ["top", "fixed", "top-after-reopen"], "top-after-reopen")
		}
	}))
	.add("Multi-select with ngModel", () => ({
		template: `
		<div style="width: 300px">
			<os-dropdown
				type="multi"
				[label]="label"
				[helperText]="helperText"
				[size]="size"
				[dropUp]="dropUp"
				[invalid]="invalid"
				[invalidText]="invalidText"
				[selectionFeedback]="selectionFeedback"
				placeholder="Select"
				[disabled]="disabled"
				[(ngModel)]="model"
				value="id">
				<os-dropdown-list [items]="items"></os-dropdown-list>
			</os-dropdown>
			<span>{{model | json}}</span>
		</div>
		`,
		props: getProps({
			items: object("items", [
				{ content: "one", id: 0 },
				{ content: "two", id: 1 },
				{ content: "three", id: 2 },
				{ content: "four", id: 3 }
			]),
			model: [2],
			selectionFeedback: select("Selection feedback", ["top", "fixed", "top-after-reopen"], "top-after-reopen")
		})
	}))
	.add("With ngModel", () => ({
		template: `
		<div style="width: 300px">
			<os-dropdown
				[label]="label"
				[helperText]="helperText"
				[size]="size"
				[invalid]="invalid"
				[invalidText]="invalidText"
				placeholder="Select"
				[disabled]="disabled"
				[(ngModel)]="model"
				value="content">
				<os-dropdown-list [items]="items"></os-dropdown-list>
			</os-dropdown>
			<span>{{model | json}}</span>
		</div>
		`,
		props: getProps({
			model: "two"
		})
	}))
	.add("In modal", () => ({
		template: `
			<app-dropdown-modal
				[items]="items"
				[modalText]="modalText">
			</app-dropdown-modal>
		`,
		props: getProps({
			modalText: text("modal text", modalText)
		})
	}))
	.add("With reactive forms", () => ({
		template: `
			<app-reactive-forms
				[label]="label"
				[helperText]="helperText"
				[invalid]="invalid"
				[invalidText]="invalidText"
				[disabled]="disabled"
				[items]="items"
				[selectionFeedback]="selectionFeedback"
				(selected)="selected($event)"
				(onClose)="onClose($event)">
			</app-reactive-forms>
		`,
		props: getProps({
			items: [
				{
					content: "numerical value item 1",
					oid: 1,
					selected: false
				},
				{
					content: "string value item 2",
					oid: 2,
					selected: false
				}
			],
			selectionFeedback: select("Selection feedback", ["top", "fixed", "top-after-reopen"], "top-after-reopen"),
			selected: action("Selected fired for multi-select dropdown"),
			onClose: action("Multi-select dropdown closed")
		})
	}))
	.add("With Observable items", () => ({
		template: `
		<div style="width: 300px">
			<os-dropdown
				[label]="label"
				[helperText]="helperText"
				[invalid]="invalid"
				[invalidText]="invalidText"
				[size]="size"
				[theme]="theme"
				placeholder="Select"
				[disabled]="disabled"
				(selected)="selected($event)"
				(onClose)="onClose($event)">
				<os-dropdown-list [items]="items"></os-dropdown-list>
			</os-dropdown>
		</div>
	`,
		props: getProps({
			items: of([
				{ content: "one" },
				{ content: "two", selected: true },
				{ content: "three" },
				{ content: "four" }
			])
		})
	}))
	.add("With Template", () => ({
		template: `
		<div style="width: 300px;">
			<os-dropdown
				[theme]="theme"
				placeholder="Select"
				[displayValue]="dropdownRenderer"
				[size]="size"
				[invalid]="invalid"
				[invalidText]="invalidText"
				[disabled]="disabled"
				(selected)="selected($event)"
				(onClose)="onClose($event)">
				<os-dropdown-list [items]="items" [listTpl]="dropdownRenderer"></os-dropdown-list>
			</os-dropdown>
			<ng-template #dropdownRenderer let-item="item">
				<div *ngIf="item && item.content" style="font-size: 14px;">
					<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"
							width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style="will-change: transform;">
						<path d="M9.3 3.7l3.8 3.8H1v1h12.1l-3.8 3.8.7.7 5-5-5-5z"></path>
					</svg>
					&nbsp;{{item.content}}
				</div>
			</ng-template>
		</div>
	`,
		props: getProps()

	}))
	.add("Skeleton", () => ({
		template: `
		<div style="width: 300px">
			<os-dropdown skeleton="true">
				<os-dropdown-list [items]="items"></os-dropdown-list>
			</os-dropdown>
			&nbsp;
			<os-dropdown skeleton="true" inline="true">
				<os-dropdown-list [items]="items"></os-dropdown-list>
			</os-dropdown>
		</div>
		`,
		props: getProps()
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/Dropdown.html"></os-documentation>
		`
	}));
