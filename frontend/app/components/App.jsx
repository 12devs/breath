import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactResizeDetector from 'react-resize-detector';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter as Router, Link } from 'react-router-dom';
import Main from './Main/Main';
import City from './City/City';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getUserSettings: () => dispatch(getUserSettings()),
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // parsers: []
    };
    // this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    // this.props.getUserSettings();
  }

  render() {

    // const width = document.getElementById('root').offsetWidth;

    return (
      <div>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Main</Link>
              </li>
              <li>
                <Link to="/city">City</Link>
              </li>
            </ul>
            <hr/>
            <Route exact path="/" component={Main}/>
            <Route path="/city/:code" component={City}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
