import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../index.css";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function Register() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setSelectedImage(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (!file) {
      setError(true);
      return;
    }

    const data = new FormData();
    const fileExtension = file.name.split(".").pop();
    const filename = Date.now() + "." + fileExtension;
    data.append("name", filename);
    data.append("file", file);

    const newUser = {
      username,
      email,
      password,
      profilepic: filename,
    };

    try {
      await axios.post(REACT_APP_API_URL + "/api/upload", data);
      const res = await axios.post(
        REACT_APP_API_URL + "/api/auth/register",
        newUser
      );
      if (res.data) {
        window.location.replace("/login");
      }
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="settingsPP">
            <div className="centered-horizontal">
              <label htmlFor="fileInput" id="img-input">
                {/* This label covers the image for uploading */}
                <img
                  src={
                    selectedImage ||
                    "https://www.booksie.com/files/profiles/22/mr-anonymous.png"
                  }
                  alt=""
                />
                <FontAwesomeIcon icon={faPlus} className="" />
              </label>
            </div>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <br></br>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button type="submit">Sign up</button>
          <br></br>
          {error && (
            <span style={{ color: "red", marginTop: "10px" }}>
              Something went wrong! Please select a profile picture.
            </span>
          )}
          <p className="message">
            Already registered?{" "}
            <Link className="link" to="/login">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
