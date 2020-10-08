import { PaginationModule } from "./../pagination/index";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import {
	withKnobs,
	boolean,
	select,
	number,
	object,
	text
} from "@storybook/addon-knobs/angular";

import {
	Table,
	TableModule,
	TableModel,
	TableItem,
	TableHeaderItem
} from "./index";

import { NFormsModule, ButtonModule } from "../forms/index";
import { DialogModule } from "../dialog/index";
import { SearchModule } from "../search/index";

import {
	SettingsModule,
	DeleteModule,
	SaveModule,
	DownloadModule,
	AddModule
} from "@carbon/icons-angular";

import {
	TableStory,
	DynamicTableStory,
	ExpansionTableStory,
	OverflowTableStory,
	PaginationTableStory,
	SkeletonTableStory,
	TableNoDataStory
} from "./stories";
import { TableRow } from "./table-row.class";
import { DocumentationModule } from "../documentation-component/documentation.module";

const simpleModel = new TableModel();
simpleModel.data = [
	[new TableItem({data: "Name 1"}), new TableItem({data: "qwer"})],
	[new TableItem({data: "Name 3"}), new TableItem({data: "zwer"})],
	[new TableItem({data: "Name 2"}), new TableItem({data: "swer"})],
	[new TableItem({data: "Name 4"}), new TableItem({data: "twer"})]
];
simpleModel.header = [
	new TableHeaderItem({data: "Name"}), new TableHeaderItem({data: "hwer" })
];

const emptyModel = new TableModel();
emptyModel.header = [
	new TableHeaderItem({data: "Name"}), new TableHeaderItem({data: "hwer", style: {"width": "auto"} })
];

const getProps = (more = {}) => {
	return Object.assign({}, {
		model: simpleModel,
		size: select("size", { Small: "sm", Short: "sh", Normal: "md", Large: "lg" }, "md"),
		title: text("Title", "Table title"),
		description: text("Description", ""),
		showSelectionColumn: boolean("showSelectionColumn", true),
		striped: boolean("striped", false),
		sortable: boolean("sortable", true),
		isDataGrid: boolean("Data grid keyboard interactions", true),
		stickyHeader: boolean("stickyHeader", false),
		skeleton: boolean("skeleton", false)
	}, more);
};

function getModelWithDisabledRows() {
	const disabledModel = new TableModel();
	const row1 = new TableRow(new TableItem({data: "Name 1"}), new TableItem({data: "Disabled 1"}));
	row1.disabled = true;
	const row2 = new TableRow(new TableItem({data: "Name 3"}), new TableItem({data: "Disabled 2"}));
	row2.disabled = true;
	const row3 = new TableRow(new TableItem({data: "Name 2"}), new TableItem({data: "Enabled 1"}));
	const row4 = new TableRow(new TableItem({data: "Name 4"}), new TableItem({data: "Enabled 2"}));
	disabledModel.data = [row1, row2, row3, row4];
	return disabledModel;
}

