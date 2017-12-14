const React = require('react')
const  ReactDOM  = require('react-dom')
const { Provider } = require('react-redux')
const { createStore } = require('redux')
const reducers = require('./modules')
const {Routes} = require('./routes.js')

ReactDOM.render((
  <Provider store={createStore(reducers)}>
<div>
  {Routes()}
  </div>
  </Provider>
), document.getElementById('app'))