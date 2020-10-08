import { Component, OnInit } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { By } from "@angular/platform-browser";

import { TableModel } from "./table-model.class";
import { Table, TableModule } from "./index";
import { TableHeaderItem } from "./table-header-item.class";
import { TableItem } from "./table-item.class";

@Component({
	template: `
		<os-table
			[model]="tableModel"
			(sort)="simpleSort()"
			(selectRow)="onChange()"
			(deselectRow)="onChange()"
			size="sh"
			title="title"
			[showSelectionColumn]="showSelectionColumn">
		</os-table>`
})
class TableTest implements OnInit {
	tableModel = new TableModel();
	showSelectionColumn = true;

	ngOnInit() {
		this.tableModel.header = [new TableHeaderItem({data: "Column"})];
		this.tableModel.data = [
			[new TableItem({data: "0"})],
			[new TableItem({data: "3"})],
			[new TableItem({data: "1"})],
			[new TableItem({data: "2"})]
		];
	}

	simpleSort() {}
	onChange() {}
}

describe("Table", () => {
	let fixture, tableInstance;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ TableTest ],
			imports: [ TableModule ]
		});

		fixture = TestBed.createComponent(TableTest);
		tableInstance = fixture.debugElement.query(By.css("os-table"));
		fixture.detectChanges();
	});

	it("should work", () => {
		fixture = TestBed.createComponent(Table);
		expect(fixture.componentInstance instanceof Table).toBe(true);
	});

	it("should call the row sort function", () => {
		spyOn(fixture.componentInstance, "simpleSort");
		tableInstance.nativeElement.querySelector("thead .bx--table-sort").click();
		fixture.detectChanges();
		expect(fixture.componentInstance.simpleSort).toHaveBeenCalled();
	});

	it("should call the row filter function", () => {});

	it("should emit a select all event", () => {
		spyOn(tableInstance.componentInstance.selectAll, "emit");

		let checkbox = fixture.nativeElement.querySelector("th input[type='checkbox']");
		checkbox.click();
		fixture.detectChanges();

		expect(tableInstance.componentInstance.selectAll.emit).toHaveBeenCalled();
	});

	it("should emit a deselect all event", () => {
		spyOn(tableInstance.componentInstance.deselectAll, "emit");

		let checkbox = fixture.nativeElement.querySelector("th input[type='checkbox']");
		checkbox.click();
		fixture.detectChanges();
		checkbox.click();
		fixture.detectChanges();

		expect(tableInstance.componentInstance.deselectAll.emit).toHaveBeenCalled();
	});

	it("should emit a select row event", () => {
		spyOn(tableInstance.componentInstance.selectRow, "emit");

		let checkbox = fixture.nativeElement.querySelector("td input[type='checkbox']");
		checkbox.click();
		fixture.detectChanges();

		expect(tableInstance.componentInstance.selectRow.emit).toHaveBeenCalled();
	});

	it("should emit a deselect row event", () => {
		spyOn(tableInstance.componentInstance.deselectRow, "emit");

		let checkbox = fixture.nativeElement.querySelector("td input[type='checkbox']");
		checkbox.click();
		fixture.detectChanges();
		checkbox.click();
		fixture.detectChanges();

		expect(tableInstance.componentInstance.deselectRow.emit).toHaveBeenCalled();
	});

	it("should set the .bx--data-table--short class", () => {
		expect(tableInstance.nativeElement.querySelector(".bx--data-table--short")).toBeTruthy();
	});

	it("should not show checkboxes when showSelectionColumn is false", () => {
		expect(tableInstance.nativeElement.querySelector("os-checkbox")).toBeTruthy();

		fixture.componentInstance.showSelectionColumn = false;
		fixture.detectChanges();

		expect(tableInstance.nativeElement.querySelector("os-checkbox")).not.toBeTruthy();
	});

	it("should set title to 'title", () => {
		expect(tableInstance.nativeElement.getAttribute("title")).toBe("title");
	});
});
