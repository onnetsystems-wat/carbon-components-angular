import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs/angular";

import { ContentSwitcherModule } from "./content-switcher.module";
import { DocumentationModule } from "../documentation-component/documentation.module";

storiesOf("Components|Content Switcher", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				ContentSwitcherModule,
				DocumentationModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<os-content-switcher (selected)="selected($event)">
				<button osContentOption name="First">First section</button>
				<button osContentOption name="Second">Second section</button>
				<button osContentOption name="Third">Third section</button>
			</os-content-switcher>
		`,
		props: {
			selected: action("selection changed")
		}
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/ContentSwitcher.html"></os-documentation>
		`
	}));
