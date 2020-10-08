import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, text, select } from "@storybook/addon-knobs/angular";

import { DialogModule } from "../dialog.module";
import { PlaceholderModule } from "../../placeholder/index";
import { DocumentationModule } from "../../documentation-component/documentation.module";

storiesOf("Components|Tooltip Definition", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				DialogModule,
				PlaceholderModule,
				DocumentationModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<os-tooltip-definition
				[content]="content"
				[placement]="placement"
				[alignment]="alignment">
				{{triggerText}}
			</os-tooltip-definition>
		`,
		props: {
			placement: select("Tooltip direction", ["bottom", "top"], "bottom"),
			alignment: select("Tooltip alignment", ["start", "center", "end"], "start"),
			triggerText: text("Tooltip text", "Definition Tooltip"),
			content: text("Tooltip content", "Brief description of the dotted, underlined word above.")
		}
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/TooltipDefinition.html"></os-documentation>
		`
	}));
