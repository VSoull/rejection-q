import { combineReducers } from "@reduxjs/toolkit";
import { reducer } from "./rejection/rejection-reducer";

const rootReducer = combineReducers({
  reducer,
});

export default rootReducer;
