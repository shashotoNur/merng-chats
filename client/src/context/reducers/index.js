import { addMsgReducer, updateMsgReducer, deleteMsgReducer } from "./msgReducers";
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    addMsgReducer,
    updateMsgReducer,
    deleteMsgReducer
});

export default allReducers;