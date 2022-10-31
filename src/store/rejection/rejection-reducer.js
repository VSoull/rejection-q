export const reducer = (state = [], { type, payload } = {}) => {
  switch (type) {
    case addQuestion().type:
      return [...state, payload];
    default:
      return state;
  }
};

const slice = "addQuestion";

export const addQuestion = ({
  question = "",
  askee = "",
  status = "unansweared",
} = {}) => ({
  type: `${slice}/addQuestion`,
  payload: { question, askee, status },
});

export const selectScore = (state) =>
  state.reduce(
    (score, question) =>
      question.status === "Accepted"
        ? score + 1
        : question.status === "Rejected"
        ? score + 10
        : score,
    0
  );
