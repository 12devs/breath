import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactResizeDetector from 'react-resize-detector';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter as Router, Link } from 'react-router-dom';
import Main from './Main/Main';
import City from './City/City';
import Cheker from './Cheker';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getUserSettings: () => dispatch(getUserSettings()),
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Cheker}/>
          <Route path="/main" component={Main}/>
          <Route path="/city/:code" component={City}/>
          <Route children={() => <h2>Not found</h2>}/>
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
