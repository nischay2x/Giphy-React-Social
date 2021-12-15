import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";

import PostBox from "./components/PostBox.jsx";
import Posts from "./components/Posts.jsx";
import db from "./database.json";
const user = db.user;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "LOGIN",
      id: user.id,
      name: user.name,
      image: user.image
    });
  }, [dispatch]);

  return (
    <main>
      <PostBox />
      <Posts />
    </main>
  );
}

export default App;
