import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, text } from "@storybook/addon-knobs/angular";

import { CheckboxModule } from "./";
import { DocumentationModule } from "../documentation-component/documentation.module";

storiesOf("Components|Checkbox", module).addDecorator(
	moduleMetadata({
		imports: [CheckboxModule, DocumentationModule]
	})
)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
		<fieldset class="bx--fieldset">
			<legend class="bx--label">{{label}}</legend>
			<os-checkbox
				checked="true"
				[hideLabel]="hideLabel"
				(change)="onChange($event)">
				Checkbox
			</os-checkbox>
			<os-checkbox
				indeterminate="true"
				(change)="onChange($event)"
				[hideLabel]="hideLabel"
				(indeterminateChange)="onIndeterminateChange($event)">
				Indeterminate checkbox
			</os-checkbox>
			<os-checkbox
				disabled="true"
				(change)="onChange($event)"
				[hideLabel]="hideLabel"
				(indeterminateChange)="onIndeterminateChange($event)">
				Disabled checkbox
			</os-checkbox>
		</fieldset>
	`,
		props: {
			onChange: action("Change fired!"),
			onIndeterminateChange: action("Indeterminate change fired!"),
			label: text("Label text", "Checkbox"),
			hideLabel: boolean("Hide labels", false)
		}
	}))
	.add("Skeleton", () => ({
		template: `<os-checkbox skeleton="true"></os-checkbox>`
}))
.add("Documentation", () => ({
	template: `
		<os-documentation src="documentation/components/Checkbox.html"></os-documentation>
	`
}));
