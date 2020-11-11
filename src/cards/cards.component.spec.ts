import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";

import { Card } from "./cards.component";
import BDDTestParser from "exported-tests/src/parsers/BDD";

@Component({
	template: `
	<os-card
		
	</os-card>
	`
})
class CardTest {
	model = false;
	hidelabel = true;
	indeterminate = false;
	onChange() {}
	onIndeterminateChange() {}
}

const testingSetup = (CardComponent) => {
	// Due to TestBed being used outside the test suite, it'll need to be reset
	TestBed.resetTestingModule();
	// configureTestingModule normally happens in `beforeEach`, but needed here because
	// Exported Tests need access to the compiled component into the `fixture` variable
	TestBed.configureTestingModule({
		declarations: [Card, CardTest],
		imports: [CommonModule, FormsModule]
	});

	return TestBed.createComponent(CardComponent);
};

const setupFixture = testingSetup(CardTest);

