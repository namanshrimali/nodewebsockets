import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgRedux, select } from '@angular-redux/store';
import { IBoardState } from 'node_modules/proflo-sprint-lib/lib/board-interface';
import { ProfloAgileActionTypes} from 'node_modules/proflo-sprint-lib/lib/action';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.sass']
})
export class ColumnComponent implements OnInit {
  @select() columns;
  @Input() column;
  @Input() listOfColumnId;
  constructor(private ngRedux: NgRedux<IBoardState>) {

  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      this.ngRedux.dispatch({type: ProfloAgileActionTypes.MOVE_CARD_WITHIN_COLUMN, payload: {
        columnId: event.container.id,
        previousTaskPosition: event.previousIndex,
        currentTaskPosition: event.currentIndex
      } });
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.ngRedux.dispatch({type: ProfloAgileActionTypes.MOVE_CARD_ACROSS_COLUMN, payload: {
        previousColumnId : event.previousContainer.id,
        currentColumnId: event.container.id,
        previousTaskPosition: event.previousIndex,
        currentTaskPosition: event.currentIndex
      }});
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
