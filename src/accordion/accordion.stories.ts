import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, object } from "@storybook/addon-knobs/angular";

import { AccordionModule } from "../accordion";
import { DocumentationModule } from "../documentation-component/documentation.module";

storiesOf("Components|Accordion", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				AccordionModule,
				DocumentationModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<os-accordion>
				<os-accordion-item title="Section 1 title" (selected)="selected($event)">Lorem ipsum dolor sit amet, \
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore \
				et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation \
				ullamco laboris nisi ut aliquip ex ea commodo consequat.</os-accordion-item>
				<os-accordion-item title="Section 2 title" (selected)="selected($event)">Lorem ipsum dolor sit amet, \
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore \
				et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation \
				ullamco laboris nisi ut aliquip ex ea commodo consequat.</os-accordion-item>
				<os-accordion-item title="Section 3 title" (selected)="selected($event)">Lorem ipsum dolor sit amet, \
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore \
				et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation \
				ullamco laboris nisi ut aliquip ex ea commodo consequat.</os-accordion-item>
				<os-accordion-item title="Section 4 title" (selected)="selected($event)">Lorem ipsum dolor sit amet, \
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore \
				et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation \
				ullamco laboris nisi ut aliquip ex ea commodo consequat.</os-accordion-item>
			</os-accordion>
		`,
		props: {
			items: [
				{
					content: "one"
				},
				{
					content: "two"
				},
				{
					content: "three"
				},
				{
					content: "four"
				}
			],
			selected: action("item expanded")
		}
	}))
	.add("With title template", () => ({
		template: `
			<div style="width: 500px">
				<os-accordion>
					<os-accordion-item [title]="title" (selected)="selected($event)">Lorem ipsum dolor sit amet, \
					consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore \
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation \
					ullamco laboris nisi ut aliquip ex ea commodo consequat.</os-accordion-item>
					<os-accordion-item [title]="titleWithContext" [context]="{ index: 2 }" (selected)="selected($event)">Lorem ipsum dolor sit amet, \
					consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore \
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation \
					ullamco laboris nisi ut aliquip ex ea commodo consequat.</os-accordion-item>
				</os-accordion>
			</div>

			<ng-template #title>
				<p class="bx--accordion__title">Section 1 title</p>
			</ng-template>

			<ng-template #titleWithContext let-index="index">
				<p class="bx--accordion__title">Section {{ index }} title</p>
			</ng-template>
		`,
		props: {
			selected: action("item expanded")
		}
	}))
	.add("Skeleton", () => ({
		template: `
			<div style="width: 500px">
				<os-accordion skeleton="true">
					<os-accordion-item expanded="true"></os-accordion-item>
					<os-accordion-item></os-accordion-item>
					<os-accordion-item></os-accordion-item>
					<os-accordion-item></os-accordion-item>
				</os-accordion>
			</div>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/Accordion.html"></os-documentation>
		`
	}));
