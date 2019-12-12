import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import './App.css';
import jwtDecode from "jwt-decode";

//UI components
import Menu from "./components/Menu";

//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
}

function App() {
  return (
    <div className="App">
      <Menu />
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/login" component={login} />
          <Route exact path="/signup" component={signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
