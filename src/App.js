// REACT //
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// REDUX //
import { GetCategoryAllRequest } from "actions/Categorys";
// MARKET //
import ProductListPage, { ProductDetailPage } from "pages/ProductPage";
import DesignerListPage, { DesignerDetailPage } from "pages/DesignerPage";
import MakerListPage, { MakerDetailPage } from "pages/MakerPage";
import CreateProductPage from "pages/CreateProductPage";
import ModifyProductPage from "pages/ModifyProductPage";
import CreateGalleryPage from "pages/CreateGroupPage";
import SignUpPage from "pages/SignUpPage";
import SignInPage from "pages/SignInPage";
import RequiresAuth from "containers/Commons/RequiresAuth";
import MainPage from "pages/MainPage/MainPage";
import FooterPage from "pages/FooterPage";
import MyDetailPage from "pages/MyDetailPage";
import MyDetailModifyPage from "pages/MyDetailModifyPage";
import ResetPwPage from "pages/ResetPwPage";
import SearchPage from "pages/SearchPage";
import MessagePage from "pages/MessagePage";
import PaymentPage from "pages/PaymentPage";
import CartPage from 'pages/CartPage';
import CreateDesignerPage from 'pages/CreateDesignerPage';
import ModifyDesignerPage from 'pages/ModifyDesignerPage';
import CreateMakerPage from 'pages/CreateMakerPage';
import ModifyMakerPage from 'pages/ModifyMakerPage';
import RequestListPage, { CreateRequestPage, RequestDetailPage } from "pages/RequestPage";
import requestDesignerPage from "pages/RequestToDesignerPage";
// import requestMakerPage from "pages/RequestToMakerPage";
// TEMPLATE //
import ClientTemplate from 'templates/ClientTemplate';

class App extends Component {
  componentDidMount() {
    this.props.GetCategoryAllRequest();
  }
  render() {
    return (
      <BrowserRouter>
        <ClientTemplate>
          <Switch>
            {/* MAIN */}
            <Route exact path="/" component={MainPage} />
            {/* DESIGNER */}
            <Route path="/designer/:sorting?/:cate1?/:cate2?" component={DesignerListPage} />
            <Route path="/designerDetail/:id/:type?" component={DesignerDetailPage} />
            <Route path="/designerModify" component={ModifyDesignerPage} />
            <Route path="/createDesigner" component={RequiresAuth(CreateDesignerPage)} />
            <Route path="/requestToDesigner/:id" component={RequiresAuth(requestDesignerPage)} />
            {/* MAKER */}
            <Route path="/maker/:sorting?" component={MakerListPage} />
            <Route path="/makerDetail/:id/:type?" component={MakerDetailPage} />
            <Route path="/createMaker" component={RequiresAuth(CreateMakerPage)} />
            <Route path="/makerModify" component={ModifyMakerPage} />
            {/* ITEM */}
            <Route path="/createProduct" component={RequiresAuth(CreateProductPage)} />
            <Route path="/productModify/:id" component={RequiresAuth(ModifyProductPage)} />
            <Route path="/productDetail/:id" component={ProductDetailPage} />
            <Route path="/product/:sorting?/:cate1?/:cate2?" component={ProductListPage} />
            {/* REQUEST */}
            <Route path="/createRequest" component={RequiresAuth(CreateRequestPage)} />
            <Route path="/request/:sorting?/:cate1?/:cate2?" component={RequestListPage} />
            <Route path="/requestDetail/:id" component={RequestDetailPage} />
            {/* GALLERY */}
            <Route path="/createGallery" component={RequiresAuth(CreateGalleryPage)} />
            {/* ETC */}
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/myPage/:type?/:type2?" component={RequiresAuth(MyDetailPage)} />
            {/* <Route path="/myPage" component={MyDetailPage} /> */}
            <Route path="/myModify" component={RequiresAuth(MyDetailModifyPage)} />
            <Route path="/Term/:page" component={FooterPage} />
            <Route path="/Privacy/:page" component={FooterPage} />
            <Route path="/Info/:page" component={FooterPage} />
            <Route path="/search/:type?/:sort?/:keyword?" component={SearchPage} />
            <Route path="/message/:id?/:name?" component={RequiresAuth(MessagePage)} />
            <Route path="/resetPw" component={ResetPwPage} />
            {/* <Route path="/payment/:id/:amount/:option" component={PaymentPage} /> */}
            <Route path="/payment/:id/:title/:amount/:option/:thumbnail" component={PaymentPage} />
            <Route path="/cart" component={CartPage} />
            <Route component={() => <div style={{ width: "100%", fontSize: "36px" }}>페이지를 찾을 수 없습니다.</div>} />
          </Switch>
        </ClientTemplate>
      </BrowserRouter>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  GetCategoryAllRequest: () => dispatch(GetCategoryAllRequest())
});

export default connect(null, mapDispatchToProps)(App);
