import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

class LeaderBoard extends Component {
  render() {
    const { users } = this.props;

    return (
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr className="text-primary text-uppercase">
            <th scope="col">Rank</th>
            <th scope="col">User Name</th>
            <th scope="col">Logo</th>
            <th scope="col">Questions Asked</th>
            <th scope="col">Questions Answered</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>
                <img
                  src={user.avatarURL}
                  className=" img-logo"
                  alt={`Avatar of ${user.name}`}
                />
              </td>
              <td>{user.questions.length}</td>
              <td>{Object.keys(user.answers).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ users }) {
  const Score = (user) =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users).sort((a, b) => Score(b) - Score(a)),
  };
}

export default connect(mapStateToProps, null)(LeaderBoard);
