import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {IBoardState} from 'node_modules/proflo-sprint-lib/lib/board-interface';
import {rootReducer, INITIAL_STATE} from 'node_modules/proflo-sprint-lib/lib/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KanbanModule } from './kanban/kanban.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    BrowserAnimationsModule,
    KanbanModule,
    DragDropModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IBoardState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
