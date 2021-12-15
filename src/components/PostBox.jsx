import React, { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import { useDispatch, useSelector } from "react-redux";

import "./PostBox.css";

const Giphy = new GiphyFetch("U6yh6UC5qxPtT2IDwBmBi9JD6hCLhMfK");
// const urlRegex = new RegExp(/(http|https):\/\/[a-z]+\.[a-z]+[\/a-z]+/gi);

export default function PostBox() {
  const dispatch = useDispatch();
  const [postText, setPostText] = useState("");
  const [postGifs, setPostGifs] = useState([]);
  const [gifQuery, setGifQuery] = useState("");
  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
  };

  const user = useSelector((state) => state.user);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postText || !postGifs.length) {
      alert("Post cannot be Empty");
      return;
    }
    // let text = postText;

    // text.match(/(http|https):\/\/[a-z]+\.[a-z]+[\/a-z]+/gi).forEach(m => {
    //   text = text.replace(replace(mch, `<a href='${m}' target='_blank'>${m}</a>`))
    // });

    dispatch({
      type: "ADD_POST",
      text: postText,
      gifs: postGifs,
      author: user.name,
      image: user.image,
      id: user.id + new Date().getTime(),
      datetime: new Date().toLocaleString()
    });
    setPostText("");
    setPostGifs([]);
    setGifQuery("");
  };

  const handleGifClick = (gif, e) => {
    e.preventDefault();
    setPostGifs((prev) => [...prev, gif.id]);
  };
  const removeGif = (id) => {
    setPostGifs((prev) => prev.filter((gifId) => gifId !== id));
  };

  return (
    <section>
      <div className="card">
        <div className="card-header d-flex gap-3">
          <div className="py-1">
            <div className="img-hold">
              <img src={user.image} width="100%" alt="profile" />
            </div>
          </div>

          <div className="post-hold">
            <form onSubmit={handlePostSubmit}>
              <textarea
                rows="4"
                className="form-control"
                placeholder={user.name + ", How ya feelin ?"}
                value={postText}
                onChange={handlePostTextChange}
              ></textarea>
              <div className="d-flex flex-wrap gap-2">
                {postGifs.map((gif, index) => (
                  <div className="gif-hold" key={index}>
                    <img
                      src={`https://media.giphy.com/media/${gif}/giphy.gif`}
                      key={index}
                      alt="gifs"
                      width="100%"
                    />
                    <div
                      className="gif-remove"
                      title="Remove Gif"
                      onClick={() => removeGif(gif)}
                    >
                      <i className="far fa-times-circle"></i>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex w-100 flex-row-reverse py-2">
                <button type="submit" className="btn btn-sm btn-primary">
                  Post
                </button>
              </div>
            </form>

            <div className="pb-2">
              <input
                style={{ fontSize: "small" }}
                type="text"
                className="form-control"
                placeholder="Search GIFs"
                value={gifQuery}
                onChange={(e) => setGifQuery(e.target.value)}
              />
            </div>

            <div className="gif-grid-hold">
              <Grid
                onGifClick={handleGifClick}
                width={300}
                columns={2}
                gutter={6}
                fetchGifs={(offset) =>
                  Giphy.search(gifQuery, offset, { limit: 10 })
                }
                key={gifQuery}
              ></Grid>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
