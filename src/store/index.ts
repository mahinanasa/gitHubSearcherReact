/*  Imports from Redux:
 applyMiddleware: Applies middleware to the dispatch method of the Redux store
 combineReducers: Merges reducers into one
 createStore: Creates a Redux store that holds the state tree
 Store: The TS Type used for the store, or state tree
 */
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';



/*  Thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
*/
import thunk from 'redux-thunk';

//For Persist
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import reducers 
import {
  UserReducer,
} from './user/reducer';

// Import state type
import {
  IUserState,
} from './user/types';

import {
  RepositoryReducer,
} from './repository/reducer';


import {
  ISearchState,
} from './search/types';

import {
  SearchReducer,
} from './search/reducer';


import {
  IRepositoryState,
} from './repository/types';

// Create an interface for the application state
export interface IAppState {

  UserState: IUserState;
  RepositoryState: IRepositoryState;
  SearchState: ISearchState
}

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
  UserState: UserReducer, RepositoryState: RepositoryReducer, SearchState: SearchReducer
});


//Redux Persist Config
const persistConfig = {
  key: 'githubSearcher',
  storage
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<IAppState, any> {
  const store = createStore(persistedReducer, undefined, composeWithDevTools(applyMiddleware(thunk)));
  const persistor = persistStore(store);
  return store;
}