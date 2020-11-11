import { storiesOf, moduleMetadata } from "@storybook/angular";
import {
	withKnobs,
	text,
	select,
	boolean
} from "@storybook/addon-knobs/angular";

import { ModalModule } from "../modal";
import { Component, Input, Inject, AfterContentInit } from "@angular/core";
import { ModalService } from "../modal";
import { DocumentationModule } from "./../documentation-component/documentation.module";
import {
	ModalButton,
	AlertModalType,
	ModalButtonType
} from "./alert-modal.interface";
import { PlaceholderModule } from "./../placeholder/index";
import { BaseModal } from "./base-modal.class";
import { Observable, Subject } from "rxjs";
import { InputModule } from "../input";
import { ButtonModule } from "../forms";

@Component({
	selector: "app-sample-modal",
	template: `
		<os-modal
			[size]="size"
			[open]="open"
			(overlaySelected)="closeModal()">
			<os-modal-header (closeSelect)="closeModal()">
				<h2 osModalHeaderLabel>Label</h2>
				<h3 osModalHeaderHeading>Modal</h3>
			</os-modal-header>
			<section osModalContent>
				<h1>Sample modal works.</h1>
				<p osModalContentText>{{modalText}}</p>
			</section>
			<os-modal-footer>
				<button class="bx--btn bx--btn--secondary" (click)="showSecondaryModal()">Show secondary modal</button>
				<button class="bx--btn bx--btn--primary" modal-primary-focus (click)="closeModal()">Close</button>
			</os-modal-footer>
		</os-modal>
	`
})
class SampleModal extends BaseModal {
	constructor(
		@Inject("modalText") public modalText,
		@Inject("size") public size,
		protected modalService: ModalService) {
		super();
	}

	showSecondaryModal() {
		this.modalService.show({
			label: "Secondary header label",
			title: "Sample secondary modal works.",
			content: this.modalText,
			size: this.size,
			buttons: [{
				text: "Cancel",
				type: ModalButtonType.secondary
			}, {
				text: "OK",
				type: ModalButtonType.primary,
				click: () => alert("OK button clicked")
			}]
		});
	}
}
@Component({
	selector: "app-form-modal",
	template: `
		<os-modal
			size="lg"
			open="true"
			(overlaySelected)="closeModal()">
			<os-modal-header (closeSelect)="closeModal()">
				<h2 osModalHeaderLabel>Label</h2>
				<h3 osModalHeaderHeading>Modal</h3>
			</os-modal-header>
			<section osModalContent hasForm="true">
				<h1 osModalContentText class="bx--modal-content__regular-content modal-text">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis finibus erat vel aliquam sodales.
					Phasellus porta velit vel libero pulvinar, sit amet semper purus volutpat.
				</h1>
				<div class="bx--text-input__field-wrapper">
					<os-label helperText="Helper text">
						{{label}}
						<input
							osText
							placeholder="Placeholder"
							[autocomplete]="false">
					</os-label>
				</div>
			</section>
			<os-modal-footer>
				<button class="bx--btn bx--btn--secondary" (click)="closeModal()">Show secondary modal</button>
				<button class="bx--btn bx--btn--primary" modal-primary-focus (click)="closeModal()">Close</button>
			</os-modal-footer>
		</os-modal>
	`,
	styles: [`
		.modal-text {
			margin-bottom: 30px;
		}
	`]
})
class SampleFormModal extends BaseModal {}

@Component({
	selector: "app-modal-story",
	template: `
		<button class="bx--btn bx--btn--primary" (click)="openModal()">Open Modal</button>
	`
})
class ModalStory {

	@Input() modalText = "Hello, World";

	@Input() size = "default";

	constructor(protected modalService: ModalService) { }

	openModal() {
		this.modalService.create({
			component: SampleModal,
			inputs: {
				modalText: this.modalText,
				size: this.size
			}
		});
	}
}

@Component({
	selector: "app-input-modal",
	template: `
		<os-modal
			[size]="size"
			[open]="open"
			(overlaySelected)="closeModal()">
			<os-modal-header (closeSelect)="closeModal()">Edit account name</os-modal-header>
			<section class="bx--modal-content">
				<os-label>
					Account name
					<input
						osText
						[value]="inputValue"
						(change)="onChange($event)">
				</os-label>
			</section>
			<os-modal-footer>
				<button class="bx--btn bx--btn--secondary" (click)="closeModal()">Cancel</button>
				<button class="bx--btn bx--btn--primary" modal-primary-focus (click)="closeModal()">Save</button>
			</os-modal-footer>
		</os-modal>
	`
})
class InputModal extends BaseModal {
	constructor(
		@Inject("modalText") public modalText,
		@Inject("size") public size,
		@Inject("data") public data,
		@Inject("inputValue") public inputValue,
		protected modalService: ModalService) {
		super();
	}

	onChange(event) {
		this.data.next(event.target.value);
	}
}

@Component({
	selector: "app-data-passing-modal",
	template: `
		<button class="bx--btn bx--btn--primary" (click)="openModal()">Open Modal</button>
		<h3>Data passed from input modal on input change: </h3>{{ modalInputValue }}
	`
})
class DataPassingModal implements AfterContentInit {
	@Input() modalText = "Hello, World";

