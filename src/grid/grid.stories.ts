import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, object } from "@storybook/addon-knobs/angular";

import { GridModule } from "../";
import { DocumentationModule } from "../documentation-component/documentation.module";

storiesOf("Components|Grid", module)
	.addDecorator(
		moduleMetadata({
			imports: [GridModule, DocumentationModule]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
        	<div osGrid [condensed]="gridCondensed">
				<div
					osRow
					[gutter]="gutter"
					[leftGutter]="leftGutter"
					[rightGutter]="rightGutter"
					[condensed]="rowCondensed">
              		<div osCol class="custom-class-example" [columnNumbers]="{'md': 2, 'sm': 12}">First Column</div>
					<div osCol class="custom-class-example" [columnNumbers]="{'md': 2, 'sm': 12}">Second column</div>
					<div osCol class="custom-class-example" [columnNumbers]="{'md': 2, 'sm': 12}">Third Column</div>
            	</div>
         	</div>
		`,
		props: {
			gutter: boolean("Gutter", true),
			leftGutter: boolean("Left gutter", true),
			rightGutter: boolean("Right gutter", true),
			rowCondensed: boolean("Row condensed", false),
			gridCondensed: boolean("Grid condensed", false)
		}
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/directives/GridDirective.html"></os-documentation>
		`
	}));
