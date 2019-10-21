import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ColumnComponent } from './column/column.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [ColumnComponent, BoardComponent, CardComponent],
  imports: [
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [BoardComponent]
})
export class KanbanModule { }
