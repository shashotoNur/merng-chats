import { createStore } from 'redux';

// Reducers
import allReducers from './reducers/index';

// Central Data Store
const dataStore = createStore(allReducers);

export default dataStore;