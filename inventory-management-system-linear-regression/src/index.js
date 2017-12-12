import React from 'react';
import ReactDOM from 'react-dom';
import RouteMain from './RouteMain';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(<MuiThemeProvider><RouteMain /></MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
