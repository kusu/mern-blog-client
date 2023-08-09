import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import "../index.css";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    const data = {
      email: userRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(REACT_APP_API_URL + "/api/auth/login", data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      res.data && window.location.replace("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              autoComplete="current-email"
              ref={userRef}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              autoComplete="current-password"
              ref={passwordRef}
            />
            <button type="submit" disabled={isFetching}>
              Sign in
            </button>

            <p className="message">
              Not registered?{" "}
              <Link className="link" to={"/register"}>
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
