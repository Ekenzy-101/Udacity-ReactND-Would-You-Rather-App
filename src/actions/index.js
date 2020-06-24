import { getInitialData, saveQuestionAnswer } from "../utils/api";
import { _saveQuestion } from "../utils/_DATA";
import { saveAnswer, receiveQuestions, addQuestion } from "./questions";
import { saveUserAnswer, addUserQuestion, receiveUsers } from "./users";
import { showLoading, hideLoading } from "react-redux-loading";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(showLoading());
    let obj = {
      authedUser,
      qid,
      answer,
    };
    return saveQuestionAnswer(obj).then(() => {
      dispatch(saveAnswer(authedUser, qid, answer));
      dispatch(saveUserAnswer(authedUser, qid, answer));
      dispatch(hideLoading());
    });
  };
}

export function handelAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    let questionObj = {
      optionOneText,
      optionTwoText,
      author,
    };
    return _saveQuestion(questionObj).then((question) => {
      dispatch(addQuestion(question));
      dispatch(addUserQuestion(author, question.id));
    });
  };
}
