import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./settings.css";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

export default function Settings() {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = REACT_APP_API_URL + "/uploads/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "UPDATE_START" });

    const updatedUser = {
      userId: user.user._id,
      username: user.user.username,
      email: user.user.email,
      password: user.user.password,
    };

    try {
      const data = new FormData();
      const fileExtension = file.name.split(".").pop();
      const filename = Date.now() + "." + fileExtension;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;

      console.log(updatedUser);

      await axios.post(REACT_APP_API_URL + "/api/upload", data);
      console.log("Image upload success!");

      window.location.replace(REACT_APP_CLIENT_URL + "/settings/" + user.user._id);
    } catch (err) {
      console.error("Error uploading image:", err);
      dispatch({ type: "UPDATE_FAILURE" });
    }

    try {
      const res = await axios.put(
        REACT_APP_API_URL + "/api/users/" + user.user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      console.error("Error updating user:", err.response.data);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  console.log(user.user);
  console.log(PF + user.user.profilePic);

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <FontAwesomeIcon icon={faPlus} className="writeIcon" />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" value={user.user.username} readOnly={true} />
          <label>Email</label>
          <input type="email" value={user.user.email} readOnly={true} />
          <br></br>
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
