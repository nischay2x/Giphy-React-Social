export default function user(state = {}, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        id: action.id,
        name: action.name,
        image: action.image,
        loggedIn: true
      };
    case "LOGOUT":
      return { ...state, loggedIn: false };
    default:
      return state;
  }
}
