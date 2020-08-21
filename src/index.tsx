import React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import App from './views/app/App';

/* Make the store available to all container 
components in the application without passing it explicitly */
import { Provider } from 'react-redux';

// Store type from Redux
import { Store } from 'redux';

// Import the store function and state
import  configureStore, { IAppState } from './store/index';
//import { getAllUsers } from './store/user/action';

import * as serviceWorker from './serviceWorker';

interface IProps {
  store: Store<IAppState>;
}

/* 
Create a root component that receives the store via props
and wraps the App component with Provider, giving props to containers
*/
const Root: React.SFC<IProps> = props => {
  return (
    <Provider store={props.store}>
      <App />
    </Provider>
  );
};

// Generate the store
const store = configureStore();
//store.dispatch(getAllUsers());

ReactDOM.render(<Root store={store} />, document.getElementById(
  'root'
) as HTMLElement);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
