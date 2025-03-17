// import { combineReducers, configureStore } from '@reduxjs/toolkit';

// import questionReducer from './question_reducer';
// import resultReducer from './result_reducer';

// const rootReducer = combineReducers({
//     questions: questionReducer,
//     result: resultReducer
// });

// /** create store with reducer */
// export default configureStore({ reducer: rootReducer }); 

import { configureStore, combineReducers } from "@reduxjs/toolkit"

/** import reducers */
import questionReducer from "./question_reducer"
import resultReducer from "./result_reducer"

const rootReducer = combineReducers({
  questions: questionReducer,
  result: resultReducer,
})

/** create store with reducer */
export const store = configureStore({
  reducer: rootReducer,
})

