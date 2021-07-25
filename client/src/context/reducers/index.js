import { combineReducers } from 'redux';

import { msgReducer } from "./msgReducers";

const allReducers = combineReducers({
    msgReducer,
    // Add other reducers
});

export default allReducers;