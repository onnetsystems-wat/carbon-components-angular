import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, text } from "@storybook/addon-knobs/angular";

import { CardModule } from "./";
import { DocumentationModule } from "../documentation-component/documentation.module";

storiesOf("Components|Card", module).addDecorator(
	moduleMetadata({
		imports: [CardModule, DocumentationModule]
	})
)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
		<os-card>
				
		</os-card>
	`
	}))
	

