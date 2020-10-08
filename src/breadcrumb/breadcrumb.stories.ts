import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs/angular";

import { BreadcrumbModule } from "./";
import { BreadcrumbItem } from "../breadcrumb/breadcrumb-item.interface";
import { DialogModule } from "../dialog";
import { DocumentationModule } from "../documentation-component/documentation.module";

let breadcrumbItems;

const createBreadcrumbItems = (count: number, content = "Breadcrumb"): Array<BreadcrumbItem> => {
	if (breadcrumbItems && count === breadcrumbItems.length) {
		return breadcrumbItems;
	}
	breadcrumbItems = Array(count).fill(0).map((x, i) => ({
		content: `${content} ${i + 1}`,
		href: "#" + (i + 1)
	}));
	return breadcrumbItems;
};

const withTemplate = (templateRef, items) => items.map(item => Object.assign(item, { template: templateRef }));

storiesOf("Components|Breadcrumb", module)
.addDecorator(
	moduleMetadata({
		imports: [
			BreadcrumbModule,
			DialogModule,
			DocumentationModule
		]
	})
)
.addDecorator(withKnobs)
.add("Basic", () => ({
	template: `
	<os-breadcrumb [noTrailingSlash]="noTrailingSlash">
		<os-breadcrumb-item href="#1">
			Breadcrumb 1
		</os-breadcrumb-item>
		<os-breadcrumb-item href="#2">
			Breadcrumb 2
		</os-breadcrumb-item>
		<os-breadcrumb-item href="#3">
			Breadcrumb 3
		</os-breadcrumb-item>
	</os-breadcrumb>`,
	props: {
		noTrailingSlash: boolean("noTrailingSlash", true)
	}
}))
.add("Current page", () => ({
	template: `
	<os-breadcrumb [noTrailingSlash]="noTrailingSlash">
		<os-breadcrumb-item href="#1">
			Breadcrumb 1
		</os-breadcrumb-item>
		<os-breadcrumb-item href="#2">
			Breadcrumb 2
		</os-breadcrumb-item>
		<os-breadcrumb-item current="true" href="#3">
			Breadcrumb 3
		</os-breadcrumb-item>
	</os-breadcrumb>`,
	props: {
		noTrailingSlash: boolean("noTrailingSlash", true)
	}
}))
.add("Model", () => ({
	template: `
	<os-breadcrumb
		[noTrailingSlash]="noTrailingSlash"
		[threshold]="threshold"
		[items]="createBreadcrumbItems(itemCount, content)">
	</os-breadcrumb>`,
	props: {
		noTrailingSlash: boolean("noTrailingSlash", true),
		itemCount: number("itemCount", 10),
		threshold: number("threshold", 4),
		content: text("Content for the items", "Breadcrumb"),
		createBreadcrumbItems
	}
}))
.add("Model with templates", () => ({
	template: `
	<ng-template #breadcrumbTemplate let-item>
		{{ templateContent }}{{ item.content }}
	</ng-template>
	<os-breadcrumb
		[noTrailingSlash]="noTrailingSlash"
		[threshold]="threshold"
		[items]="withTemplate(breadcrumbTemplate, createBreadcrumbItems(itemCount, content))">
	</os-breadcrumb>
	`,
	props: {
		noTrailingSlash: boolean("noTrailingSlash", true),
		itemCount: number("itemCount", 10),
		threshold: number("threshold", 4),
		templateContent: text("Content for the template", "Hello "),
		content: text("Content for the items", "breadcrumb"),
		createBreadcrumbItems,
		withTemplate
	}
}))
.add("Skeleton", () => ({
	template: `
	<os-breadcrumb skeleton="true" [noTrailingSlash]="noTrailingSlash">
		<os-breadcrumb-item></os-breadcrumb-item>
		<os-breadcrumb-item></os-breadcrumb-item>
		<os-breadcrumb-item></os-breadcrumb-item>
		<os-breadcrumb-item></os-breadcrumb-item>
	</os-breadcrumb>`,
	props: {
		noTrailingSlash: boolean("noTrailingSlash", true)
	}
}))
.add("Documentation", () => ({
	template: `
		<os-documentation src="documentation/components/Breadcrumb.html"></os-documentation>
	`
}));
