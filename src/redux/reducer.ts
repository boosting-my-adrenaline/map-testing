import { transportationReducer } from './transportation/transportation.reducer'

import { combineReducers } from 'redux'



export const rootReducer = combineReducers({
  transportation: transportationReducer,
})
