import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { EpicodCoreModule } from '@myrmidon/epicod-core';
import { EpicodTextModule } from '@myrmidon/epicod-text';
import { EpicodTreeModule } from '@myrmidon/epicod-tree';

import { EpicodBrowserComponent } from './components/epicod-browser/epicod-browser.component';

@NgModule({
  declarations: [
    EpicodBrowserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // material
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    FlexLayoutModule,
    // epicod
    EpicodCoreModule,
    EpicodTreeModule,
    EpicodTextModule
  ],
  exports: [
    EpicodBrowserComponent
  ],
})
export class EpicodBrowserModule {}
