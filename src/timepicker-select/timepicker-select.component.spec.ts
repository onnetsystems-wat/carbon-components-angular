import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Component } from "@angular/core";
import { ChevronDownModule, WarningFilledModule } from "@carbon/icons-angular";
import { TimePickerSelect } from "./timepicker-select.component";

@Component({
	template: `
	<os-timepicker-select (valueChange)="onChange(event)">
		<option class="test" selected value="AM">AM</option>
		<option class="test2" value="PM">PM</option>
	</os-timepicker-select>
	`
})
class TimePickerSelectTest {
	onChange(event) {}
}

describe("TimePickerSelect", () => {
	let fixture, wrapper, element, component;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				TimePickerSelect,
				TimePickerSelectTest
			],
			imports: [
				FormsModule,
				ChevronDownModule,
				WarningFilledModule
			]
		});
	});

	it("should work", () => {
		fixture = TestBed.createComponent(TimePickerSelect);
		expect(fixture.componentInstance instanceof TimePickerSelect).toBe(true);
	});

	it("should call onChange on change select", () => {
		fixture = TestBed.createComponent(TimePickerSelectTest);
		wrapper = fixture.componentInstance;
		fixture.detectChanges();
		element = fixture.debugElement.query(By.css(".bx--select-input"));
		spyOn(wrapper, "onChange");
		element.triggerEventHandler("change", {target: {value : ""}});
		fixture.detectChanges();
		expect(wrapper.onChange).toHaveBeenCalled();
	});

	it("should set options to AM and PM", () => {
		fixture = TestBed.createComponent(TimePickerSelectTest);
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css("os-timepicker-select")).query(By.css(".test")).nativeElement.innerHTML).toContain("AM");
		expect(fixture.debugElement.query(By.css("os-timepicker-select")).query(By.css(".test2")).nativeElement.innerHTML).toContain("PM");
	});

	it("should set label to test-label", () => {
		fixture = TestBed.overrideComponent(TimePickerSelectTest, {
			set: {
				template: `<os-timepicker-select label="test-label"></os-timepicker-select>`
			}
		}).createComponent(TimePickerSelectTest);
		fixture.detectChanges();
		element = fixture.debugElement.query(By.css("os-timepicker-select")).nativeElement;
		expect(element.querySelector(".bx--label").textContent).toEqual("test-label");
	});

	it("should set disabled on the underlying select to true", () => {
		fixture = TestBed.overrideComponent(TimePickerSelectTest, {
			set: {
				template: `<os-timepicker-select [disabled]="true"></os-timepicker-select>`
			}
		}).createComponent(TimePickerSelectTest);
		fixture.detectChanges();
		element = fixture.debugElement.query(By.css(".bx--select-input")).nativeElement;
		expect(element.disabled).toEqual(true);
	});
});
