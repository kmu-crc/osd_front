import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DesignListPage from "./pages/DesignPage";
import CreateDesignPage from "./pages/CreateDesignPage";
import SignUpContainer from "./containers/SignUpContainer";
import SignInContainer from "./containers/SignInContainer";
import RequiresAuth from "./containers/RequiresAuth";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={SignUpContainer}/>
          <Route path="/signin" component={SignInContainer}/>
          <Route path="/createdesign" component={CreateDesignPage}/>
          <Route path="/design" component={RequiresAuth(DesignListPage)}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
