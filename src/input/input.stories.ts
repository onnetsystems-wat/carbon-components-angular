import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import {
	withKnobs,
	text,
	boolean,
	select,
	number
} from "@storybook/addon-knobs/angular";

import { InputModule } from "../";
import { DocumentationModule } from "../documentation-component/documentation.module";

storiesOf("Components|Input", module).addDecorator(
	moduleMetadata({
		imports: [InputModule, DocumentationModule]
	})
)
	.addDecorator(withKnobs)
	.add("Label", () => ({
		template: `
		<os-label
			[helperText]="helperText"
			[invalid]="invalid"
			[invalidText]="invalidText">
			{{label}}
			<input
				osText
				[size]="size"
				[invalid]="invalid"
				[disabled]="disabled"
				[theme]="theme"
				[placeholder]="placeholder"
				[autocomplete]="autocomplete">
		</os-label>
	`,
		props: {
			theme: select("Theme", ["dark", "light"], "dark"),
			size: select("Size", ["sm", "md", "xl"], "md"),
			disabled: boolean("Disabled", false),
			invalid: boolean("Show form validation", false),
			invalidText: text("Form validation content", "Validation message here"),
			label: text("Label", "Text Input label"),
			helperText: text("Helper text", "Optional helper text."),
			placeholder: text("Placeholder text", "Placeholder text"),
			autocomplete: text("autocomplete", "on")
		}
	}))
	.add("TextArea", () => ({
		template: `
		<os-label
			[helperText]="helperText"
			[invalid]="invalid"
			[invalidText]="invalidText">
			{{label}}
			<textarea
				osTextArea
				[placeholder]="placeholder"
				[invalid]="invalid"
				[disabled]="disabled"
				[theme]="theme"
				[rows]="rows"
				[cols]="cols"
				aria-label="textarea"></textarea>
		</os-label>
	`,
		props: {
			theme: select("Theme", ["dark", "light"], "dark"),
			disabled: boolean("Disabled", false),
			invalid: boolean("Show form validation", false),
			invalidText: text("Form validation content", "Validation message here"),
			label: text("Label", "Text area label"),
			helperText: text("Helper text", "Optional helper text."),
			placeholder: text("Placeholder text", "Placeholder text"),
			cols: number("cols", 50),
			rows: number("rows", 4)
		}
	}))
	.add("Skeleton", () => ({
		template: `
		<os-label skeleton="true">
			<input osText skeleton="true">
		</os-label>
		<br>
		<input osText skeleton="true">
		<br><br>
		<os-label skeleton="true">
			<div osTextArea skeleton="true"></div>
		</os-label>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/Label.html"></os-documentation>
		`
	}));
