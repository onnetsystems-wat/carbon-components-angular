// modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// icons
import {
	ChevronRightModule,
	SearchModule as SearchIconModule,
	CloseModule
} from "@carbon/icons-angular";

// internal module imports
import { NFormsModule } from "@onnetsystems-wat/onnet-design-systems/forms";
import { DialogModule } from "@onnetsystems-wat/onnet-design-systems/dialog";
import { I18nModule } from "@onnetsystems-wat/onnet-design-systems/i18n";
import { ButtonModule } from "@onnetsystems-wat/onnet-design-systems/button";
import { SearchModule } from "@onnetsystems-wat/onnet-design-systems/search";

// table utilities/toolbar imports
import { TableToolbar } from "./toolbar/table-toolbar.component";
import { TableToolbarActions } from "./toolbar/table-toolbar-actions.component";
import { TableToolbarSearch } from "./toolbar/table-toolbar-search.component";
import { TableToolbarContent } from "./toolbar/table-toolbar-content.component";

import { TableContainer } from "./table-container.component";
import { TableHeader } from "./header/table-header.component";
import { TableHeaderTitle } from "./header/table-header-title.directive";
import { TableHeaderDescription } from "./header/table-header-description.directive";

import { ExpandedRowHover } from "./expanded-row-hover.directive";

// core table imports
import { Table } from "./table.component";
import { TableDirective } from "./table.directive";
import { TableHead } from "./head/table-head.component";
import { TableHeadCell } from "./head/table-head-cell.component";
import { TableHeadCheckbox } from "./head/table-head-checkbox.component";
import { TableHeadExpand } from "./head/table-head-expand.component";
import { TableBody } from "./body/table-body.component";
import { TableRowComponent } from "./body/table-row.component";
import { TableExpandedRow } from "./body/table-expanded-row.component";
import { TableData } from "./cell/table-data.component";
import { TableCheckbox } from "./cell/table-checkbox.component";
import { TableRadio } from "./cell/table-radio.component";
import { TableExpandButton } from "./cell/table-expand-button.component";

// model exports
export { TableModel } from "./table-model.class";
export { TableRow } from "./table-row.class";
export { TableItem } from "./table-item.class";
export { TableHeaderItem } from "./table-header-item.class";
export * from "./table-adapter.class";
export * from "./data-grid-interaction-model.class";

@NgModule({
	declarations: [
		// toolbar and utility components
		TableToolbar,
		TableContainer,
		TableHeader,
		TableHeaderTitle,
		TableHeaderDescription,
		TableToolbarActions,
		TableToolbarSearch,
		TableToolbarContent,
		ExpandedRowHover,
		// core table components
		Table,
		TableDirective,
		TableHead,
		TableHeadCell,
		TableHeadCheckbox,
		TableHeadExpand,
		TableBody,
		TableRowComponent,
		TableExpandedRow,
		TableData,
		TableCheckbox,
		TableRadio,
		TableExpandButton
	],
	exports: [
		// toolbar and utility components
		TableToolbar,
		TableContainer,
		TableHeader,
		TableHeaderTitle,
		TableHeaderDescription,
		TableToolbarActions,
		TableToolbarSearch,
		TableToolbarContent,
		ExpandedRowHover,
		// core table components
		Table,
		TableDirective,
		TableHead,
		TableHeadCell,
		TableHeadCheckbox,
		TableHeadExpand,
		TableBody,
		TableRowComponent,
		TableExpandedRow,
		TableData,
		TableCheckbox,
		TableRadio,
		TableExpandButton
	],
	imports: [
		CommonModule,
		NFormsModule,
		FormsModule,
		DialogModule,
		ButtonModule,
		SearchModule,
		I18nModule,
		ChevronRightModule,
		SearchIconModule,
		CloseModule
	]
})
export class TableModule {}
