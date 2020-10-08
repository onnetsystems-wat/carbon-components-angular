import {
	Component,
	TemplateRef
} from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { TooltipDirective } from "./tooltip.directive";
import { By } from "@angular/platform-browser";
import { DialogModule } from "./../dialog.module";
import { PlaceholderModule } from "../../placeholder/index";

@Component({
	selector: "test-component",
	template: `
		<button
			osTooltip="Hello There"
			placement="bottom"
			(onOpen)="onOpen()">
		</button>
		<os-placeholder></os-placeholder>
	`
})
class TooltipTest {
		onOpen() {}
	}

@Component({
	selector: "test-template-component",
	template: `
		<ng-template #customPopover>custom template</ng-template>
		<button [osTooltip]="customPopover">Pop over right</button>
		<os-placeholder></os-placeholder>
	`
})
class TooltipTemplateTest { }

describe("Tooltip directive", () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TooltipTest, TooltipTemplateTest ],
			imports: [ DialogModule, PlaceholderModule ]
		});
	}));

	it("should compile the directive", () => {
		const fixture = TestBed.createComponent(TooltipTest);
		fixture.detectChanges();

		const directiveEl = fixture.debugElement.query(By.directive(TooltipDirective));
		expect(directiveEl).not.toBeNull();
	});

	it("should create the tooltip component and tooltip should appear at the bottom", () => {
		const fixture = TestBed.createComponent(TooltipTest);
		fixture.detectChanges();

		let button = fixture.debugElement.query(By.css("button"));

		expect(button.nativeElement.getAttribute("placement")).toBe("bottom");

		expect(fixture.componentInstance instanceof TooltipTest).toBe(true);
	});

	it("should create the tooltip component and tooltip should appear at the top", () => {
		const fixture = TestBed.overrideComponent(TooltipTest, {
			set: {
				template: `
					<button osTooltip="Hello There" placement="top"></button>
					<os-placeholder></os-placeholder>
				`
			}
		}).createComponent(TooltipTest);

		fixture.detectChanges();

		let button = fixture.debugElement.query(By.css("button"));

		expect(button.nativeElement.getAttribute("placement")).toBe("top");

		expect(fixture.componentInstance instanceof TooltipTest).toBe(true);
	});

	it("should expand tooltip on click and emit an onOpen event", () => {
		const fixture = TestBed.createComponent(TooltipTest);
		let wrapper = fixture.componentInstance;
		spyOn(wrapper, "onOpen");
		fixture.detectChanges();

		let button = fixture.debugElement.query(By.css("button"));

		button.nativeElement.click();

		fixture.detectChanges();

		expect(button.nativeElement.getAttribute("aria-expanded")).toBe("true");
		expect(wrapper.onOpen).toHaveBeenCalled();
	});

	it("should use provided custom template", () => {
		const fixture = TestBed.createComponent(TooltipTemplateTest);
		fixture.detectChanges();

		const directiveEl = fixture.debugElement.query(By.directive(TooltipDirective));
		const directiveInstance = directiveEl.injector.get(TooltipDirective);
		expect(directiveInstance.osTooltip instanceof TemplateRef).toBe(true);
	});
});
