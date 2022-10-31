import { describe } from "riteway";
import { reducer, addQuestion } from "./rejection-reducer";

describe("rejection reducer", async (assert) => {
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
  }
});
