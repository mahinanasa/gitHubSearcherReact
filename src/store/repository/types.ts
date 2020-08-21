// Define the Repository type
export interface IRepository {
  name: string,
  owner: owner,
  stargazers_count: number,
  watchers_count: number,
  forks_count: number,
  html_url: string
}

export interface owner {
  login: string
}

// Define the Repository State
export interface IRepositoryState {
  readonly loading: boolean;
  readonly errors?: string
  readonly Repositories: IRepository[];
}

export enum RepositoryActionTypes {
  FETCH_REQUEST = "@@Repository/FETCH_REQUEST",
  FETCH_SUCCESS = "@@Repository/FETCH_SUCCESS",
  FETCH_ERROR = "@@Repository/FETCH_ERROR"
}

