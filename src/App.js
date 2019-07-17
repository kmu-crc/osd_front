import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// pages
import MainPage from "pages/Main"
import TourPage from "pages/Tour"
import DesignListPage from "pages/DesignList"
import GroupListPage from "pages/GroupList"
import DesignerListPage from "pages/DesignerList"
import CreateDesignPage from "pages/CreateDesign"
import DesignDetailPage from "pages/DesignDetail"
import DesignerDetailPage from "pages/DesignerDetail"
import CreateGroupPage from "pages/CreateGroup"
import GroupDetailPage from "pages/GroupDetail"
import MessagesPage from "pages/Messages"
import MyInfoModifyPage from "pages/MyInfoModifyPage"
import MyPage from "pages/MyPage"
import SignUpPage from "pages/SignUp"
import NotFoundPage from "pages/NotFound"

// template
import ClientTemplate from "templates/ClientTemplate"

// temporary
import host from "./config"

function App() {
  console.log("backend: ", host)
  console.log("process.env: ", process.env)

  return (
    <BrowserRouter>
      <ClientTemplate>
        <Switch>
          {/* index */}
          <Route exact path="/" component={MainPage} />
          <Route path="/tour" component={TourPage} />
          {/* design */}
          <Route path="/design" component={DesignListPage} />
          <Route path="/createDesign" component={CreateDesignPage} />
          <Route path="/designDetail" component={DesignDetailPage} />
          {/* designer */}
          <Route path="/designer" component={DesignerListPage} />
          <Route path="/designerDetail" component={DesignerDetailPage} />
          {/* group */}
          <Route path="/group" component={GroupListPage} />
          <Route path="/createGroup" component={CreateGroupPage} />
          <Route path="/groupDetail" component={GroupDetailPage} />
          {/* personal */}
          <Route path="/messages" component={MessagesPage} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/myinfomodify" component={MyInfoModifyPage} />
          <Route path="/signup" component={SignUpPage} />
          {/* mics. */}
          <Route component={NotFoundPage} />
        </Switch>
      </ClientTemplate>
    </BrowserRouter>
  )
}

export default App
