// Import Reducer type
import { Reducer } from 'redux';

import {
  SearchActionTypes, ISearchState,
} from './types';



// Define the initial state
const initialSearchState: ISearchState = {
  searchText: '',
  entityType: ''
};

export const SearchReducer: Reducer<ISearchState> = (
  state = initialSearchState,
  action
) => {


  switch (action.type) {
    case SearchActionTypes.SEARCHTXT: {
      return { ...state, searchText: action.searchText }
    }
    case SearchActionTypes.ENTITYTYPE: {
      return { ...state, entityType: action.entityType }
    }

    default:
      return state;
  }
};