import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, select } from "@storybook/addon-knobs/angular";

import { LoadingModule } from "../";
import { DocumentationModule } from "../documentation-component/documentation.module";

storiesOf("Components|Loading", module).addDecorator(
	moduleMetadata({
		imports: [LoadingModule, DocumentationModule]
	})
)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
		<os-loading [isActive]="isActive" [size]="size" [overlay]="overlay"></os-loading>
	`,
		props: {
			isActive: boolean("Active", true),
			overlay: boolean("With overlay", false),
			size: select("Size of the loading circle", ["normal", "sm"], "normal")
		}
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/Loading.html"></os-documentation>
		`
	}));
