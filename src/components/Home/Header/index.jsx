import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import { Context } from "../../../context/context";
import { Link } from "react-router-dom";
import "./styles.css";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function Header() {
  const { user, dispatch } = useContext(Context);
  const baseUrl = REACT_APP_API_URL + "/uploads/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header className="home-header">
      <div className="top-bar">
        <div className="top-left">
          <h3 className="logo">TUSTOZ</h3>
          <Link className="link" target="_blank" to="/facebook">
            <FontAwesomeIcon
              icon={faFacebookSquare}
              color="black"
              className="top-icon"
            />
          </Link>
          <FontAwesomeIcon
            icon={faTwitterSquare}
            color="black"
            className="top-icon"
          />
          <Link className="link" target="_blank" to="/instagram">
            <FontAwesomeIcon
              icon={faInstagramSquare}
              color="black"
              className="top-icon"
            />
          </Link>
        </div>
        <div className="top-center">
          <ul className="top-list">
            <Link className="link" to="/">
              <li className="top-list-item">HOME</li>
            </Link>
            <Link className="link" to="/about">
              <li className="top-list-item">ABOUT</li>
            </Link>
            <Link className="link" to="/contact">
              <li className="top-list-item">CONTACT</li>
            </Link>
            <Link className="link" to="/write">
              <li className="top-list-item">WRITE</li>
            </Link>
            <li className="top-list-item" onClick={handleLogout}>
              {user && "LOGOUT"}
            </li>
          </ul>
        </div>
        <div className="top-right">
          {user ? (
            <Link to="/settings">
              <img
                className="top-image"
                src={
                  user.user.profilepic
                    ? baseUrl + user.user.profilepic
                    : "https://www.booksie.com/files/profiles/22/mr-anonymous.png"
                }
                alt=""
              />
            </Link>
          ) : (
            <ul className="top-list">
              <Link className="link" to="/login">
                <li className="top-list-item">Login</li>
              </Link>
              <Link className="link" to="/register">
                <li className="top-list-item">Register</li>
              </Link>
            </ul>
          )}
        </div>
      </div>
      <p>
        awesome place to make oneself <br /> productive and entertained through
        daily updates.
      </p>
    </header>
  );
}
