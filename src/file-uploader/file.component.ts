import {
	Component,
	Input,
	Output,
	EventEmitter,
	HostBinding,
	OnDestroy
} from "@angular/core";

import { I18n } from "@onnetsystems-wat/onnet-design-systems/i18n";
import { FileItem } from "./file-item.interface";

@Component({
	selector: "ibm-file",
	template: `
		<p class="bx--file-filename">{{fileItem.file.name}}</p>
		<span
			*ngIf="fileItem.state === 'edit'"
			class="bx--file__state-container"
			(click)="remove.emit()"
			(keyup.enter)="remove.emit()"
			(keyup.space)="remove.emit()"
			tabindex="0">
			<ibm-icon-warning-filled
				size="16"
				*ngIf="isInvalidText"
				class="bx--file--invalid">
			</ibm-icon-warning-filled>
			<ibm-icon-close
				size="16"
				class="bx--file-close"
				[ariaLabel]="translations.REMOVE_BUTTON">
			</ibm-icon-close>
		</span>
		<span *ngIf="fileItem.state === 'upload'">
			<div class="bx--inline-loading__animation">
				<ibm-loading size="sm"></ibm-loading>
			</div>
		</span>
		<span
			*ngIf="fileItem.state === 'complete'"
			class="bx--file__state-container"
			tabindex="0">
			<ibm-icon-checkmark-filled
				size="16"
				class="bx--file-complete"
				[ariaLabel]="translations.CHECKMARK">
			</ibm-icon-checkmark-filled>
		</span>
	`
})
export class FileComponent implements OnDestroy {
	/**
	 * Accessible translations for the close and complete icons
	 */
	@Input() translations = this.i18n.get().FILE_UPLOADER;
	/**
	 * A single `FileItem` from the set of `FileItem`s
	 */
	@Input() fileItem: FileItem;

	@Output() remove = new EventEmitter();

	@HostBinding("class.bx--file__selected-file") selectedFile = true;

	@HostBinding("class.bx--file__selected-file--invalid") get isInvalidText() {
		return this.fileItem.invalidText;
	}

	constructor(protected i18n: I18n) {}

	ngOnDestroy() {
		this.remove.emit();
	}
}
