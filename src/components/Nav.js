import React, { Component, Fragment } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./User";

class Nav extends Component {
  state = { activeItem: "" };

  render() {
    const { authedUser } = this.props;
    const { activeItem } = this.state;
    return (
      <Fragment>
        {authedUser && (
          <Menu pointing secondary color="blue">
            <Menu.Item
              name="HOME"
              as={NavLink}
              exact
              to="/"
              active={activeItem === "HOME"}
            />
            <Menu.Item
              name="NEW QUESTION"
              as={NavLink}
              exact
              to="/add"
              active={activeItem === "NEW QUESTION"}
            />
            <Menu.Item
              name="LEADER BOARD"
              as={NavLink}
              exact
              to="/leaderboard"
              active={activeItem === "LeaderBoard"}
            />

            <Menu.Menu position="right">
              <User id={authedUser} />
              <Menu.Item
                name="LOG OUT"
                as={NavLink}
                to="/logout"
                active={activeItem === "LogOut"}
              />
            </Menu.Menu>
          </Menu>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps, null)(Nav));
