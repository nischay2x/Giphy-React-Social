import React from "react";
import { useSelector } from "react-redux";

import "./Posts.css";

export default function Posts() {
  const posts = useSelector((state) => state.posts);

  return (
    <div className="my-2 py-2 posts-hold">
      {posts.map((post, index) => (
        <Post data={post} key={index}/>
      ))}
    </div>
  );
}

function Post(props) {
  const { author, image, gifs, text, datetime } = props.data;
  return (
    <div className="card">
      <div className="card-header d-flex align-items-center">
        <div className="img-hold">
          <img src={image} width="100%" alt="profile" />
        </div>
        <div className="name-hold">
          <label>{author}</label>
          <span style={{ fontSize: "10px" }}>{datetime}</span>
        </div>
      </div>
      <div className="card-body">
        <p>{text}</p>
        <div className="d-flex flex-wrap gap-2">
          {gifs &&
            gifs.map((gif, index) => (
              <div className="gif-hold" key={index}>
                <img
                  src={`https://media.giphy.com/media/${gif}/giphy.gif`}
                  key={index}
                  alt="gifs"
                  width="100%"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
