import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

/*  we start with a empty inital state
    all initalizing of initial states are done in
    the reducers. */
const initialState = {};

/*  thunk is needed inorder to preforme async actions */
const middleware = [thunk];

const store = createStore(reducer,
                              initialState,
                              applyMiddleware(...middleware))
export default store
