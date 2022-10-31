import { describe } from "riteway";
import { reducer, addQuestion, selectScore } from "./rejection-reducer";

describe("rejection-reducer", async (assert) => {
  assert({
    given: "no arguments",
    should: "return a valid initial state",
    actual: reducer(),
    expected: [],
  });
  {
    const question = {
      askee: "boss",
      question: "May I have a raise?",
      status: "Rejected",
    };

    assert({
      given: "a question",
      should: "add question to state",
      actual: reducer(reducer(), addQuestion(question)),
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

      const state = actions.reduce(reducer, []);

      assert({
        given: "an array of questions",
        should: "calculate the correct score",
        actual: selectScore(state),
        expected: 11,
      });
    }
  }
});
