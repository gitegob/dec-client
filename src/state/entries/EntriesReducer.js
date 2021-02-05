export const EntriesReducer = (state, action) => {
  switch (action.type) {
    case 'COMPUTED_ENTRY':
      return {
        ...state,
        currentEntry: action.payload,
      };
    case 'HIDE_RESULTS':
      return {
        ...state,
        resultsVisible: false,
      };
    case 'SHOW_RESULTS':
      return {
        ...state,
        resultsVisible: true,
      };
    default:
      return state;
  }
};
