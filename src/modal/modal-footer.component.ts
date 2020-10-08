import { Component } from "@angular/core";

@Component({
	selector: "os-modal-footer",
	template: `
		<footer class="bx--modal-footer">
			<ng-content></ng-content>
		</footer>
	`
})
export class ModalFooter {}
