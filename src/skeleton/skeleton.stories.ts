import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, number } from "@storybook/addon-knobs/angular";

import { SkeletonModule } from "./index";

storiesOf("Components|Skeleton", module).addDecorator(
	moduleMetadata({
		imports: [ SkeletonModule ]
	})
)
	.addDecorator(withKnobs)
	.add("Skeleton Placeholder", () => ({
		template: `<os-skeleton-placeholder></os-skeleton-placeholder>`
	}))
	.add("Skeleton Text", () => ({
		template: `
			<os-skeleton-text
				[lines]="lines"
				[minLineWidth]="minLineWidth"
				[maxLineWidth]="maxLineWidth">
			</os-skeleton-text>
			`,
		props: {
			minLineWidth: number("Min width of line (in px)", 100),
			maxLineWidth: number("Max width of line (in px)", 300),
			lines: number("Number of lines", 4)
		}
	}));
