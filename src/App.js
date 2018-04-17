import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DesignListPage, { DesignDetailPage } from "./pages/DesignPage";
import GroupListPage, { GroupDetailPage } from "./pages/GroupPage";
import DesignerListPage, { DesignerDetailPage } from "./pages/DesignerPage";
import CreateDesignPage from "./pages/CreateDesignPage";
import CreateGroupPage from "./pages/CreateGroupPage";
import ModifyGroupPage from "./pages/ModifyGroupPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/createdesign" component={CreateDesignPage}/>
          <Route path="/designDetail/:id" component={DesignDetailPage}/>
          <Route path="/design" component={DesignListPage}/>
          <Route path="/createGroup" component={CreateGroupPage}/>
          <Route path="/modifyGroup" component={ModifyGroupPage}/>
          <Route path="/groupDetail/:id" component={GroupDetailPage}/>
          <Route path="/group" component={GroupListPage}/>
          <Route path="designerDetail/:id" component={DesignerDetailPage}/>
          <Route path="/designer" component={DesignerListPage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
