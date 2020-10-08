import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import { StructuredListModule } from "../";
import { DocumentationModule } from "../documentation-component/documentation.module";

storiesOf("Components|Structured List", module).addDecorator(
	moduleMetadata({
		imports: [StructuredListModule, DocumentationModule]
	}))
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<os-structured-list [border]="border" [condensed]="condensed" [nowrap]="nowrap">
				<os-list-header>
					<os-list-column nowrap="true">Column 1</os-list-column>
					<os-list-column nowrap="true">Column 2</os-list-column>
					<os-list-column>Column 3</os-list-column>
				</os-list-header>
				<os-list-row>
					<os-list-column>Row 1</os-list-column>
					<os-list-column nowrap="true">Row One</os-list-column>
					<os-list-column>
						Lorem ipsum dolor sit amet,
						consectetur adipiscing elit. Nunc dui magna,
						finibus id tortor sed, aliquet bibendum augue.
						Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor.
						Pellentesque vulputate nisl a porttitor interdum.
					</os-list-column>
				</os-list-row>
				<os-list-row>
					<os-list-column>Row 2</os-list-column>
					<os-list-column nowrap="true">Row Two</os-list-column>
					<os-list-column>
						Lorem ipsum dolor sit amet,
						consectetur adipiscing elit. Nunc dui magna,
						finibus id tortor sed, aliquet bibendum augue.
						Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor.
						Pellentesque vulputate nisl a porttitor interdum.
					</os-list-column>
				</os-list-row>
			</os-structured-list>
		`,
		props: {
			border: boolean("border", false),
			condensed: boolean("condensed", false),
			nowrap: boolean("nowrap", false)
		}
	}))
	.add("With selection", () => ({
		template: `
			<os-structured-list
				[border]="border"
				[condensed]="condensed"
				[nowrap]="nowrap"
				selection="true"
				(selected)="selected($event)">
				<os-list-header>
					<os-list-column nowrap="true">Column 1</os-list-column>
					<os-list-column nowrap="true">Column 2</os-list-column>
					<os-list-column>Column 3</os-list-column>
				</os-list-header>
				<os-list-row value="row1">
					<os-list-column>Row 1</os-list-column>
					<os-list-column nowrap="true">Row One</os-list-column>
					<os-list-column>
						Lorem ipsum dolor sit amet,
						consectetur adipiscing elit. Nunc dui magna,
						finibus id tortor sed, aliquet bibendum augue.
						Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor.
						Pellentesque vulputate nisl a porttitor interdum.
					</os-list-column>
				</os-list-row>
				<os-list-row value="row2">
					<os-list-column>Row 2</os-list-column>
					<os-list-column nowrap="true">Row Two</os-list-column>
					<os-list-column>
						Lorem ipsum dolor sit amet,
						consectetur adipiscing elit. Nunc dui magna,
						finibus id tortor sed, aliquet bibendum augue.
						Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor.
						Pellentesque vulputate nisl a porttitor interdum.
					</os-list-column>
				</os-list-row>
			</os-structured-list>
		`,
		props: {
			selected: action("row selected"),
			border: boolean("border", true),
			condensed: boolean("condensed", false),
			nowrap: boolean("nowrap", false)
		}
	}))
	.add("With ngModel", () => ({
		template: `
			<os-structured-list
				[border]="border"
				[condensed]="condensed"
				[nowrap]="nowrap"
				selection="true"
				[(ngModel)]="valueSelected">
				<os-list-header>
					<os-list-column nowrap="true">Column 1</os-list-column>
					<os-list-column nowrap="true">Column 2</os-list-column>
					<os-list-column>Column 3</os-list-column>
				</os-list-header>
				<os-list-row value="row1">
					<os-list-column>Row 1</os-list-column>
					<os-list-column nowrap="true">Row One</os-list-column>
					<os-list-column>
						Lorem ipsum dolor sit amet,
						consectetur adipiscing elit. Nunc dui magna,
						finibus id tortor sed, aliquet bibendum augue.
						Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor.
						Pellentesque vulputate nisl a porttitor interdum.
					</os-list-column>
				</os-list-row>
				<os-list-row value="row2">
					<os-list-column>Row 2</os-list-column>
					<os-list-column nowrap="true">Row Two</os-list-column>
					<os-list-column>
						Lorem ipsum dolor sit amet,
						consectetur adipiscing elit. Nunc dui magna,
						finibus id tortor sed, aliquet bibendum augue.
						Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor.
						Pellentesque vulputate nisl a porttitor interdum.
					</os-list-column>
				</os-list-row>
			</os-structured-list>
			<p>{{valueSelected}}</p>
		`,
		props: {
			border: boolean("border", true),
			condensed: boolean("condensed", false),
			nowrap: boolean("nowrap", false)
		}
	}))
	.add("Skeleton", () => ({
		template: `
		<div style="width: 800px">
			<os-structured-list skeleton="true">
				<os-list-header>
					<os-list-column></os-list-column>
					<os-list-column></os-list-column>
					<os-list-column></os-list-column>
				</os-list-header>
				<os-list-row>
					<os-list-column></os-list-column>
					<os-list-column></os-list-column>
					<os-list-column></os-list-column>
				</os-list-row>
				<os-list-row>
					<os-list-column></os-list-column>
					<os-list-column></os-list-column>
					<os-list-column></os-list-column>
				</os-list-row>
			</os-structured-list>

			<os-structured-list skeleton="true" border="true">
				<os-list-header>
					<os-list-column></os-list-column>
					<os-list-column></os-list-column>
					<os-list-column></os-list-column>
				</os-list-header>
				<os-list-row>
					<os-list-column></os-list-column>
					<os-list-column></os-list-column>
					<os-list-column></os-list-column>
				</os-list-row>
				<os-list-row>
					<os-list-column></os-list-column>
					<os-list-column></os-list-column>
					<os-list-column></os-list-column>
				</os-list-row>
			</os-structured-list>
		</div>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/StructuredList.html"></os-documentation>
		`
	}));

