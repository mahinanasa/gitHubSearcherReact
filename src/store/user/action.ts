// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import User Typing
import { UserActionTypes, IUser, IUserState } from './types'

// Interface for Get All Action Type
export interface IUserGetAllAction {
  type: UserActionTypes.GET_USERS;
  Users: IUser[];
}
export interface IUserFETCH_REQUEST {
  type: UserActionTypes.FETCH_REQUEST;
  loading:boolean;
}

/* 
Combine the action types with a union (we assume there are more)
example: export type UserActions = IGetAllAction | IGetOneAction ... 
*/
export type UserActions = IUserGetAllAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllUsers: ActionCreator<
  ThunkAction<Promise<any>, IUserState, null, IUserGetAllAction>
> = (searchTxt:string,entityType:string) => {
  
  return async (dispatch: Dispatch) => {
    try {
      
      dispatch({type: UserActionTypes.FETCH_REQUEST,loading:true});
      const response = await  axios.post('https://githubsearcherserver.herokuapp.com/api/search', {
                        entityType:entityType,
                        searchTxt: searchTxt
                      })
      dispatch({
        Users: response.data.data.items || [],
        type: UserActionTypes.GET_USERS,
      });
      dispatch({type: UserActionTypes.FETCH_SUCCESS,loading:false});
    } catch (err) {
      let message:string = err.message
      dispatch({type: UserActionTypes.FETCH_ERROR,message});
      console.error(err);
    }
  };
};

export const clearAllUser: ActionCreator<
  ThunkAction<Promise<any>, IUserState, null, IUserGetAllAction>
> = () => {
  
  return async (dispatch: Dispatch) => {
    try {
     // const response = await axios.get(`http://localhost:5000/api/users?userName=${name}`);
      dispatch({
        Users:  [],
        type: UserActionTypes.GET_USERS,
      });
    } catch (err) {
      console.error(err);
    }
  };
};