storiesOf("Components|Table", module).addDecorator(
		moduleMetadata({
			imports: [
				NFormsModule,
				TableModule,
				DialogModule,
				PaginationModule,
				SearchModule,
				ButtonModule,
				SettingsModule,
				DeleteModule,
				SaveModule,
				DownloadModule,
				AddModule,
				DocumentationModule
			],
			declarations: [
				TableStory,
				DynamicTableStory,
				ExpansionTableStory,
				OverflowTableStory,
				PaginationTableStory,
				SkeletonTableStory,
				TableNoDataStory
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
		<os-table-container>
			<os-table-header>
				<h4 osTableHeaderTitle>{{title}}</h4>
				<p osTableHeaderDescription>{{description}}</p>
			</os-table-header>
			<app-table
				[model]="model"
				[stickyHeader]="stickyHeader"
				[size]="size"
				[skeleton]="skeleton"
				[enableSingleSelect]="enableSingleSelect"
				[showSelectionColumn]="showSelectionColumn"
				[striped]="striped"
				[sortable]="sortable"
				[isDataGrid]="isDataGrid">
			</app-table>
		</os-table-container>
	`,
		props: getProps({
			enableSingleSelect: boolean("Enable single select", false)
		})
	}))
	.add("With no data", () => ({
		template: `
		<os-table-container>
			<os-table-header>
				<h4 osTableHeaderTitle>{{title}}</h4>
				<p osTableHeaderDescription>{{description}}</p>
			</os-table-header>
			<app-no-data-table
				[model]="model"
				[size]="size"
				[skeleton]="skeleton"
				[showSelectionColumn]="showSelectionColumn"
				[striped]="striped">
				<tbody><tr><td class="no-data" colspan="3"><div>No data.</div></td></tr></tbody>
			</app-no-data-table>
		</os-table-container>
		`,
		styles: [`
			.no-data {
				width: 100%;
				height: 150px;
				text-align: center;
			}
		`],
		props: getProps({
			model: emptyModel,
			description: text("Description", "With no data")
		})
	}))
	.add("With toolbar", () => ({
		template: `
		<os-table-container>
			<os-table-header>
				<h4 osTableHeaderTitle>{{title}}</h4>
				<p osTableHeaderDescription>{{description}}</p>
			</os-table-header>
			<os-table-toolbar [model]="model" [batchText]="batchText" #toolbar>
				<os-table-toolbar-actions>
					<button osButton="primary" [tabindex]="toolbar.selected ? 0 : -1">
						Delete
						<ibm-icon-delete size="16" class="bx--btn__icon"></ibm-icon-delete>
					</button>
					<button osButton="primary" [tabindex]="toolbar.selected ? 0 : -1">
						Save
						<ibm-icon-save size="16" class="bx--btn__icon"></ibm-icon-save>
					</button>
					<button osButton="primary" [tabindex]="toolbar.selected ? 0 : -1">
						Download
						<ibm-icon-download size="16" class="bx--btn__icon"></ibm-icon-download>
					</button>
				</os-table-toolbar-actions>
				<os-table-toolbar-content>
					<os-table-toolbar-search
						ngDefaultControl
						[expandable]="true"
						[(ngModel)]="searchModel">
					</os-table-toolbar-search>
					<button osButton="ghost" class="toolbar-action" [tabindex]="toolbar.selected ? -1 : 0">
						<ibm-icon-settings size="16" class="bx--toolbar-action__icon"></ibm-icon-settings>
					</button>
					<button osButton="primary" size="sm" [tabindex]="toolbar.selected ? -1 : 0">
						Primary Button<ibm-icon-add size="20" class="bx--btn__icon"></ibm-icon-add>
					</button>
				</os-table-toolbar-content>
			</os-table-toolbar>

			<app-table
				[model]="model"
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[enableSingleSelect]="enableSingleSelect"
				[striped]="striped"
				[sortable]="sortable"
				[skeleton]="skeleton"
				[stickyHeader]="stickyHeader"
				[isDataGrid]="isDataGrid">
			</app-table>
		</os-table-container>
	`,
		props: getProps({
			description: text("Description", "With toolbar"),
			searchModel: text("Search model", "Initial search value"),
			enableSingleSelect: boolean("Enable single select", false),
			batchText: object("Toolbar batch text", {
				SINGLE: "1 item selected",
				MULTIPLE: "{{count}} items selected"
			})
		})
	}))
	.add("With toolbar and disabled rows", () => ({
		template: `
		<os-table-container>
			<os-table-header>
				<h4 osTableHeaderTitle>{{title}}</h4>
				<p osTableHeaderDescription>{{description}}</p>
			</os-table-header>
			<os-table-toolbar [model]="model" [batchText]="batchText">
				<os-table-toolbar-actions>
					<button osButton="primary">
						Delete
						<ibm-icon-delete size="16" class="bx--btn__icon"></ibm-icon-delete>
					</button>
					<button osButton="primary">
						Save
						<ibm-icon-save size="16" class="bx--btn__icon"></ibm-icon-save>
					</button>
					<button osButton="primary">
						Download
						<ibm-icon-download size="16" class="bx--btn__icon"></ibm-icon-download>
					</button>
				</os-table-toolbar-actions>
				<os-table-toolbar-content>
					<os-table-toolbar-search [expandable]="true"></os-table-toolbar-search>
					<button osButton="ghost" class="toolbar-action">
						<ibm-icon-settings size="16" class="bx--toolbar-action__icon"></ibm-icon-settings>
					</button>
					<button osButton="primary" size="sm">
						Primary Button<ibm-icon-add size="20" class="bx--btn__icon"></ibm-icon-add>
					</button>
				</os-table-toolbar-content>
			</os-table-toolbar>

			<app-no-data-table
				[model]="model"
				[size]="size"
				[showSelectionColumn]="true"
				[striped]="striped"
				[sortable]="sortable"
				[isDataGrid]="isDataGrid">
			</app-no-data-table>
		</os-table-container>
	`,
		props: {
			model: getModelWithDisabledRows(),
			size: select("size", { Small: "sm", Short: "sh", Normal: "md", Large: "lg" }, "md"),
			title: text("Title", "Table title"),
			description: text("Description", "With toolbar and disabled rows"),
			striped: boolean("striped", false),
			sortable: boolean("sortable", true),
			isDataGrid: boolean("Data grid keyboard interactions", true),
			batchText: object("Toolbar batch text", {
				SINGLE: "1 item selected",
				MULTIPLE: "{{count}} items selected"
			})
		}
	}))
	.add("With toolbar without toolbar action", () => ({
		template: `
		<os-table-container>
			<os-table-header>
				<h4 osTableHeaderTitle>{{title}}</h4>
				<p osTableHeaderDescription>{{description}}</p>
			</os-table-header>
			<os-table-toolbar>
				<os-table-toolbar-content>
					<os-table-toolbar-search [expandable]="true"></os-table-toolbar-search>
					<button osButton="toolbar-action">
						<ibm-icon-settings size="16" class="bx--toolbar-action__icon"></ibm-icon-settings>
					</button>
					<button osButton="primary" size="sm">
						Primary Button<ibm-icon-add size="20" class="bx--btn__icon"></ibm-icon-add>
					</button>
				</os-table-toolbar-content>
			</os-table-toolbar>

			<app-table
				[model]="model"
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[enableSingleSelect]="enableSingleSelect"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[striped]="striped"
				[sortable]="sortable"
				[isDataGrid]="isDataGrid">
			</app-table>
		</os-table-container>
	`,
		props: getProps({
			description: text("Description", "With toolbar"),
			enableSingleSelect: boolean("Enable single select", false)
		})
	}))
	.add("With expansion", () => ({
		template: `
		<os-table-container>
			<os-table-header>
				<h4 osTableHeaderTitle>{{title}}</h4>
				<p osTableHeaderDescription>{{description}}</p>
			</os-table-header>
			<app-expansion-table
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[sortable]="sortable"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[striped]="striped"
				[isDataGrid]="isDataGrid">
			</app-expansion-table>
		</os-table-container>
		`,
		props: getProps({
			description: text("Description", "With expansion")
		})
	}))
	.add("With dynamic content", () => ({
		template: `
		<os-table-container>
			<os-table-header>
				<h4 osTableHeaderTitle>{{title}}</h4>
				<p osTableHeaderDescription>{{description}}</p>
			</os-table-header>
			<app-custom-table
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[sortable]="sortable"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[striped]="striped"
				[isDataGrid]="isDataGrid">
			</app-custom-table>
		</os-table-container>
		`,
		props: getProps({
			description: text("Description", "With dynamic content")
		})
	}))
	.add("With overflow menu", () => ({
		template: `
		<os-table-container>
			<os-table-header>
				<h4 osTableHeaderTitle>{{title}}</h4>
				<p osTableHeaderDescription>{{description}}</p>
			</os-table-header>
			<app-overflow-table
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[sortable]="sortable"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[striped]="striped"
				[isDataGrid]="isDataGrid">
			</app-overflow-table>
		</os-table-container>
		`,
		props: getProps({
			description: text("Description", "With overflow menu")
		})
	}))
	.add("With pagination", () => ({
		template: `
		<os-table-container>
			<os-table-header>
				<h4 osTableHeaderTitle>{{title}}</h4>
				<p osTableHeaderDescription>{{description}}</p>
			</os-table-header>
			<app-pagination-table
				[skeleton]="skeleton"
				[sortable]="sortable"
				[totalDataLength]="totalDataLength"
				[showSelectionColumn]="showSelectionColumn"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[model]="model">
			</app-pagination-table>
		</os-table-container>
		`,
		props: getProps({
			totalDataLength: number("totalDataLength", 105),
			description: text("Description", "With pagination")
		})
	}))
	.add("From components", () => ({
		template: `
			<table osTable [sortable]="false" style="width: 650px;">
				<thead osTableHead>
					<tr>
						<th
							osTableHeadCell
							*ngFor="let column of model.header"
							[column]="column">
						</th>
					</tr>
				</thead>
				<tbody osTableBody>
					<tr
						*ngFor="let row of model.data"
						osTableRow
						[row]="row">
						<td
							*ngFor="let item of row; let j = index"
							osTableData
							[item]="item"
							[class]="model.header[j].className"
							[ngStyle]="model.header[j].style">
						</td>
					</tr>
				</tbody>
			</table>
		`,
		props: getProps()
	}))
	.add("Skeleton", () => ({
		template: `
			<app-skeleton-table
				[skeletonModel]="skeletonModel"
				[size]="size"
				[striped]="striped">
			</app-skeleton-table>
	`,
		props: getProps()
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/Table.html"></os-documentation>
		`
	}));
