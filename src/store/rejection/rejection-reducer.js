import cuid from "cuid";

export const slice = "rejection";

export const addQuestion = ({
  id = cuid(),
  question = "",
  askee = "",
  status = "unansweared",
} = {}) => ({
  type: `${slice}/addQuestion`,
  payload: { id, question, askee, status },
});

export const updateQuestion = ({ id, status } = {}) => ({
  type: `${slice}/updateQuestion`,
  payload: { id, status },
});

export const reducer = (state = {}, { type, payload } = {}) => {
  switch (type) {
    case addQuestion().type:
      return { ...state, [payload.id]: payload };
    case updateQuestion().type: {
      state[payload.id] = { ...state[payload.id], status: payload.status };
    }

    default:
      return state;
  }
};

export const selectScore = (state) =>
  Object.values(state[slice]).reduce(
    (score, question) =>
      question.status === "Accepted"
        ? score + 1
        : question.status === "Rejected"
        ? score + 10
        : score,
    0
  );

export const selectQuestions = (state) => Object.values(state[slice]); // had to change the elector to take only the values from the slice
