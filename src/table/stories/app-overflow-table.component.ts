import {
	TemplateRef,
	Component,
	ViewChild,
	OnInit,
	Input
} from "@angular/core";
import { TableModel } from "../table-model.class";
import { TableItem } from "../table-item.class";
import { TableHeaderItem } from "../table-header-item.class";

@Component({
	selector: "app-overflow-table",
	template: `
		<ng-template #overflowMenuItemTemplate let-data="data">
			<os-overflow-menu>
				<os-overflow-menu-option>
					First Option
				</os-overflow-menu-option>
				<os-overflow-menu-option>
					Second Option
				</os-overflow-menu-option>
				<os-overflow-menu-option>
					Third Option
				</os-overflow-menu-option>
			</os-overflow-menu>
		</ng-template>

		<os-table
			style="display: block; width: 650px;"
			[model]="model"
			[size]="size"
			[sortable]="sortable"
			[showSelectionColumn]="showSelectionColumn"
			[stickyHeader]="stickyHeader"
			[skeleton]="skeleton"
			[isDataGrid]="isDataGrid"
			(rowClick)="onRowClick($event)"
			[striped]="striped">
		</os-table>
	`
})
export class OverflowTableStory implements OnInit {
	@Input() model = new TableModel();
	@Input() size = "md";
	@Input() showSelectionColumn = true;
	@Input() striped = true;
	@Input() isDataGrid = false;
	@Input() sortable = true;
	@Input() stickyHeader = false;
	@Input() skeleton = false;

	@ViewChild("overflowMenuItemTemplate", { static: false })
	protected overflowMenuItemTemplate: TemplateRef<any>;

	ngOnInit() {
		this.model.data = [
			[new TableItem({ data: "Name 1" }), new TableItem({ data: { id: "1" }, template: this.overflowMenuItemTemplate })],
			[new TableItem({ data: "Name 2" }), new TableItem({ data: { id: "2" }, template: this.overflowMenuItemTemplate })],
			[new TableItem({ data: "Name 3" }), new TableItem({ data: { id: "3" }, template: this.overflowMenuItemTemplate })],
			[new TableItem({ data: "Name 4" }), new TableItem({ data: { id: "4" }, template: this.overflowMenuItemTemplate })],
			[new TableItem({ data: "Name 5" }), new TableItem({ data: { id: "4" }, template: this.overflowMenuItemTemplate })],
			[new TableItem({ data: "Name 6" }), new TableItem({ data: { id: "4" }, template: this.overflowMenuItemTemplate })],
			[new TableItem({ data: "Name 7" }), new TableItem({ data: { id: "4" }, template: this.overflowMenuItemTemplate })],
			[new TableItem({ data: "Name 8" }), new TableItem({ data: { id: "4" }, template: this.overflowMenuItemTemplate })],
			[new TableItem({ data: "Name 9" }), new TableItem({ data: { id: "4" }, template: this.overflowMenuItemTemplate })]
		];
		this.model.header = [
			new TableHeaderItem({ data: "Name" }),
			new TableHeaderItem({ data: "Actions" })
		];
	}

	onRowClick(index: number) {
		console.log("Row item selected:", index);
	}
}
