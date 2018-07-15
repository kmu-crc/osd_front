import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DesignListPage, { DesignDetailPage } from "pages/DesignPage";
import GroupListPage, { GroupDetailPage } from "pages/GroupPage";
import DesignerListPage, { DesignerDetailPage } from "pages/DesignerPage";
import CreateDesignPage from "pages/CreateDesignPage";
import ModifyDesignPage from "pages/ModifyDesignPage";
import CreateGroupPage from "pages/CreateGroupPage";
// import ModifyGroupPage from "pages/ModifyGroupPage";
import InserUserDetailPage from "pages/InserUserDetailPage"
import SignUpPage from "pages/SignUpPage";
import SignInPage from "pages/SignInPage";
import RequiresAuth from "containers/Commons/RequiresAuth";
import MainPage from "pages/MainPage/MainPage";
import TestPage from "pages/TestPage";
import TestPage2 from "pages/TestPage2";
import FooterPage from "pages/FooterPage";
import MyDetailPage from "pages/MyDetailPage";
import MyDetailModifyPage from "pages/MyDetailModifyPage";
import { connect } from "react-redux";
import { GetCategoryLevel1Request, GetCategoryLevel2Request } from "actions/Categorys";
import SearchPage from "pages/SearchPage";
import MessagePage from "pages/MessagePage";

class App extends Component {
  componentDidMount(){
    this.props.GetCategoryLevel1Request().then(() => {
      this.props.GetCategoryLevel2Request(null);
    })
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route path="/createdesign" component={RequiresAuth(CreateDesignPage)}/>
          <Route path="/designDetail/:id" component={DesignDetailPage}/>
          <Route path="/design/:sorting?/:cate1?/:cate2?" component={DesignListPage}/>
          <Route path="/createGroup" component={RequiresAuth(CreateGroupPage)}/>
          <Route path="/designModify/:id" component={RequiresAuth(ModifyDesignPage)}/>
          {/* <Route path="/groupDetail/:id/modify" component={ModifyGroupPage}/> */}
          <Route path="/groupDetail/:id/:type?/:sorting?" component={GroupDetailPage}/>
          <Route path="/group/:sorting?" component={GroupListPage}/>
          <Route path="/designerDetail/:id/:type?" component={DesignerDetailPage}/>
          <Route path="/designer/:sorting?/:cate1?/:cate2?" component={DesignerListPage}/>
          <Route path="/signup" component={SignUpPage}/>
          <Route path="/signin" component={SignInPage}/>
          <Route path="/inserUserDetail" component={RequiresAuth(InserUserDetailPage)}/>
          <Route path="/myPage/:type?" component={RequiresAuth(MyDetailPage)}/>
          <Route path="/myPage" component={RequiresAuth(MyDetailPage)}/>
          <Route path="/myModify" component={RequiresAuth(MyDetailModifyPage)}/>
          <Route path="/test" component={TestPage} />
          <Route path="/test2" component={TestPage2} />
          <Route path="/footer/:page" component={FooterPage}/>
          <Route path="/search/:type?/:sort?/:keyword?" component={SearchPage}/>
          <Route path="/message" component={RequiresAuth(MessagePage)}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetCategoryLevel1Request: () => {
      return dispatch(GetCategoryLevel1Request());
    },
    GetCategoryLevel2Request: (id) => {
      return dispatch(GetCategoryLevel2Request(id));
    }
  };
};

export default connect(null, mapDispatchToProps)(App);
