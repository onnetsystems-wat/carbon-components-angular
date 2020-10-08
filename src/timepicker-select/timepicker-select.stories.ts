import { TimePickerSelectModule } from "./index";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs/angular";
import { ExperimentalModule } from "../";
import { DocumentationModule } from "../documentation-component/documentation.module";

storiesOf("Components|Time Picker Select", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				TimePickerSelectModule,
				ExperimentalModule,
				DocumentationModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Simple", () => ({
		template: `
		<div class="bx--form-item">
			<div class="bx--time-picker">
				<os-timepicker-select>
					<option selected value="AM">AM</option>
					<option value="PM">PM</option>
				</os-timepicker-select>
				<os-timepicker-select>
					<option selected value="Time Zone 1">Time Zone 1</option>
					<option value="Time Zone 2">Time Zone 2</option>
				</os-timepicker-select>
			</div>
		</div>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<os-documentation src="documentation/components/TimePickerSelect.html"></os-documentation>
		`
	}));
