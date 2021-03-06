import {
	Component,
	Input,
	Output,
	EventEmitter
} from "@angular/core";
import { I18n, Overridable } from "@onnetsystems-wat/onnet-design-systems/i18n";
import { TableItem } from "../table-item.class";
import { TableRow } from "../table-row.class";
import { Observable } from "rxjs";
import { TableRowSize } from "../table.types";

@Component({
	// tslint:disable-next-line: component-selector
	selector: "[osTableCheckbox]",
	template: `
		<os-checkbox
			*ngIf="!skeleton"
			inline="true"
			[name]="name"
			[aria-label]="getLabel() | i18nReplace:getSelectionLabelValue(row) | async"
			[size]="(size !== 'sm' ? 'md' : 'sm')"
			[checked]="selected"
			[disabled]="disabled"
			(change)="change.emit()">
		</os-checkbox>
	`
})
export class TableCheckbox {
	@Input() row: TableItem[];

	@Input() selected = false;

	@Input() name = "";

	get disabled(): boolean {
		return this.row ? !!(this.row as TableRow).disabled : false;
	}

	/**
	 * Size of the table rows.
	 */
	@Input() size: TableRowSize = "md";

	@Input()
	set label(value: string | Observable<string>) {
		this._label.override(value);
	}

	get label() {
		return this._label.value;
	}

	/**
	 * Used to populate the row selection checkbox label with a useful value if set.
	 *
	 * Example:
	 * ```
	 * <os-table [selectionLabelColumn]="0"></os-table>
	 * <!-- results in aria-label="Select first column value"
	 * (where "first column value" is the value of the first column in the row -->
	 * ```
	 */
	@Input() selectionLabelColumn: number;

	@Input() skeleton = false;

	/**
	 * Emits if a single row is selected.
	 */
	@Output() change = new EventEmitter();

	protected _label = this.i18n.getOverridable("TABLE.CHECKBOX_ROW");

	constructor(protected i18n: I18n) { }

	getSelectionLabelValue(row: TableItem[]) {
		if (!this.selectionLabelColumn) {
			return { value: this.i18n.get().TABLE.ROW };
		}
		return { value: row[this.selectionLabelColumn].data };
	}

	getLabel(): Observable<string> {
		return this._label.subject;
	}
}
