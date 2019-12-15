import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import './App.css';
import jwtDecode from "jwt-decode";

//UI components
import Menu from "./components/layout/Menu";
import AuthRoute from "./util/AuthRoute";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

import axios from "axios";

axios.defaults.baseURL =
  "https://europe-west1-social-app-bulb.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <Menu />
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <AuthRoute exact path="/login" component={login} />
          <AuthRoute exact path="/signup" component={signup} />
          <Route exact path="/users/:handle" component={user} />
          <Route exact path="/users/:handle/post/:postId" component={user} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
