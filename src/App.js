import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

// pages
// +main
import MainPage from "pages/MainPage"
import TourPage from "pages/TourPage"
import SignUpPage from "pages/SignUpPage"
import InsertUserDetailPage from "pages/InsertUserDetailPage"
import SignInPage from "pages/SignInPage"
import MyDetailPage from "pages/MyDetailPage"
import MyDetailModifyPage from "pages/MyDetailModifyPage"
import SearchPage from "pages/SearchPage"
import MessagePage from "pages/MessagePage"

// +design
import DesignListPage, { DesignDetailPage } from "pages/DesignPage"
import CreateDesignPage from "pages/CreateDesignPage"
import ModifyDesignPage from "pages/ModifyDesignPage"

// +group
import GroupListPage, { GroupDetailPage } from "pages/GroupPage"
import CreateGroupPage from "pages/CreateGroupPage"
import ModifyGroupPage from "pages/ModifyGroupPage"

// +designer
import DesignerListPage from "containers/Designer/DesignerListContainer"
import DesignerPage from "containers/Designer/DesignerDetailContainer"

// +etc.
import RequiresAuth from "containers/Commons/RequiresAuth"
import ResetPwPage from "pages/ResetPwPage"
import NotFoundPage from "pages/NotFoundPage"
import ClientTemplate from "templates/ClientTemplate"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ClientTemplate>
          <Switch>
            {/* GROUP A - main */}
            <Route exact path="/" component={MainPage} />
            <Route path="/tour" component={TourPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/insertUserDetail" component={RequiresAuth(InsertUserDetailPage)} />
            <Route path="/myPage/:type?/:type2?" component={RequiresAuth(MyDetailPage)} />
            <Route path="/myPage" component={RequiresAuth(MyDetailPage)} />
            <Route path="/myModify" component={RequiresAuth(MyDetailModifyPage)} />
            <Route path="/message/:id?/:name?" component={RequiresAuth(MessagePage)} />
            <Route path="/search/:type?/:sort?/:keyword?" component={SearchPage} />

            {/* GROUP B - design */}
            <Route path="/design/:sorting?/:cate1?/:cate2?" component={DesignListPage} />
            <Route path="/createdesign" component={RequiresAuth(CreateDesignPage)} />
            <Route path="/designDetail/:id" component={DesignDetailPage} />
            <Route path="/designModify/:id" component={RequiresAuth(ModifyDesignPage)} />

            {/* GROUP C - group */}
            <Route path="/group/:sorting?" component={GroupListPage} />
            <Route path="/groupDetail/:id/:sorting?" component={GroupDetailPage} /> 
            <Route path="/createGroup" component={RequiresAuth(CreateGroupPage)} />
            <Route path="/modifygroup/:id" component={RequiresAuth(ModifyGroupPage)} /> 

            {/* GROUP D - designer */}
            <Route path="/designerDetail/:id/:type?" component={DesignerPage} />
            <Route path="/designer/:sorting?/:cate1?/:cate2?" component={DesignerListPage} />


            {/* GROUP E - etc. */}
            <Route path="/resetPw" component={ResetPwPage} />
            <Route component={NotFoundPage} />

          </Switch>
        </ClientTemplate>
      </BrowserRouter>
    )
  }
}

export default App
