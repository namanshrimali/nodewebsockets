import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IColumn } from 'node_modules/proflo-sprint-lib/lib/column-interface';
import { NgRedux, select } from '@angular-redux/store';
import { IBoardState } from 'node_modules/proflo-sprint-lib/lib/board-interface'; // will be imported from npm package soon :)
import { ProfloAgileActionTypes} from 'node_modules/proflo-sprint-lib/lib/action';
import { KanbanService } from '../service/kanban.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  @select() columns;
  private _docSub: Subscription;
  currentDoc: string;
  listOfColumnId: string[] = [];
  listOfColumns: IColumn[] = [{
    id: '100',
    columnName: 'Column One',
    tasks: [{
      id: '21',
      taskName: 'Task one',
      taskTshirtSize: 'L',
      taskAssignedTo: 'Naman Shrimali',
      taskCategory: 'Must'
    },
    {
      id: '22',
      taskName: 'Task Two',
      taskTshirtSize: 'XL',
      taskAssignedTo: 'Naman Shrimali',
      taskCategory: 'Must'
    },
    ]
  },
  {
    id: '101',
    columnName: 'Column Two',
    tasks: [{
      id: '23',
      taskName: 'Task Three',
      taskTshirtSize: 'L',
      taskAssignedTo: 'Naman Shrimali',
      taskCategory: 'Must'
    },
    {
      id: '24',
      taskName: 'Task Four',
      taskTshirtSize: 'S',
      taskAssignedTo: 'Naman Shrimali',
      taskCategory: 'Try'
    },
    ]
  },
  {
    id: '103',
    columnName: 'Column Three',
    tasks: [{
      id: '25',
      taskName: 'Task Five',
      taskTshirtSize: 'XXL',
      taskAssignedTo: 'Naman Shrimali',
      taskCategory: 'Stretch'
    },
    {
      id: '26',
      taskName: 'Task Six',
      taskTshirtSize: 'S',
      taskAssignedTo: 'Naman Shrimali',
      taskCategory: 'Must'
    },
    ]
  },
  ];
  column: any;

  constructor(private ngRedux: NgRedux<IBoardState>, private kanbanService: KanbanService) { }

  ngOnInit() {
    this.listOfColumns.forEach((column) => {
      this.listOfColumnId.push(column.id);
    });
    this.ngRedux.dispatch({ type: ProfloAgileActionTypes.UPDATE_STATE, payload: this.listOfColumns });
    this.column = JSON.parse(JSON.stringify(this.listOfColumns));
    this.kanbanService.connectToSocket();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex !== event.currentIndex) {
      this.ngRedux.dispatch({
        type: ProfloAgileActionTypes.MOVE_COLUMN, payload: {
          currentColumnIndex: event.currentIndex,
          previousColumnIndex: event.previousIndex,
        }
      });
      moveItemInArray(this.column, event.previousIndex, event.currentIndex);
    }
  }
}
