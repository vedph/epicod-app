import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EpicodCoreModule } from '@myrmidon/epicod-core';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, EpicodCoreModule],
  exports: [],
})
export class EpicodApiModule {}
