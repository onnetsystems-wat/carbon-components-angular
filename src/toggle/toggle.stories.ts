import { storiesOf, moduleMetadata } from "@storybook/angular";
import {
	withKnobs,
	boolean,
	select,
	text
} from "@storybook/addon-knobs/angular";

import { ToggleModule } from "../";
import { DocumentationModule } from "../documentation-component/documentation.module";

storiesOf("Components|Toggle", module).addDecorator(
	moduleMetadata({
		imports: [ToggleModule, DocumentationModule]
	})
)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<os-toggle
				[label]="label"
				[onText]="onText"
				[offText]="offText"
				[disabled]="disabled"
				[checked]="checked"
				[size]="size">
			</os-toggle>
			<os-toggle
				[label]="label"
				[onText]="altOnText"
				[offText]="altOffText"
				[disabled]="disabled"
				[checked]="checked"
				[size]="size">
			</os-toggle>
		`,
		props: {
			disabled: boolean("Disabled", false),
			checked: boolean("Checked", false),
			size: select("Size", ["md", "sm"], "md"),
			label: text("Label text", ""),
			onText: text("On text", "On"),
			offText: text("Off text", "Off"),
			altOffText: text("Alternative off text", "Dark"),
			altOnText: text("Alternative on text", "Light")
		}
	}))
	.add("Skeleton", () => ({
		template: `
			<os-toggle skeleton="true"></os-toggle>
			&nbsp;
			<os-toggle skeleton="true" size="sm"></os-toggle>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/Toggle.html"></os-documentation>
		`
	}));
