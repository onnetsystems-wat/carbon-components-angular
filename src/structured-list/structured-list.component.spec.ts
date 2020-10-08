import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Component } from "@angular/core";
import { StructuredList } from "./structured-list.component";
import { ListRow } from "./list-row.component";
import { ListHeader } from "./list-header.component";
import { ListColumn } from "./list-column.component";
import { CheckmarkFilledModule } from "@carbon/icons-angular";

@Component({
	template: `
		<os-structured-list
			border="true"
			[condensed]="condensed"
			nowrap="false"
			selection="true"
			[(ngModel)]="valueSelected"
			(selected)="onSelected()">
			<os-list-header>
				<os-list-column nowrap="true">Column 1</os-list-column>
				<os-list-column nowrap="true">Column 2</os-list-column>
				<os-list-column>Column 3</os-list-column>
			</os-list-header>
			<os-list-row value="row1">
				<os-list-column>Row 1</os-list-column>
				<os-list-column nowrap="true">Row One</os-list-column>
				<os-list-column>Test</os-list-column>
			</os-list-row>
			<os-list-row value="row2">
				<os-list-column>Row 2</os-list-column>
				<os-list-column nowrap="true">Row Two</os-list-column>
				<os-list-column>Test</os-list-column>
			</os-list-row>
		</os-structured-list>
	`
})
class StructuredListTest {
	valueSelected = null;
	condensed = false;
	onSelected() {}
}

describe("StructuredList", () => {
	let fixture, wrapper, element;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				StructuredList,
				StructuredListTest,
				ListRow,
				ListHeader,
				ListColumn
			],
			imports: [
				FormsModule,
				CheckmarkFilledModule
			]
		});
	});

	it("should work", () => {
		fixture = TestBed.createComponent(StructuredList);
		expect(fixture.componentInstance instanceof StructuredList).toBe(true);
	});

	it("should set bx--structured-list--border class", () => {
		fixture = TestBed.createComponent(StructuredListTest);
		fixture.detectChanges();
		element = fixture.debugElement.query(By.css("os-structured-list"));
		expect(element.nativeElement.querySelector(".bx--structured-list--border")).toBeTruthy();
	});

	it("should change valueSelected to row1 on click and emit selected event", () => {
		fixture = TestBed.createComponent(StructuredListTest);
		wrapper = fixture.componentInstance;
		fixture.detectChanges();
		element = fixture.debugElement.query(By.css("os-structured-list"));
		spyOn(wrapper, "onSelected");
		element.nativeElement.querySelector("os-list-row").click();
		fixture.detectChanges();
		expect(wrapper.valueSelected).toEqual("row1");
		expect(wrapper.onSelected).toHaveBeenCalled();
	});

	it("should set bx--structured-list-content--nowrap class", () => {
		fixture = TestBed.createComponent(StructuredListTest);
		fixture.detectChanges();
		wrapper = fixture.componentInstance;
		wrapper.condensed = true;
		element = fixture.debugElement.query(By.css("os-structured-list"));
		expect(element.nativeElement.querySelector(".bx--structured-list-content--nowrap")).toBeTruthy();
	});
});
