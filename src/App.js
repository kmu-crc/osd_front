import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "App.css";
import DesignListPage, { DesignDetailPage } from "pages/DesignPage";
import GroupListPage, { GroupDetailPage } from "pages/GroupPage";
import DesignerListPage, { DesignerDetailPage } from "pages/DesignerPage";
import CreateDesignPage from "pages/CreateDesignPage";
import CreateGroupPage from "pages/CreateGroupPage";
import ModifyGroupPage from "pages/ModifyGroupPage";
import InserUserDetailPage from "pages/InserUserDetailPage"
import SignUpPage from "pages/SignUpPage";
import SignInPage from "pages/SignInPage";
import RequiresAuth from "containers/Commons/RequiresAuth";
import MainPage from "pages/MainPage/MainPage";
import TestPage from "pages/TestPage";
import MyDetailPage from "pages/MyDetailPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route path="/createdesign" component={RequiresAuth(CreateDesignPage)}/>
          <Route path="/designDetail/:id" component={DesignDetailPage}/>
          <Route path="/design/:sorting?/:cate1?/:cate2?" component={DesignListPage}/>
          <Route path="/createGroup" component={CreateGroupPage}/>
          <Route path="/modifyGroup" component={ModifyGroupPage}/>
          <Route path="/groupDetail/:id/:type?/:sorting?" component={GroupDetailPage}/>
          <Route path="/group" component={GroupListPage}/>
          <Route path="/designerDetail/:id/:type?" component={DesignerDetailPage}/>
          <Route path="/designer" component={DesignerListPage}/>
          <Route path="/signup" component={SignUpPage}/>
          <Route path="/signin" component={SignInPage}/>
          <Route path="/inserUserDetail" component={RequiresAuth(InserUserDetailPage)}/>
          <Route path="/myPage/:type?" component={RequiresAuth(MyDetailPage)}/> 
          <Route path="/myPage" component={RequiresAuth(MyDetailPage)}/>
          <Route path="/test" component={TestPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
