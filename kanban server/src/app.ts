import express, { Application } from 'express';
import mongoose from 'mongoose';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors';
// import models here
import { IColumn} from '../node_modules/proflo-sprint-lib/lib/column-interface';
import { IBoardState} from '../node_modules/proflo-sprint-lib/lib/board-interface';
import { ITask} from '../node_modules/proflo-sprint-lib/lib/task-interface';


// import rootReducer here
import {rootReducer} from '../node_modules/proflo-sprint-lib/lib/store';
// import enums here
import {ProfloAgileActionTypes} from '../node_modules/proflo-sprint-lib/lib/action';


const app: Application = express();
const port = process.env.port || 3000;

const MONGO_URI = 'mongodb://127.0.0.1:27017/planage';

const server = http.createServer(app);
export const io = socketio(server);

app.use(express.json())
app.use(cors)
io.origins('*:*')

io.on("connection", socket => {
  console.log("Conection Established");
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on(ProfloAgileActionTypes.MOVE_CARD_WITHIN_COLUMN, (action, callback) => {
    safeJoin(action.payload.productId);
    socket.emit('HI Sockets are connected hurray');
    callback("Successfully connected to web sockets @@ id = ", action.payload.connectedTo);
  });
  // socket.on(ProfloAgileActionTypes.MOVE_CARD_ACROSS_COLUMN, ());
  // socket.on(ProfloAgileActionTypes.CARD_COMPLETED, ());
  // socket.on(ProfloAgileActionTypes.UPDATE_CARD, ());
  // socket.on(ProfloAgileActionTypes.ADD_COLUMN, ());
  // socket.on(ProfloAgileActionTypes.DELETE_COLUMN, ());
  // socket.on(ProfloAgileActionTypes.MOVE_COLUMN, ());
  // socket.on(ProfloAgileActionTypes.EDIT_COLUMN_TITLE, ());
  // socket.on(ProfloAgileActionTypes.UPDATE_STATE, ());
  
});
server.listen(port, () => {
  console.log(`server is running on port ${port}!`)
})