// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

// Import User Typing
import { SearchActionTypes,  ISearchState } from './types'

// Interface for Get All Action Type
export interface ISearchAction {
  type: SearchActionTypes.ENTITYTYPE;
  Search: ISearchState;
}


/* 
Combine the action types with a union (we assume there are more)
example: export type UserActions = IGetAllAction | IGetOneAction ... 
*/
export type SearchActions = ISearchAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const setSearchObj: ActionCreator<
  ThunkAction<Promise<any>, ISearchState, null, ISearchAction>
> = (searchText:string,entityType:string) => {
  
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: SearchActionTypes.SEARCHTXT,searchText:searchText});
      dispatch({type: SearchActionTypes.ENTITYTYPE,entityType:entityType});
    } catch (err) {
      console.error(err);
    }
  };
};

export const setEntityType: ActionCreator<
  ThunkAction<Promise<any>, ISearchState, null, ISearchAction>
> = (searchTxt:string,entityType:string) => {
  
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: SearchActionTypes.ENTITYTYPE,entityType:entityType});
    } catch (err) {
      console.error(err);
    }
  };
};