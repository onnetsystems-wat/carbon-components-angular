import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, select } from "@storybook/addon-knobs/angular";

import { ButtonModule } from "../";
import { DocumentationModule } from "../documentation-component/documentation.module";

import { AddModule } from "@carbon/icons-angular";


storiesOf("Components|Button", module)
	.addDecorator(
		moduleMetadata({
			imports: [ButtonModule, DocumentationModule, AddModule]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<button [osButton]="osButton" [size]="size">Button</button>
			&nbsp;
			<button [osButton]="osButton" [size]="size" disabled="true">Button</button>
			&nbsp;
			<button [osButton]="osButton" [size]="size">
				With icon<svg class="bx--btn__icon" ibmIconAdd size="20"></svg>
			</button>
		`,
		props: {
			osButton: select("Button kind", ["primary", "secondary", "tertiary", "ghost", "danger", "danger--primary"], "primary"),
			size: select("Size of the buttons", ["normal", "sm", "field"], "normal")
		}
	}))
	.add("Skeleton", () => ({
		template: `
			<button osButton skeleton="true"></button>
			&nbsp;
			<button osButton skeleton="true" size="sm"></button>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/directives/Button.html"></os-documentation>
		`
	}));
