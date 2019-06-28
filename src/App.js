import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//pages
import MainPage from "pages/Main/MainPage"
import TourPage from "pages/Tour/TourPage"
import DesignListPage from "pages/DesignList/DesignListPage"
import GroupListPage from "pages/GroupList/GroupListPage"
import CreateDesignPage from "pages/CreateDesign/CreateDesign"
import DesignDetailPage from "pages/DesignDetail/DesignDetail.js"
import DesignerListPage from "pages/DesignerList/DesignerList.js"
import DesignerDetailPage from "pages/DesignerDetail/DesignerDetail.js"
import CreateGroupPage from "pages/CreateGroup/CreateGroup.js"
import GroupDetailPage from "pages/GroupDetail/GroupDetail.js"
import MessagesPage from "pages/Messages/Messages.js"
import SignUpPage from "pages/SignUp/SignUp.js"
import NotFoundPage from "pages/NotFound/NotFound.js"

import host from "./config"

function App() {
  console.log("backend: ", host)
  console.log("process.env: ", process.env)

  return (
    <BrowserRouter>
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
        {/* mics. */}
        <Route path="/messages" component={MessagesPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
