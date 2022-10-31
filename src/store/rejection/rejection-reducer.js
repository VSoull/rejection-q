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
