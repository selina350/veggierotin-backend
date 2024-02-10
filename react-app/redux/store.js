import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./controller/userSlice";
import vegetableReducer from "./model/vegetableSlice";


import logger from "redux-logger";
import historySlice from "./model/historySlice";


const controller = combineReducers({
  user: usersReducer
});
const model = combineReducers({
  vegetables: vegetableReducer,
  history: historySlice
});
export default configureStore({
  reducer: {
    controller,
    model,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
