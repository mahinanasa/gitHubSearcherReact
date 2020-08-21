
// Define the User type
export interface IUser {
  avatar_url:string,
  login:string,
  location:string,
  html_url:string,
  id:number
}

// Define the User State
export interface IUserState {
  readonly loading: boolean;
  readonly Users: IUser[];
  readonly errors?: string
}



// Create Action Constants
export enum UserActionTypes {
  GET_USERS = '@@users/GET_USERS',
  FETCH_REQUEST = '@@users/FETCH_REQUEST',
  FETCH_SUCCESS = '@@users/FETCH_SUCCESS',
  FETCH_ERROR = '@@users/FETCH_ERROR'
}
