import React, { Component } from "react";
import { connect } from "react-redux";

class User extends Component {
  render() {
    const { users, id } = this.props;
    const user = users[id];

    return (
      <div className="ui right floated item info-mrg-top" position="right">
        <span className="text-uppercase" style={{ marginRight: "10px" }}>
          hello, {user.name}
        </span>
        <img
          src={user.avatarURL}
          className="avatar img-logo"
          alt={`Avatar of ${user.name}`}
        />
      </div>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  return {
    id,
    users,
  };
}

export default connect(mapStateToProps, null)(User);
