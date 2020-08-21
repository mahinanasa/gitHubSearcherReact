
import React from "react";
import { connect } from 'react-redux';
import Loader from 'react-loaders'
import { getAllUsers, clearAllUser } from './../../store/user/action'
import { getAllRepositories, clearAllRepository } from './../../store/repository/action'
import { setSearchObj } from './../../store/search/action'
import UserList from './../../components/search/user'
import RepositoryList from './../../components/search/repository'
import { IAppState } from '../../store/index';
import { IUser } from '../../store/user/types';
import { IRepository } from '../../store/repository/types';
import { ISearchState } from '../../store/search/types';
const debounce = require('lodash.debounce');

interface IState {
  searchText: string;
  entityType: string;
}

// Create the dispatch map interface
interface PropsFromDispatch {
  getAllUsers: (item: string) => any;
  getAllRepositories: (item: string) => any;
  setSearchObj: (item: any) => any;
}

export interface IProps {
  getAllUsers: Function,
  clearAllUser: Function,
  getAllRepositories: Function,
  clearAllRepository: Function,
  setSearchObj: Function,
  Users: IUser[],
  Repositories: IRepository[];
  userLoading: boolean,
  repositoryLoading: boolean,

  searchText: string,
  entityType: string

} //See if you can figure out the type here

class SearchForm extends React.Component<IProps> {

  public state = {
    searchText: "",
    entityType: "users",
  };

  constructor(props: any) {
    super(props);
    this.debouncedInputChange = debounce(this.debouncedInputChange, 10)
  }

  private debouncedInputChange = (value: string) => {
    this.setState({
      searchText: value
    } as Pick<IState, keyof IState>);

    let entityType = this.props.entityType || this.state.entityType
    this.doDispatch(entityType)
  }

  private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.debouncedInputChange(e.target.value)
  }

  private entityTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    var selectedEntityType: string = e.currentTarget.value;
    this.setState({
      searchText: this.props.searchText,
      entityType: selectedEntityType
    } as Pick<IState, keyof IState>);
    this.doDispatch(selectedEntityType)
  }

  private doDispatch(selectedEntityType: string) {
    this.props.setSearchObj(this.state.searchText, selectedEntityType)
    switch (selectedEntityType) {
      case 'users':
        if (this.state.searchText !== '' && this.state.searchText.length >= 3) {
          this.clearAllResponses()

          this.props.getAllUsers(this.state.searchText, selectedEntityType)
        } else {

          this.props.clearAllUser()
        }
        break;
      case 'repositories':
        if (this.state.searchText !== '' && this.state.searchText.length >= 3) {
          this.clearAllResponses()
          this.props.getAllRepositories(this.state.searchText, selectedEntityType)
        } else {
          this.props.clearAllRepository()
        }
        break;
    }
  }

  private clearAllResponses() {
    this.props.clearAllRepository()
    this.props.clearAllUser()
  }

  public render() {

    //  const { searchText, entityType } = this.state;
    const { Users, Repositories, userLoading, repositoryLoading, searchText, entityType } = this.props;
    return (
      <div className="main-container">
        <form style={{
          width: (Users && Users.length > 0) || (Repositories && Repositories.length > 0) ? '100%' : 'auto'
        }}>
          <div>
            <h1>GitHub Searcher</h1>
            <p>Search users or repositories below </p>
            <input name="searchText" autoComplete="off" value={searchText} onChange={this.handleInputChange} placeholder="Start typing to search .." />
            <select value={entityType} onChange={this.entityTypeChange}>
              <option value="users">User</option>
              <option value="repositories">Repository</option>
            </select>
          </div>
        </form>
        {(userLoading || repositoryLoading) && <Loader type="line-scale" active />}<br />

        {Users && Users.length > 0
          ?
          <UserList></UserList>
          : searchText.length >= 3 && !userLoading && entityType == 'users' && <div>No Users found..!</div>
        }

        {Repositories && Repositories.length > 0
          ?
          <RepositoryList></RepositoryList>
          : searchText.length >= 3 && !repositoryLoading && entityType == 'repositories' && <div>No Repositories found..!</div>
        }

      </div>
    );
  }
}

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  getAllUsers, clearAllUser, getAllRepositories, clearAllRepository, setSearchObj
}

const mapStateToProps = (store: IAppState) => {
  return {
    Users: store.UserState.Users,
    Repositories: store.RepositoryState.Repositories,
    userLoading: store.UserState.loading,
    repositoryLoading: store.RepositoryState.loading,
    searchText: store.SearchState.searchText,
    entityType: store.SearchState.entityType
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)
