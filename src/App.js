import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import AdminSignInPage from "pages/AdminSignInPage"
import AdminPage from "Admin/AdminPage/AdminPage"
import RequiresAuthAdmin from "containers/Commons/RequiresAuthAdmin"
import GroupManagerPage from "Admin/AdminPage/GroupManagerPage"
import DesignManagerPage from "Admin/AdminPage/DesignManagerPage"
import DesignerManagerPage from "Admin/AdminPage/DesignerManagerPage"
import MakerManagerPage from "Admin/AdminPage/MakerManagerPage"
import NoticeManagerPage from "Admin/AdminPage/NoticeManagerPage"
import HotDesignManagerPage from "Admin/AdminPage/HotDesignManagerPage";
import HotGroupManagerPage from "Admin/AdminPage/HotGroupManagerPage";
import HotExpertManagerPage from "Admin/AdminPage/HotExpertManagerPage";
import AccountManagerPage from "Admin/AdminPage/AccountManagerPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* completed */}
          <Route path="/hotDesignManager" component={RequiresAuthAdmin(HotDesignManagerPage)} />
          <Route path="/hotExpertManager" component={RequiresAuthAdmin(HotExpertManagerPage)} />
          <Route path="/designerManager" component={RequiresAuthAdmin(DesignerManagerPage)} />
          <Route path="/MakerManager" component={RequiresAuthAdmin(MakerManagerPage)} />
          {/* on-going */}
          <Route path="/AccountManager" component={RequiresAuthAdmin(AccountManagerPage)} />

          {/* deprecated */}
          <Route path="/noticeManager" component={RequiresAuthAdmin(NoticeManagerPage)} />
          <Route path="/groupManager" component={RequiresAuthAdmin(GroupManagerPage)} />
          <Route path="/hotgroupManager" component={RequiresAuthAdmin(HotGroupManagerPage)} />
          <Route path="/designManager" component={RequiresAuthAdmin(DesignManagerPage)} />
          <Route path="/adminSignIn" component={AdminSignInPage} />
          <Route exact path="/" component={AdminPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
