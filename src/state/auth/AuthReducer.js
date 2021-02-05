export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isAuthenticated: true
      };
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        userData: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
