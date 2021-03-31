import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
// + main
import MainPage from "pages/MainPage"
import SignUpPage from "pages/SignUpPage"
import InsertUserDetailPage from "pages/InsertUserDetailPage"
import SignInPage from "pages/SignInPage"
import MyDetailPage from "pages/MyDetailPage"
import MyDetailModifyPage from "pages/MyDetailModifyPage"
import SearchPage from "pages/SearchPage"
import MessagePage from "pages/MessagePage"
// + design
import DesignListPage, { DesignDetailPage } from "pages/DesignPage"
import CreateDesignPage from "pages/CreateDesignPage"
import ModifyDesignPage from "pages/ModifyDesignPage"
// + group
import GroupListPage, { GroupDetailPage } from "pages/GroupPage"
import CreateGroupPage from "pages/CreateGroupPage"
import ModifyGroupPage from "pages/ModifyGroupPage"
// + designer
import DesignerListPage, { DesignerDetailPage } from "pages/DesignerPage"
import CreateDesigner from "containers/Designer/CreateDesignerContainer/CreateDesignerContainer"
// + etc.
import RequiresAuth from "containers/Commons/RequiresAuth"
import NotFoundPage from "pages/NotFoundPage"
import FooterPrivacy from "components/Commons/FooterPrivacy"
import FooterPara from "components/Commons/FooterTerm"
import Notice from "components/Header/Notice";
import CheckAuth from "containers/Commons/CheckAuth";
import VChatDesignPage from "pages/VChat2Page";
import VChatGroupPage from "pages/VChatGroupPage";
import ChatDesignPage from "pages/ChatPage";
import ChatGroupPage from "pages/ChatGroupPage";
import CodeViewPage from "pages/CodeViewPage";
import PdfViewPage from "pages/PdfViewPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Notice />
        <Switch>
          
          {/* no client template */}
          <Route path="/chat/:id" component={CheckAuth(ChatDesignPage)} />
          <Route path="/chatg/:id" component={CheckAuth(ChatGroupPage)} />
          <Route path="/vchat2/:id" component={CheckAuth(VChatDesignPage)} />
          <Route path="/vchatg/:id" component={CheckAuth(VChatGroupPage)} />
          <Route path="/codeview" component={CheckAuth(CodeViewPage)} />
          <Route path="/pdfview/:uri" component={CheckAuth(PdfViewPage)} />

          {/* GROUP A - main */}
          <Route exact path="/" component={MainPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/insertUserDetail" component={RequiresAuth(InsertUserDetailPage)} />
          <Route path="/myPage/:type?/:type2?" component={RequiresAuth(MyDetailPage)} />
          <Route path="/myPage" component={RequiresAuth(MyDetailPage)} />
          <Route path="/myModify" component={RequiresAuth(MyDetailModifyPage)} />
          <Route path="/message/:id?/:name?" component={RequiresAuth(MessagePage)} />
          <Route path="/search/:sort?/:keyword?" component={SearchPage} />
          {/* GROUP B - design */}
          <Route path="/design/:sorting?/:cate1?/:cate2?/:cate3?" component={DesignListPage} />
          <Route path="/designDetail/:id" component={DesignDetailPage} />
          <Route path="/createdesign" component={RequiresAuth(CreateDesignPage)} />
          <Route path="/designModify/:id" component={RequiresAuth(ModifyDesignPage)} />
          {/* GROUP C - group */},
          <Route path="/group/:sorting?" component={GroupListPage} />
          <Route path="/groupDetail/:id/" component={GroupDetailPage} />
          <Route path="/createGroup" component={RequiresAuth(CreateGroupPage)} />
          <Route path="/modifygroup/:id" component={RequiresAuth(ModifyGroupPage)} />
          {/* GROUP D - designer */}
          <Route path="/designerDetail/:id" component={DesignerDetailPage} />
          <Route path="/designer/:sorting?/:cate1?/:cate2?/:cate3?" component={DesignerListPage} />
          <Route path="/createdesigner" component={RequiresAuth(CreateDesigner)} />
          <Route path="/footerPrivacy" component={FooterPrivacy} />
          <Route path="/footerPara" component={FooterPara} />
          <Route component={NotFoundPage} />
          <Route path="/notfound" component={NotFoundPage} />
        </Switch>
      </BrowserRouter >
    )
  }
}

export default App;