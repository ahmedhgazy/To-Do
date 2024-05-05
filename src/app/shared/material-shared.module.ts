import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';

const material = [
  MatSlideToggleModule,
  MatIconModule,
  MatDividerModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatInputModule,
  MatFormFieldModule,
  DragDropModule,
  CdkDropList,
  CdkDrag,
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
];

@NgModule({
  imports: [material],
  exports: [material],
  declarations: [],
})
export class MaterialTheme {}
