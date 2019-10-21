import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IBoardState } from 'node_modules/proflo-sprint-lib/lib/board-interface';
import { ProfloAgileActionTypes} from 'node_modules/proflo-sprint-lib/lib/action';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  currentBoard = this.socket.fromEvent<IBoardState>('document');
  documents = this.socket.fromEvent<string[]>('documents');
  constructor(private socket: Socket) { }

  connectToSocket() {
    this.socket.emit(ProfloAgileActionTypes.MOVE_CARD_WITHIN_COLUMN, {
      payload: {
        connectedTo : '1'
      }
    });
  }
}
