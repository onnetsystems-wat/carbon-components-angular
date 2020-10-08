import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, select, text } from "@storybook/addon-knobs/angular";

import {
	CodeSnippetModule,
	ButtonModule } from "..";
import { Input, Component } from "@angular/core";
import { DocumentationModule } from "../documentation-component/documentation.module";

const code = `import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, boolean } from "@storybook/addon-knobs/angular";

import { CodeSnippetModule } from "..";

storiesOf("Components|CodeSnippet", module).addDecorator(
	moduleMetadata({
		imports: [CodeSnippetModule]
	})
)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: \`<os-code-snippet>code</os-code-snippet>\`,
		props: { // there's more
			// disabled: boolean("disabled", false)
		}
	}));`;

const lessCode = `import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, boolean } from "@storybook/addon-knobs/angular";

import { CodeSnippetModule } from "..";

storiesOf("Components|Code Snippet", module).addDecorator(
	moduleMetadata({
		imports: [CodeSnippetModule]
	})
) // that's it, no more after this line
`;

@Component({
	selector: "app-dynamic-code-snippet",
	template: `
		<button osButton (click)="openCodeSnippet()">Show Code Snippet</button>
		<os-code-snippet *ngIf="shouldShow" display="multi">{{displayedCode}}</os-code-snippet>
	`
})
export class DynamicCodeSnippet {
	shouldShow = false;

	@Input() displayedCode = code;

	openCodeSnippet() {
		this.shouldShow = !this.shouldShow;
	}
}

const inlineCode = "<inline code>";

storiesOf("Components|Code Snippet", module).addDecorator(
	moduleMetadata({
		declarations: [DynamicCodeSnippet],
		imports: [CodeSnippetModule, ButtonModule, DocumentationModule]
	})
)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `<os-code-snippet display="single">{{code}}</os-code-snippet>`,
		props: {
			code
		}
	}))
	.add("Multi", () => ({
		template: `
			<h2>With a lot of code</h2>
			<os-code-snippet display="multi">{{code}}</os-code-snippet>

			<h2 style="margin-top: 60px">With less code</h2>
			<os-code-snippet display="multi">{{lessCode}}</os-code-snippet>
		`,
		props: {
			code,
			lessCode
		}
	}))
	.add("Inline", () => ({
		template: `Here is some <os-code-snippet display="inline" [theme]="theme">{{inlineCode}}</os-code-snippet> for you.`,
		props: {
			inlineCode,
			theme: select("Theme", ["dark", "light"], "dark")
		}
	}))
	.add("Skeleton", () => ({
		template: `
			<div style="width: 800px">
				<os-code-snippet display="single" skeleton="true"></os-code-snippet>
				<br>
				<os-code-snippet display="multi" skeleton="true"></os-code-snippet>
			</div>
		`
	}))
	.add("Dynamic", () => ({
		template: `<app-dynamic-code-snippet [displayedCode]="displayedCode"></app-dynamic-code-snippet>`,
		props: {
			displayedCode: text("Displayed code", code)
		}
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/CodeSnippet.html"></os-documentation>
		`
	}));
