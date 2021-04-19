import {combineReducers} from "redux";
import {SET_USER_DATA} from './actions'


const initialUserState = {};
const initialState = null;

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return action.payload;
    default:
      return state
  }
}
const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return action.payload;
    default:
      return state
  }
}

const reducer = combineReducers({
  authenticationData: userReducer,
  currentState: stateReducer,
})



export default reducer