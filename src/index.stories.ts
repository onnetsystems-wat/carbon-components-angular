import { storiesOf, moduleMetadata } from "@storybook/angular";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { ButtonModule } from "./button";
import { BeeModule, DocumentModule } from "@carbon/icons-angular";

@Component({
	selector: "app-welcome",
	// tslint:disable:max-line-length
	template: `
		<section class="overview-page__banner" aria-label="overview page banner">

			<h1 class="banner__title"><span class="banner__logo--bold">Onnet</span> Design Systems</h1>
			<h2 class="banner__subtitle">An Angular implementation of Onnet's Design System</h2>

			<div class="banner__links">
				<a osButton="secondary" href="documentation/index.html" target="_blank">
					Documentation
					<svg ibmIconDocument size="20" class="bx--btn__icon"></svg>
				</a>
				
			</div>
		</section>
	`,
	// tslint:enable:max-line-length
	styles: [`
		.overview-page__banner {
			height: 100vh;
			background: #5596e6;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.banner__background {
			position: fixed;
		}
		.banner__title {
			font-size: 3.3vw;
			margin-top: 8vw;
			color: #fff;
			text-transform: uppercase;
			letter-spacing: 1px;
			position: relative;
		}
		.banner__subtitle {
			font-size: 1.8vw;
			color: #fff;
			z-index: 2
		}
		.banner__links {
			margin-top: 20px;
			display: flex;
		}
		.banner__netlify {
			position: relative;
			z-index: 1;
		}
		.banner__logo--bold, .banner__logo span {
			font-weight: 600;
		}
		@media screen and (min-width: 1515px) {
			.banner__title {
			   font-size: 50px;
			}
			.banner__subtitle {
				font-size: 28px;
			}
		}
	`]
})
class WelcomeStory implements OnInit, OnDestroy {
	ngOnInit() {
		document.querySelector(".sb-show-main").classList.add("full-page");
	}
	ngOnDestroy() {
		document.querySelector(".sb-show-main").classList.remove("full-page");
	}
}


storiesOf("Components|Welcome", module)
.addDecorator(
	moduleMetadata({
		imports: [
			ButtonModule,
			BeeModule,
			DocumentModule
		],
		declarations: [WelcomeStory]
	})
)

.add("to Carbon Angular", () => ({
	template: `<app-welcome></app-welcome>`
}));
