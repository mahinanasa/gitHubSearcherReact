// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Repository Typing
import { IRepository, IRepositoryState } from './types';

// Create Action Constants

export enum RepositoryActionTypes {
  GET_REPOSITORIES = '@@repository/GET_REPOSITORIES',
  FETCH_REQUEST = '@@repository/FETCH_REQUEST',
  FETCH_SUCCESS = '@@repository/FETCH_SUCCESS',
  FETCH_ERROR = '@@repository/FETCH_ERROR'
}

// Interface for Get All Action Type
export interface IRepositoryGetAllAction {
  type: RepositoryActionTypes.GET_REPOSITORIES;
  Repositories: IRepository[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type RepositoryActions = IGetAllAction | IGetOneAction ... 
*/
export type RepositoryActions = IRepositoryGetAllAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllRepositories: ActionCreator<
  ThunkAction<Promise<any>, IRepositoryState, null, IRepositoryGetAllAction>
> =(searchTxt:string,entityType:string)  => {
  
  return async (dispatch: Dispatch) => {
    try {
      
       dispatch({type: RepositoryActionTypes.FETCH_REQUEST,loading:true});
      const response = await  axios.post('https://githubsearcherserver.herokuapp.com/api/search', {
                        entityType:entityType,
                        searchTxt: searchTxt
                      })
                      
      
      dispatch({
        Repositories: response.data.data.items || [],
        type: RepositoryActionTypes.GET_REPOSITORIES,
      });
      dispatch({type: RepositoryActionTypes.FETCH_SUCCESS,loading:false});
    } catch (err) {
      let message:string = err.message
      dispatch({type: RepositoryActionTypes.FETCH_ERROR,message});
      console.error(err);
    }
  };
};

export const clearAllRepository: ActionCreator<
  ThunkAction<Promise<any>, IRepositoryState, null, IRepositoryGetAllAction>
> = () => {
  
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        Repositories:  [],
        type: RepositoryActionTypes.GET_REPOSITORIES,
      });
    } catch (err) {
      console.error(err);
    }
  };
};