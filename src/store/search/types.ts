
// Define the Search type
export interface ISearchState {
  searchText: string,
  entityType: string
}

// Create Action Constants
export enum SearchActionTypes {
  SEARCHTXT = '@@search/SEARCHTXT',
  ENTITYTYPE = '@@search/ENTITYTYPE'
}
