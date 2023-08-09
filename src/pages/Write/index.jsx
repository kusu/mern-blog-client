import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./write.css";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

export default function Write() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]); // State to hold tags
  const { user } = useContext(Context);

  console.log(user.user.profilepic);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || categories.length === 0) {
      console.error("Title, description, and categories are required");
      return;
    }

    const newPost = {
      username: user.user.username,
      title,
      description,
      categories,
      profilepic: user.user.profilepic,
    };

    const data = new FormData();
    const fileExtension = file.name.split(".").pop();
    const filename = Date.now() + "." + fileExtension;

    data.append("name", filename);
    data.append("file", file);
    newPost.photo = filename;
    newPost.profilepic = user.user.profilepic;

    try {
      await axios.post(REACT_APP_API_URL + "/api/upload", data);
      console.log("Image upload success!");

      const res = await axios.post(REACT_APP_API_URL + "/api/blog", newPost);
      console.log("Blog post created:", res.data);

      window.location.replace(REACT_APP_CLIENT_URL + "/blog/" + res.data._id);
    } catch (err) {
      console.error("Error creating post:", err.response.data.message);
      // Handle error gracefully, display a message to the user
    }
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <FontAwesomeIcon icon={faPlus} className="writeIcon" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Categories (comma-separated)"
            className="categories"
            value={categories.join(", ")} // Display categories as a comma-separated string
            onChange={(e) => setCategories(e.target.value.split(",").map(categories => categories.trim()))} // Update categories array based on input
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
