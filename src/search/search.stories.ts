import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import {
	withKnobs,
	boolean,
	select,
	text
} from "@storybook/addon-knobs/angular";

import { SearchModule } from "../";
import { DocumentationModule } from "../documentation-component/documentation.module";

storiesOf("Components|Search", module).addDecorator(
	moduleMetadata({
		imports: [SearchModule, DocumentationModule]
	})
)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<os-search
				[theme]="theme"
				[placeholder]="placeholder"
				[autocomplete]="autocomplete"
				[disabled]="disabled"
				[size]="size"
				(valueChange)="valueChange($event)"
				(clear)="clear()">
			</os-search>
		`,
		props: {
			size: select("size", ["sm", "md", "xl"], "md"),
			theme: select("theme", ["dark", "light"], "dark"),
			disabled: boolean("disabled", false),
			autocomplete: text("autocomplete", "on"),
			placeholder: text("placeholder", "Search"),
			valueChange: action("value change fired!"),
			clear: action("clear fired!")
		}
	}))
	.add("Toolbar search", () => ({
		template: `
		<div class="bx--toolbar">
			<os-search placeholder="search" size="sm" toolbar="true"></os-search>
		</div>
		`
	}))
	.add("Skeleton", () => ({
		template: `
		<div style="width: 200px;">
			<os-search skeleton="true"></os-search>
			&nbsp;
			<os-search skeleton="true" size="sm"></os-search>
		</div>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/Search.html"></os-documentation>
		`
	}));
