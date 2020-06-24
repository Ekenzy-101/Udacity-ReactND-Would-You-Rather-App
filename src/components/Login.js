import React, { Component } from "react";
import { Col, Alert, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import "../css/App.css";

class Login extends Component {
  state = {
    userID: "",
    notSelected: true,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { authentiuser } = this.props;
    const { userID } = this.state;
    if (userID) {
      authentiuser(userID);
    } else {
      this.setState(() => ({
        notSelected: true,
      }));
    }
  };

  handleChange = (e) => {
    this.setState({ userID: e.target.value, notSelected: false });
  };

  render() {
    const { userID, notSelected } = this.state;
    const { users } = this.props;
    return (
      <Form
        className="login-form border border-primary"
        onSubmit={this.handleSubmit}
      >
        {notSelected ? (
          <Alert color="danger" className="alert alert-danger">
            <p className="text-uppercase">Please select a user from the menu</p>
          </Alert>
        ) : (
          ""
        )}
        <FormGroup row>
          <Label for="exampleSelect" sm={3}>
            User Name
          </Label>
          <Col sm={9}>
            <Input
              type="select"
              name="select"
              id="userselect"
              value={userID}
              onChange={this.handleChange}
            >
              <option value="" disabled>
                Please select
              </option>
              {Object.keys(users).map((user) => (
                <option key={user} value={user}>
                  {users[user].name}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <Col xs={{ span: 5, offset: 5 }}>
          <input
            disabled={userID === ""}
            type="submit"
            className="btn btn-primary"
            value="SUBMIT"
          />
        </Col>
      </Form>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}
function mapDispatchToProps(dispatch) {
  return {
    authentiuser: (id) => {
      dispatch(setAuthedUser(id));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
