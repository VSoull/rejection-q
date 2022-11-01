import { describe } from "riteway";
import cuid from "cuid";
import {
  reducer,
  addQuestion,
  updateQuestion,
  removeQuestion,
  selectScore,
  selectQuestions,
  slice,
} from "./rejection-reducer";

const createState = () => ({});
const withSlice = (state) => ({ [slice]: state });

describe(`${slice}/reducer`, async (assert) => {
  assert({
    given: "no arguments",
    should: "return a valid initial state",
    actual: reducer(),
    expected: createState(),
  });
  {
    const question = {
      id: cuid(),
      askee: "boss",
      question: "May I have a raise?",
      status: "Rejected",
    };
    const state = withSlice(reducer(reducer(), addQuestion(question)));

    assert({
      given: "a question",
      should: "add question to state",
      actual: selectQuestions(state),
      expected: [question],
    });
    {
      const actions = [
        addQuestion({
          askee: "boss",
          question: "May I have a raise?",
          status: "Rejected",
        }),
        addQuestion({
          askee: "boss",
          question: "May I have an extra scoop of ice-cream?",
          status: "Accepted",
        }),
        addQuestion({
          askee: "boss",
          question: "Let's make some software!",
          status: "Unanswered",
        }),
      ];

      const state = withSlice(actions.reduce(reducer, reducer()));

      assert({
        given: "an array of questions",
        should: "calculate the correct score",
        actual: selectScore(state),
        expected: 11,
      });
    }
  }
});

describe(`${slice}/updateQuestion`, async (assert) => {
  const description = {
    given: "a question id and a new status",
    should: "update the status of that question",
  };

  const questions = [
    {
      id: cuid(),
      askee: "boss",
      question: "May I have a raise?",
      status: "Rejected",
    },
    {
      id: cuid(),
      askee: "boss",
      question: "May I have an extra scoop of ice-cream?",
      status: "Accepted",
    },
    {
      id: cuid(),
      askee: "boss",
      question: "Let's make some software!",
      status: "Unanswered",
    },
  ];

  const questionId = questions[1].id;

  const question = {
    id: questionId,
    status: "Rejected",
  };

  const actions = questions.map(addQuestion); // create questions -- add to store
  const initialState = actions.reduce(reducer, reducer()); // create starte
  const state = withSlice(reducer(initialState, updateQuestion(question))); // add initial state to create the state for the slice

  const [selectedQuestion] = selectQuestions(state).filter(
    ({ id }) => id === questionId
  );
  assert({
    ...description,
    // actual: selectQuestions(state).find(({ id }) => id === questionId), //because filter was returning an array
    actual: selectedQuestion,
    expected: { ...questions[1], status: "Rejected" },
  });
});

//verify with Eric
describe(`${slice}/removeQuestion`, async (assert) => {
  const questions = [
    {
      id: cuid(),
      askee: "boss",
      question: "May I have a raise?",
      status: "Rejected",
    },
    {
      id: cuid(),
      askee: "boss",
      question: "May I have an extra scoop of ice-cream?",
      status: "Accepted",
    },
    {
      id: cuid(),
      askee: "boss",
      question: "Let's make some software!",
      status: "Unanswered",
    },
  ];

  const question = {
    id: questions[0].id,
  };

  const actions = questions.map(addQuestion); // a deeper undestanding
  const initialState = actions.reduce(reducer, reducer()); // a deeper understnading

  ///
  const state = withSlice(reducer(initialState, removeQuestion(question))); //it's correct to have this initialization for my expected state
  const expected = [questions[1], questions[2]];

  assert({
    given: "a question id ",
    should: "remove the question from state",
    actual: selectQuestions(state),
    expected, //expected: state -- explain if it is correct to initialize the expected state -- how and when to
  });
});
