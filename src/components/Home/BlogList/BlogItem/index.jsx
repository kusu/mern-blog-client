import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

const BlogItem = ({
  blog: {
    description,
    title,
    createdAt,
    username,
    profilepic,
    photo,
    categories,
    _id,
  },
}) => {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  console.log("REACT_APP_API_URL:", REACT_APP_API_URL); // Debug log

  const baseUrl = REACT_APP_API_URL + "/uploads/";

  const history = useHistory();

  const handleClick = () => {
    console.log("Navigating to:", `/blog/${_id}`); // Debug log
    history.push(`/blog/${_id}`);
  };

  console.log("profilepic:", profilepic); // Debug log

  return (
    <div className="blogItem-wrap" onClick={handleClick}>
      <div className="blogItem-link">
        <img className="blogItem-cover" src={baseUrl + photo} alt="" />
        <ul className="tags" id="list">
          {categories.map((c) => (
            <p className="chip">{c}</p>
          ))}
        </ul>
        <h3>{title}</h3>
        <p className="blogItem-desc">{description}</p>
        <footer>
          <div className="blogItem-author">
            <img
              src={
                profilepic
                  ? baseUrl + profilepic
                  : "https://www.booksie.com/files/profiles/22/mr-anonymous.png"
              }
              alt=""
            />
            <div>
              <h6>{username}</h6>
              <p>{new Date(createdAt).toDateString()}</p>
            </div>
          </div>
          <div className="blogItem-link">➝</div>
        </footer>
      </div>
    </div>
  );
};

export default BlogItem;
