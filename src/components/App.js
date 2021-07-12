import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "../assets/css/App.css";
import PermanentDrawerLeft from "./material/SideNav";
import About from "./pages/About";
import History from "./pages/History";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const RedirectToHome = () => {
      return <Redirect to="/home" />;
    };

    return (
      <div className="router">
        <PermanentDrawerLeft />

        <Switch>
          {/* <Route render={() => <Redirect to="/" />} /> */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/history" component={History} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/about" component={About} />

          <Route path="/index.html" component={RedirectToHome} />
        </Switch>

        {/* <h1>Hello, Electron!</h1>

        <p>
          I hope you enjoy using basic-electron-react-boilerplate to start your
          dev off right!
        </p>*/}
      </div>
    );
  }
}

export default App;
