import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from "./cards.component";

@NgModule({
  declarations: [Card],
  imports: [
    CommonModule
   
  ],
	exports: [
    Card
	]
})
export class CardModule { }