	@Input() size = "default";

	protected modalInputValue = "";
	protected data: Observable<string> = new Subject<string>();

	constructor(protected modalService: ModalService) { }

	openModal() {
		this.modalService.create({
			component: InputModal,
			inputs: {
				modalText: this.modalText,
				inputValue: this.modalInputValue,
				size: this.size,
				data: this.data
			}
		});
	}

	ngAfterContentInit() {
		this.data.subscribe(value => this.modalInputValue = value);
	}
}

@Component({
	selector: "app-alert-modal-story",
	template: `
		<button class="bx--btn bx--btn--primary" (click)="openModal()">Open Modal</button>
	`
})
class AlertModalStory {
	@Input() modalType: AlertModalType;
	@Input() modalLabel: string;
	@Input() modalTitle: string;
	@Input() modalContent: string;
	@Input() buttons: Array<ModalButton>;
	@Input() size: "xs" | "sm" | "lg";

	constructor(protected modalService: ModalService) { }

	openModal() {
		this.modalService.show({
			type: this.modalType,
			label: this.modalLabel,
			title: this.modalTitle,
			content: this.modalContent,
			size: this.size,
			buttons: this.buttons
		});
	}
}

const getOptions = (options = {}) => {
	return Object.assign({}, {
		size: select("size", [null, "xs", "sm", "lg"], null)
	}, options);
};

storiesOf("Components|Modal", module)
	.addDecorator(
		moduleMetadata({
			declarations: [
				ModalStory,
				SampleModal,
				InputModal,
				DataPassingModal,
				AlertModalStory,
				SampleFormModal
			],
			imports: [
				ModalModule,
				PlaceholderModule,
				InputModule,
				ButtonModule,
				DocumentationModule,
				InputModule
			],
			entryComponents: [
				SampleModal,
				InputModal
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
		<app-modal-story [modalText]="modalText" [size]="size"></app-modal-story>
		<os-placeholder></os-placeholder>
		`,
		props: getOptions({
			modalText: text("modalText", "Hello, World!")
		})
	}))
	.add("Form modal", () => ({
		template: `<app-form-modal></app-form-modal>`
	}))
	.add("Transactional", () => ({
		template: `
		<app-alert-modal-story
			[modalType]="modalType"
			[modalLabel]="modalLabel"
			[modalTitle]="modalTitle"
			[modalContent]="modalContent"
			[size]="size"
			[buttons]="buttons">
		</app-alert-modal-story>
		<os-placeholder></os-placeholder>
		`,
		props: getOptions({
			modalType: select("modalType", ["default", "danger"], "default"),
			modalLabel: text("modalLabel", "optional label"),
			modalTitle: text("modalTitle", "Delete service from application"),
			modalContent: text("modalContent", `Are you sure you want to remove the Speech to Text service from the node-test app?`),
			buttons: [{
				text: "Cancel",
				type: "secondary"
			}, {
				text: "Delete",
				type: "primary",
				click: () => alert("Delete button clicked")
			}]
		})
	}))
	.add("Passive", () => ({
		template: `
		<app-alert-modal-story
			[modalType]="modalType"
			[modalLabel]="modalLabel"
			[modalTitle]="modalTitle"
			[size]="size"
			[modalContent]="modalContent">
		</app-alert-modal-story>
		<os-placeholder></os-placeholder>
		`,
		props: getOptions({
			modalType: select("modalType", ["default", "danger"], "default"),
			modalLabel: text("modalLabel", "optional label"),
			modalTitle: text("modalTitle", "Passive modal title"),
			modalContent: text("modalContent", "Passive modal notifications should only appear if there is an action " +
				"the user needs to address immediately. Passive modal notifications are persistent on screen")
		})
	}))
	.add("Data passing", () => ({
		template: `
			<app-data-passing-modal
				[modalText]="modalText"
				[size]="size">
			</app-data-passing-modal>
			<os-placeholder></os-placeholder>
		`,
		props: {
			modalText: text("modalText", "Hello, World!"),
			size: select("size", ["xs", "sm", "default", "lg"], "default")
		}
	}))
	.add("Simple modal", () => ({
		template: `
			<button #trigger osButton="primary" (click)="open = true">Open</button>
			<os-modal [open]="open" [trigger]="trigger" (overlaySelected)="open = false">
				<os-modal-header (closeSelect)="open = false">
					<p class="bx--modal-header__label bx--type-delta">No service required</p>
					<p class="bx--modal-header__heading bx--type-beta">A very simple modal</p>
				</os-modal-header>
				<div class="bx--modal-content">
					<p>hello world</p>
				</div>
				<os-modal-footer>
					<ng-container>
						<button
							osButton="primary"
							(click)="open = false"
							[attr.modal-primary-focus]="true">
							Okay
						</button>
					</ng-container>
				</os-modal-footer>
			</os-modal>
		`,
		props: {
			open: false
		}
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/Modal.html"></os-documentation>
		`
	}));
