import * as React from 'react';
import { connect } from 'react-redux';

import './user.scss'
import { IAppState } from '../../store/index';

import { IUser } from '../../store/user/types';

// Create the containers interface
interface IProps {
  Users: IUser[];
}

class UserList extends React.Component<IProps> {
  public render() {
    const { Users } = this.props;

    return (
      <div className="name-container">

        {Users &&
          Users.map(user => {
            return (
              <div className="card" key={user.id}>
                <div className="img_cont"><img src={user.avatar_url} alt="Avatar"></img></div>
                <div className="cont-container">
                  <div className="row">
                    <div className="column">
                      <h4>Name: <b>{user.login}</b></h4>
                      <p>Id: {user.id}</p>
                    </div>
                    <div className="column">
                      <h4><b>More Details</b></h4>
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={user.html_url}
                      >Hit Me </a>
                    </div>
                  </div>
                </div>
              </div>

            );
          })}



      </div>
    );
  }
}

// Grab the Users from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
    Users: store.UserState.Users,
  };
};

export default connect(mapStateToProps)(UserList);