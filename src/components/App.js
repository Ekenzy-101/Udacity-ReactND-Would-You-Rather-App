import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import LogOut from "./LogOut";
import LeaderBoard from "./LeaderBoard";
import QuestionDetails from "./QuestionDetails";
import { handleInitialData } from "../actions";
import "../css/App.css";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            {this.props.notloginuser === true ? (
              <Route path="/" exact component={Login} />
            ) : (
              <div>
                <Nav />
                <Route path="/" exact component={Home} />
                <Route path="/logout" exact component={LogOut} />
                <Route path="/question/:id" component={QuestionDetails} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Redirect to="/" />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    notloginuser: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
