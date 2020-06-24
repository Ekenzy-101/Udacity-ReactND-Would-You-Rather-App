import React, { Component, Fragment } from "react";
import {
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
  FormGroup,
  Input,
  Form,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { handelAddQuestion } from "../actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    optionOnetext: "",
    optionTwotext: "",
    redirect: false,
  };

  handleOptionOneChange = (e) => {
    e.preventDefault();
    this.setState({
      optionOnetext: e.target.value,
    });
  };

  handleOptionTwoChange = (e) => {
    e.preventDefault();
    this.setState({
      optionTwotext: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { authedUser, doHandleAddQuestion } = this.props;
    const { optionOnetext, optionTwotext } = this.state;
    doHandleAddQuestion(optionOnetext, optionTwotext, authedUser);
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { optionOnetext, optionTwotext, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Fragment>
              <Card body>
                <CardTitle className="text-primary">
                  CREATE NEW QUESTION
                </CardTitle>
                <Row>
                  <Col md={12}>
                    <div className="div-add-qusetion">
                      <CardText>Complete The Question</CardText>
                      <CardText>Would You Rather</CardText>
                      <FormGroup>
                        <Input
                          type="text"
                          name="optionone"
                          value={optionOnetext}
                          placeholder="First Option"
                          onChange={this.handleOptionOneChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          type="text"
                          name="optiontwo"
                          value={optionTwotext}
                          placeholder="Second Option"
                          onChange={this.handleOptionTwoChange}
                        />
                      </FormGroup>
                      <button className="btn-primary btn text-uppercase">
                        Submit
                      </button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Fragment>
          </Col>
        </Row>
      </Form>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    doHandleAddQuestion: (optionOneText, optionTwoText, authedUser) => {
      dispatch(handelAddQuestion(optionOneText, optionTwoText, authedUser));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
