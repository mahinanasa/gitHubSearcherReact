// Import Reducer type
import { Reducer } from 'redux';

import {
  UserActionTypes, IUserState,
} from './types';

// Define the initial state
const initialUserState: IUserState = {
  loading: false,
  Users: [],
  errors: undefined,

};

export const UserReducer: Reducer<IUserState> = (
  state = initialUserState,
  action
) => {
  
  switch (action.type) {
    case UserActionTypes.FETCH_REQUEST:{   
      return { ...state, loading: true }
    }
    case UserActionTypes.GET_USERS: {
      return {
        ...state,
        Users: action.Users,
      };
    }
    case UserActionTypes.FETCH_SUCCESS:{   
      return { ...state, loading: false }
    }
    case UserActionTypes.FETCH_ERROR:{   
      return { ...state, errors: action.errors}
    }
    default:
      return state;
  }
};