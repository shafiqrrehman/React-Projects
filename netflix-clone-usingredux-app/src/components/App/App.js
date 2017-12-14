const React = require('react')
const { connect } = require('react-redux')
const { withRouter } = require('react-router-dom')

const styles = require('./App.css')

class App extends React.Component {
  render() {
    const {
      children
    } = this.props
console.log(this.props);
    return (
      <div className={styles.app}>
        {children}
      </div>
    )
  }
}

module.exports = withRouter(connect()(App))