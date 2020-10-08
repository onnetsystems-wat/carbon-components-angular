import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs/angular";

import { TagModule } from "../tag/index";
import { DocumentationModule } from "./../documentation-component/documentation.module";

storiesOf("Components|Tag", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				TagModule,
				DocumentationModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<os-tag type="warm-gray">Warm-gray</os-tag>
			<br><br>
			<os-tag type="red">Red</os-tag>
			<br><br>
			<os-tag type="magenta">Magenta</os-tag>
			<br><br>
			<os-tag type="purple">Purple</os-tag>
			<br><br>
			<os-tag type="blue">Blue</os-tag>
			<br><br>
			<os-tag type="cyan">Cyan</os-tag>
			<br><br>
			<os-tag type="teal">Teal</os-tag>
			<br><br>
			<os-tag type="green">Green</os-tag>
			<br><br>
			<os-tag type="cool-gray">Cool-gray</os-tag>
		`
	}))
	.add("Filter", () => ({
		template: `
			<os-tag-filter
				type="blue"
				title="Filter"
				closeButtonLabel="Clear"
			>filter</os-tag-filter>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/Tag.html"></os-documentation>
		`
	}));
