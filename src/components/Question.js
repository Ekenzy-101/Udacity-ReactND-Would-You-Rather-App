import React, { Component } from "react";
import { Card, CardTitle, CardText, Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Question extends Component {
  toDetails = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/question/${id}`);
  };

  render() {
    const { users, questions } = this.props;
    const user = users[questions.author];
    return (
      <Card body>
        <CardTitle className="text-uppercase">{questions.author}</CardTitle>
        <Row>
          <Col sm={5}>
            <img
              src={user.avatarURL}
              className="img-auther-question"
              floated="right"
              size="tiny"
              alt={`Avatar of ${user.name}`}
            />
          </Col>
          <Col sm={7}>
            <div className="div-qusetion">
              <CardText>Would You Rather</CardText>
              <CardText>{questions.optionOne.text}</CardText>
              <button
                onClick={(e) => this.toDetails(e, questions.id)}
                className="btn btn-primary"
              >
                VIEW PULL
              </button>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
  return {
    users,
    authedUser,
    questions: questions[id],
  };
}

export default withRouter(connect(mapStateToProps, null)(Question));
