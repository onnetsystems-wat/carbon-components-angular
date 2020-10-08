import { Component, OnInit, OnDestroy } from "@angular/core";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs/angular";
import { TableModule, TableModel, TableHeaderItem, TableItem } from "../../table/index";
import { DropdownModule } from "../../dropdown/index";
import { GridModule } from "../../grid/index";
import { UIShellModule } from "../../ui-shell/index";

@Component({
	selector: "app-sample-single-selection",
	template: `
	<div osGrid>
		<div osRow class="header">
			<os-header name="Patterns">
				<os-hamburger></os-hamburger>
			</os-header>
		</div>
		<div osRow>
			<div osCol [columnNumbers]="{'lg': 3, 'md': 3, 'sm': 3}">
				<label osText class="dropdown-label">
					Filter by:
					<os-dropdown
						class="filter-dropdown"
						placeholder="Type"
						inline="true"
						(selected)="onSelected($event)">
						<os-dropdown-list [items]="items"></os-dropdown-list>
					</os-dropdown>
				</label>
			</div>
		</div>
		<div osRow>
			<div osCol [columnNumbers]="{'lg': 12, 'md': 12, 'sm': 12}">
				<os-table-container>
					<os-table
					class="data-table"
						[model]="model"
						size="lg"
						[showSelectionColumn]="false">
						<ng-content></ng-content>
					</os-table>
				</os-table-container>
			</div>
		</div>
	</div>
	`,
	styles: [`
		.header {
			margin-bottom: 80px;
		}

		.dropdown-label {
			display: flex;
			align-items: center;
			flex-direction-row;
		}

		.data-table {
			width: 100%;
		}

		.filter-dropdown {
			flex-grow: 1;
			margin-left: 20px;
		}
	`
	]
})
class SampleSingleSelection implements OnInit, OnDestroy {
	model = new TableModel();

	selected = [];

	items = [
		{ content: "All" },
		{ content: "Vegetable" },
		{ content: "Fruit" },
		{ content: "Meat" }
	];

	dataset = [
		{ name: "Apple", type: "Fruit" },
		{ name: "Grape", type: "Fruit" },
		{ name: "Eggplant", type: "Fruit" },
		{ name: "Lettuce", type: "Vegetable" },
		{ name: "Daikon Radish", type: "Vegetable" },
		{ name: "Beef", type: "Meat" }
	];

	onSelected(event) {
		this.model.data =
			this.dataset
				.filter(data => data.type === event.item.content || event.item.content === "All")
				.map(filteredData =>
					[
						new TableItem({ data: filteredData.name }),
						new TableItem({ data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." })
					]);
	}

	ngOnInit() {
		document.querySelector(".sb-show-main").classList.add("full-page");

		this.model.header = [new TableHeaderItem({ data: "Name" }), new TableHeaderItem({ data: "Description" })];

		this.model.data = this.dataset.map(datapoint =>
			[
				new TableItem({ data: datapoint.name }),
				new TableItem({ data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." })
			]
		);
	}

	ngOnDestroy() {
		document.querySelector(".sb-show-main").classList.remove("full-page");
	}
}

storiesOf("Patterns|Filtering", module)
	.addDecorator(
		moduleMetadata({
			declarations: [ SampleSingleSelection ],
			imports: [
				TableModule,
				DropdownModule,
				GridModule,
				UIShellModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Single Selection", () => ({
		template: `<app-sample-single-selection></app-sample-single-selection>`
	}));
