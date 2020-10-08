import { storiesOf, moduleMetadata } from "@storybook/angular";
import {
	withKnobs,
	number,
	boolean,
	object
} from "@storybook/addon-knobs";

import { DialogModule } from "../../index";
import { PlaceholderModule } from "../../placeholder/index";
import { DocumentationModule } from "./../../documentation-component/documentation.module";

import { DocumentModule } from "@carbon/icons-angular";

let options;

function createOptions(count: number): Array<string> {
	if (options && count === options.length) {
		return options;
	}
	options = Array(count).fill(0).map((x, i) => "Option " + (i + 1));
	return options;
}

storiesOf("Components|Overflow Menu", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				DialogModule,
				DocumentModule,
				PlaceholderModule,
				DocumentationModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<div>
				<h1 style="margin-bottom: 1rem">Bottom placement</h1>
				<os-overflow-menu
					[flip]="flip"
					[offset]="offset">
					<os-overflow-menu-option (selected)="selected($event)" (click)="click($event)">
						An example option that is really long to show what should be done to handle long text
					</os-overflow-menu-option>
					<os-overflow-menu-option (selected)="selected($event)">Option 2</os-overflow-menu-option>
					<li class="bx--overflow-menu-options__option">
						<button class="bx--overflow-menu-options__btn">A fully custom option</button>
					</li>
					<os-overflow-menu-option (selected)="selected($event)">Option 4</os-overflow-menu-option>
					<os-overflow-menu-option disabled="true" (selected)="selected($event)">Disabled</os-overflow-menu-option>
					<os-overflow-menu-option type="danger" (selected)="selected($event)">Danger option</os-overflow-menu-option>
				</os-overflow-menu>
				<os-placeholder></os-placeholder>
			</div>
			<div style="margin-top: 8rem">
				<h1 style="margin-bottom: 1rem">Top placement</h1>
				<os-overflow-menu
					[flip]="flip"
					placement="top"
					[offset]="offset">
					<os-overflow-menu-option (selected)="selected($event)" (click)="click($event)">
						An example option that is really long to show what should be done to handle long text
					</os-overflow-menu-option>
					<os-overflow-menu-option (selected)="selected($event)">Option 2</os-overflow-menu-option>
					<li class="bx--overflow-menu-options__option">
						<button class="bx--overflow-menu-options__btn">A fully custom option</button>
					</li>
					<os-overflow-menu-option (selected)="selected($event)">Option 4</os-overflow-menu-option>
					<os-overflow-menu-option disabled="true" (selected)="selected($event)">Disabled</os-overflow-menu-option>
					<os-overflow-menu-option type="danger" (selected)="selected($event)">Danger option</os-overflow-menu-option>
				</os-overflow-menu>
				<os-placeholder></os-placeholder>
			</div>
		`,
		props: {
			click: () => console.log("click"),
			selected: () => console.log("selected"),
			flip: boolean("Flipped", false),
			offset: object("Horizontal and vertical offset", { x: 0, y: 0 })
		}
	}))
	.add("With links", () => ({
		template: `
			<div>
				<h1 style="margin-bottom: 1rem">Bottom placement</h1>
				<os-overflow-menu
					[flip]="flip"
					[offset]="offset">
					<os-overflow-menu-option href="https://www.os.com" (selected)="selected($event)" (click)="click($event)">
						An example option that is really long to show what should be done to handle long text
					</os-overflow-menu-option>
					<os-overflow-menu-option href="https://www.os.com" (selected)="selected($event)">Option 2</os-overflow-menu-option>
					<os-overflow-menu-option href="https://www.os.com" (selected)="selected($event)">Option 3</os-overflow-menu-option>
					<os-overflow-menu-option href="https://www.os.com" (selected)="selected($event)">Option 4</os-overflow-menu-option>
					<os-overflow-menu-option href="https://www.os.com" disabled="true" (selected)="selected($event)">Disabled</os-overflow-menu-option>
					<os-overflow-menu-option href="https://www.os.com" type="danger" (selected)="selected($event)">
						Danger option
					</os-overflow-menu-option>
				</os-overflow-menu>
			</div>
			<div style="margin-top: 8rem">
				<h1 style="margin-bottom: 1rem">Top placement</h1>
				<os-overflow-menu
					[flip]="flip"
					placement="top"
					[offset]="offset">
					<os-overflow-menu-option href="https://www.os.com" (selected)="selected($event)" (click)="click($event)">
						An example option that is really long to show what should be done to handle long text
					</os-overflow-menu-option>
					<os-overflow-menu-option href="https://www.os.com" (selected)="selected($event)">Option 2</os-overflow-menu-option>
					<os-overflow-menu-option href="https://www.os.com" (selected)="selected($event)">Option 3</os-overflow-menu-option>
					<os-overflow-menu-option href="https://www.os.com" (selected)="selected($event)">Option 4</os-overflow-menu-option>
					<os-overflow-menu-option href="https://www.os.com" disabled="true" (selected)="selected($event)">Disabled</os-overflow-menu-option>
					<os-overflow-menu-option href="https://www.os.com" type="danger" (selected)="selected($event)">
						Danger option
					</os-overflow-menu-option>
				</os-overflow-menu>
			</div>
			<os-placeholder></os-placeholder>
		`,
		props: {
			click: () => console.log("click"),
			selected: () => console.log("selected"),
			flip: boolean("Flipped", false),
			offset: object("Horizontal and vertical offset", { x: 0, y: 0 })
		}
	}))
	.add("With custom trigger", () => ({
		template: `
				<span>Overflow menu with custom trigger icon</span>
				<os-overflow-menu
					[flip]="flip"
					[customTrigger]="customTrigger"
					placement="bottom"
					[offset]="offset">
					<os-overflow-menu-option (selected)="selected($event)" (click)="click($event)">Option 1</os-overflow-menu-option>
					<os-overflow-menu-option (selected)="selected($event)">Option 2</os-overflow-menu-option>
					<os-overflow-menu-option disabled="true" (selected)="selected($event)">Disabled</os-overflow-menu-option>
					<os-overflow-menu-option type="danger" (selected)="selected($event)">Danger option</os-overflow-menu-option>
				</os-overflow-menu>
				<os-placeholder></os-placeholder>
				<ng-template #customTrigger><svg ibmIconDocument size="16"></svg></ng-template>
		`,
		props: {
			click: () => console.log("click"),
			selected: () => console.log("selected"),
			flip: boolean("Flipped", false),
			offset: object("Horizontal and vertical offset", { x: 0, y: 0 })
		}
	}))
	.add("Dynamic", () => ({
		template: `
			<span>
				Dynamic <code style="font-family: monospace;">OverflowMenu</code>,
				using the <code style="font-family: monospace;">optionCount</code> knob <br/>
				to change the number of menu options
			</span>
			<os-overflow-menu [offset]="offset">
				<os-overflow-menu-option *ngFor="let option of options(optionCount)">
					{{option}}
				</os-overflow-menu-option>
			</os-overflow-menu>
		`,
		props: {
			optionCount: number("optionCount", 10),
			options: createOptions,
			offset: object("Horizontal and vertical offset", { x: 0, y: 0 })
		}
	}))
	.add("Programmatically", () => ({
		template: `
			<os-overflow-menu [flip]="flip" [open]="open">
				<os-overflow-menu-option (selected)="selected($event)" (click)="click($event)">
					An example option that is really long to show what should be done to handle long text
				</os-overflow-menu-option>
				<os-overflow-menu-option (selected)="selected($event)">Option 2</os-overflow-menu-option>
				<li class="bx--overflow-menu-options__option">
					<button class="bx--overflow-menu-options__btn">A fully custom option</button>
				</li>
				<os-overflow-menu-option (selected)="selected($event)">Option 4</os-overflow-menu-option>
				<os-overflow-menu-option disabled="true" (selected)="selected($event)">Disabled</os-overflow-menu-option>
				<os-overflow-menu-option type="danger" (selected)="selected($event)">Danger option</os-overflow-menu-option>
			</os-overflow-menu>
			<os-placeholder></os-placeholder>
		`,
		props: {
			open: boolean("Open", false)
		}
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/OverflowMenu.html"></os-documentation>
		`
	}));
