import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	CloseModule,
	CheckmarkFilledModule,
	WarningFilledModule
} from "@carbon/icons-angular";

import { FileUploader } from "./file-uploader.component";
import { FileComponent } from "./file.component";
import { ButtonModule } from "@onnetsystems-wat/onnet-design-systems/button";
import { LoadingModule } from "@onnetsystems-wat/onnet-design-systems/loading";

@NgModule({
	declarations: [FileUploader, FileComponent],
	exports: [FileUploader, FileComponent],
	imports: [
		CommonModule,
		ButtonModule,
		LoadingModule,
		CloseModule,
		CheckmarkFilledModule,
		WarningFilledModule
	]
})
export class FileUploaderModule { }
