import { storiesOf, moduleMetadata } from "@storybook/angular";

import { ListModule } from "../";
import { DocumentationModule } from "../documentation-component/documentation.module";

storiesOf("Components|List", module).addDecorator(
	moduleMetadata({
		imports: [ListModule, DocumentationModule]
	}))
	.add("Basic", () => ({
		template: `
			<p>Ordered List</p>
			<ol osList>
				<li osListItem>One</li>
				<li osListItem>Two</li>
				<li osListItem>Three</li>
			</ol>
			<p>Unordered List</p>
			<ul osList>
				<li osListItem>One</li>
				<li osListItem>Two</li>
				<li osListItem>Three</li>
			</ul>
		`
	}))
	.add("With nesting", () => ({
		template: `
			<p>Ordered List</p>
			<ol osList>
				<li osListItem>
					One
					<ol osList>
						<li osListItem>Nested one</li>
						<li osListItem>Nested two</li>
						<li osListItem>Nested three</li>
					</ol>
				</li>
				<li osListItem>Two</li>
				<li osListItem>Three</li>
			</ol>
			<p>Unordered List</p>
			<ul osList>
				<li osListItem>
					One
					<ul osList>
						<li osListItem>Nested one</li>
						<li osListItem>Nested two</li>
						<li osListItem>Nested three</li>
					</ul>
				</li>
				<li osListItem>Two</li>
				<li osListItem>Three</li>
			</ul>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/directives/List.html"></os-documentation>
		`
	}));
