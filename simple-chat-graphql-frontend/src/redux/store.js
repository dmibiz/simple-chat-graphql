import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import authReducer from './reducers/authReducer';
import logger from 'redux-logger'

const reducers = combineReducers({auth: authReducer});

export const initStore = (initialState = {}) => {
   return createStore(
       reducers,
       initialState,
       composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
   )
};