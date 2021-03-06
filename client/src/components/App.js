import React, { Component } from "react";
import { navigate, Router } from "@reach/router";
import Login from "./pages/Login.js";
import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/NavBar.js";
import Board from "./pages/Board.js";
import Profile from "./pages/Profile.js";
import HerdPage from "./pages/HerdPage.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities.js";

import "./App.css";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id }).then((res) => {
        navigate("/Board/");
      });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <div className="app-container">
          <NavBar userId={this.state.userId} />
          <div className="page-container">
            <Router>
              {
                <Login
                  path="/"
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  userId={this.state.userId}
                />
              }

              <Board path="/Board" userId={this.state.userId}></Board>
              <Profile path="/profile/:userId" />
              <HerdPage path="/herd/:herdId" userId={this.state.userId}/>
              <NotFound default />
            </Router>
          </div>
        </div>

        {/* <Board herds= {["herd", "herdY"]}/> */}
      </>
    );
  }
}

export default App;
