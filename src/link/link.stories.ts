import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, boolean } from "@storybook/addon-knobs/angular";

import { LinkModule } from "../";
import { DocumentationModule } from "../documentation-component/documentation.module";

storiesOf("Components|Link", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				LinkModule,
				DocumentationModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<a href="#" osLink [disabled]="disabled" [inline]="inline">link</a>
		`,
		props: {
			disabled: boolean("disabled", false),
			inline: boolean("inline", false)
		}
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/directives/Link.html"></os-documentation>
		`
	}));
