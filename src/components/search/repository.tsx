import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../store/index';

import { IRepositoryState } from '../../store/repository/types';

// Create the containers interface
interface IProps {
  RepositoriesObj: IRepositoryState;
}


class RepositoryList extends React.Component<IProps> {
  public render() {

    const { RepositoriesObj } = this.props;
    let Repositories = RepositoriesObj.Repositories

    return (
      <div>

        <div className="name-container">
      
          {Repositories &&
            Repositories.map(repo => {
              return (
                <div className="card repo-card">
                  <div className="img_cont"></div>
                  <div className="cont-container">
                    <div className="row">
                      <div className="column">
                        <h4>  Repo Name: <b>{repo.name}</b></h4>

                        <p>Author: {repo.owner.login}</p>
                        <p>Stars: {repo.stargazers_count}</p>
                        <p>Stars: {repo.watchers_count}</p>
                        <p>Forks: {repo.forks_count}</p>
                      </div>
                      <div className="column">
                        <h4><b>More Details</b></h4>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={repo.html_url}
                        >Hit Me </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

// Grab the Repositories from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
    RepositoriesObj: store.RepositoryState
  };
};

export default connect(mapStateToProps)(RepositoryList);