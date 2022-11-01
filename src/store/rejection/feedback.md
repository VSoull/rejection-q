## Feedback

- Use a createState factory function to compare expected values for states
- Always use selectors to test the state outputs.
- Black-box testing for reducers: Action creators and selectors are the public API of your reducer. Your unit tests should never assume knowledge of what the actual state shape looks like.
- Unit tests should not assume they know what the initial state looks like. When you need it, always get it by calling the reducer with no arugments.
