import React, { Component, Fragment } from "react";
import {
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Progress,
  Form,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleSaveQuestionAnswer } from "../actions/index";
import { connect } from "react-redux";

class QuestionDetails extends Component {
  state = {
    selectedAnswer: "",
  };

  handelchoice = (e) => {
    this.setState({ selectedAnswer: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { authedUser, doHandleSaveAnswer } = this.props;
    const { id } = this.props.match.params;
    const { selectedAnswer } = this.state;
    doHandleSaveAnswer(authedUser, id, selectedAnswer);
  };

  render() {
    const {
      users,
      question,
      isAnswered,
      voteCountOptionOne,
      voteCountOptionTwo,
      totalVotes,
      votePercentOptionOne,
      votePercentOptionTwo,
      optionselect,
    } = this.props;
    const user = users[question.author];

    return isAnswered ? (
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Fragment>
            <Card body>
              <CardTitle> Asked By {question.author}</CardTitle>
              <Row>
                <Col sm={5}>
                  <img
                    src={user.avatarURL}
                    className="img-auther-answer"
                    floated="right"
                    size="tiny"
                    alt={`Avatar of ${user.name}`}
                  />
                </Col>
                <Col sm={7}>
                  <div className="div-result">
                    <CardText>Results</CardText>
                    <CardText>
                      {optionselect === "optionOne" ? (
                        <Col sm={12}>
                          <div className="userchoice">
                            <Label className="your-vote">Your Vote</Label>
                            <p>{question.optionOne.text}</p>
                            <div className="text-center">
                              {votePercentOptionOne}
                            </div>
                            <Progress value={votePercentOptionOne} />
                            {voteCountOptionOne} Out Of {totalVotes} Votes
                          </div>

                          <div className="otherchoice">
                            <p>{question.optionTwo.text}</p>
                            <div className="text-center">
                              {votePercentOptionTwo}
                            </div>
                            <Progress value={votePercentOptionTwo} />
                            {voteCountOptionTwo} Out Of {totalVotes} Votes
                          </div>
                        </Col>
                      ) : (
                        <Col sm={12} className="nopd">
                          <div className="userchoice">
                            <Label className="your-vote">Your Vote</Label>
                            <p>{question.optionTwo.text}</p>
                            <div className="text-center">
                              {votePercentOptionTwo}
                            </div>
                            <Progress value={votePercentOptionTwo} />
                            {voteCountOptionTwo} Out of {totalVotes} Votes
                          </div>

                          <div className="otherchoice">
                            <p>{question.optionOne.text}</p>
                            <div className="text-center">
                              {votePercentOptionOne}
                            </div>
                            <Progress value={votePercentOptionOne} />
                            {voteCountOptionOne} Out of {totalVotes} Votes
                          </div>
                        </Col>
                      )}
                    </CardText>
                  </div>
                </Col>
              </Row>
            </Card>
          </Fragment>
        </Col>
      </Row>
    ) : (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Fragment>
              <Card body>
                <CardTitle>{question.author}</CardTitle>
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
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            value="optionOne"
                            name="radio1"
                            onChange={this.handelchoice}
                          />
                          {question.optionOne.text}
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            value="optionTwo"
                            name="radio1"
                            onChange={this.handelchoice}
                          />
                          {question.optionTwo.text}
                        </Label>
                      </FormGroup>
                      <button className="btn btn-primary">SUBMIT</button>
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

function mapStateToProps({ questions, users, authedUser }, props) {
  const user = users[authedUser];
  const answers = users[authedUser].answers;
  const { id } = props.match.params;
  const answeredQuestions = Object.keys(user.answers);
  const isAnswered = answeredQuestions.includes(id);
  const question = questions[id];
  const optionselect = answers[question.id];

  const votedForOptionOne = question.optionOne.votes.includes(authedUser);
  const votedForOptionTwo = question.optionTwo.votes.includes(authedUser);
  const voteCountOptionOne = question.optionOne.votes.length;
  const voteCountOptionTwo = question.optionTwo.votes.length;
  const totalVotes = voteCountOptionOne + voteCountOptionTwo;
  const votePercentOptionOne =
    Math.round((voteCountOptionOne / totalVotes) * 10000) / 100;
  const votePercentOptionTwo =
    Math.round((voteCountOptionTwo / totalVotes) * 10000) / 100;

  return {
    users,
    authedUser,
    question,
    isAnswered,
    votedForOptionOne,
    votedForOptionTwo,
    voteCountOptionOne,
    voteCountOptionTwo,
    totalVotes,
    votePercentOptionOne,
    votePercentOptionTwo,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    doHandleSaveAnswer: (authedUser, qid, answer) => {
      dispatch(handleSaveQuestionAnswer(authedUser, qid, answer));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
