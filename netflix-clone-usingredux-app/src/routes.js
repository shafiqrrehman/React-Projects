import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
const React = require('react')
const App = require('./components/App/App')
const Movies = require('./components/Movies/Movies.js')
const Movie = require('./components/Movie/Movie.js')

export function Routes(){
    return <Router>
        <div>
            <Route path="/" component={App} />
            {/* <IndexRoute component={Movies} /> */}
            <Route path="/movies" component={Movies} />
            <Route path="/movies:id" component={Movies} />
        </div>
    </Router>
}