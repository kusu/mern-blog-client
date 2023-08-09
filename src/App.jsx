import React from "react";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Write from "./pages/Write";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/context";

const App = () => {
  const { user } = useContext(Context);
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">{user ? <Home /> : <Register />}</Route>
          <Route path="/login">{user ? <Home /> : <Login />}</Route>
          <Route path="/write">{user ? <Write /> : <Register />}</Route>
          <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
          <Route path="/blog/:id">
            <Blog />
          </Route>
          <Route
            path="/instagram"
            component={() => {
              window.location.href = "https://instagram.com/maxi.aditya";
              return null;
            }}
          />
          <Route
            path="/facebook"
            component={() => {
              window.location.href = "https://facebook.com/tustozy";
              return null;
            }}
          />
          <Route
            path="/twitter"
            component={() => {
              window.location.href = "https://twitter.com/tustozy";
              return null;
            }}
          />
          <Route
            path="/tiktok"
            component={() => {
              window.location.href = "https://tiktok.com/@tustoz";
              return null;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
