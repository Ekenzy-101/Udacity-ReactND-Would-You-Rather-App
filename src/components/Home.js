import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { Row, Col } from "reactstrap";
import Question from "./Question";

class Home extends Component {
  render() {
    const {
      unansweredQuestions,
      answeredQuestions,
      answeredCount,
      unansweredCount,
    } = this.props;

    return (
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Fragment>
            <Tabs
              className="border border-primary"
              headerClass="text-uppercase"
              activeHeaderClass="text-primary"
              contentClass="tab-content-yellow"
            >
              <Tab
                label={
                  <span>
                    Unanswered Questions
                    <span className=" icon-remove"> {unansweredCount}</span>
                  </span>
                }
              >
                <Row>
                  {unansweredQuestions.map((questionID) => (
                    <Col sm={12} key={questionID}>
                      <Question id={questionID} />
                    </Col>
                  ))}
                </Row>
              </Tab>
              <Tab
                label={
                  <span>
                    Answered Questions
                    <span className=" icon-remove"> {answeredCount}</span>
                  </span>
                }
              >
                <Row>
                  {answeredQuestions.map((questionID) => (
                    <Col sm={12} key={questionID}>
                      <Question id={questionID} />
                    </Col>
                  ))}
                </Row>
              </Tab>
            </Tabs>
          </Fragment>
        </Col>
      </Row>
    );
  }
}
function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];

  const answeredQuestions = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  const unansweredQuestions = Object.keys(questions)
    .filter((questionID) => !answeredQuestions.includes(questionID))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  const answeredCount = answeredQuestions.length;
  const unansweredCount = unansweredQuestions.length;

  return {
    unansweredQuestions,
    answeredQuestions,
    answeredCount,
    unansweredCount,
  };
}

export default connect(mapStateToProps)(Home);
