// Import Reducer type
import { Reducer } from 'redux';
import {
    RepositoryActionTypes,
} from './action';
import {
  IRepositoryState,
  
} from './types';


// Define the initial state
const initialRepositoryState: IRepositoryState = {
  loading: false,
  errors: undefined,
  Repositories: [],
};

export const RepositoryReducer: Reducer<IRepositoryState> = (
  state = initialRepositoryState,
  action
) => {
  switch (action.type) {
    case RepositoryActionTypes.FETCH_REQUEST:{   
      return { ...state, loading: true }
    }
    case RepositoryActionTypes.GET_REPOSITORIES: {
      return {
        ...state,
        Repositories: action.Repositories,
      };
    }
    case RepositoryActionTypes.FETCH_SUCCESS:{   
      return { ...state, loading: false }
    }
    case RepositoryActionTypes.FETCH_ERROR:{   
      return { ...state, errors: action.errors}
    }
    default:
      return state;
  }
};