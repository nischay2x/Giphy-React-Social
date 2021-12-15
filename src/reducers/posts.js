import db from "../database.json";

const allPosts = db.posts;

export default function posts(state = allPosts, action) {
  switch (action.type) {
    case "ADD_POST":
      return [
        ...state,
        {
          text: action.text,
          gifs: action.gifs,
          author: action.author,
          id: action.id,
          datetime: action.datetime,
          image: action.image
        }
      ];
    case "REMOVE_POST":
      return state.filter((post) => post.id !== action.id);
    default:
      return state;
  }
}
