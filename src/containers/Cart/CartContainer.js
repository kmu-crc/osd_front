import React, { Component } from "react";
import Cart from "components/Cart";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
import mainSlide from "source/mainSlide.jpg";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {getCartListRequest,deleteCartAllItem,deleteCartItem} from "actions/Product";

const ImgWrapper = styled.div`
  background-image: url(${mainSlide});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 200px;
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

const Title = styled.div`
  width: 100%;
  color: white;
  position: absolute;
  text-align: center;
  top: 40%;
  left: 0;
  z-index: 2;
  transform: translateY(-50%);
  h1 {
    color: ${StyleGuide.color.geyScale.scale0};
    font-size: ${StyleGuide.font.size.heading2};
    font-weight: bold;
  }
`;

const Wrapper = styled(ContentBox)`
  margin-top: -70px;
  margin-bottom: 100px;
  position: relative;
  z-index:3;
`

class CartContainer extends Component {
    // componentDidMount() {
    //   console.log(this.props);
    //   this.props.GetProductDetailRequest(this.props.id);
    // }
    componentDidMount(){
      if(this.props.userInfo != null )this.props.getCartListRequest(this.props.userInfo.uid);
    }
    render() {
      console.log("getCartListRequest---------------",this.props);
      return(
        <div>
        <ImgWrapper>
          <Title><h1>장바구니</h1></Title>
        </ImgWrapper>
        <Wrapper>
          <Cart {...this.props} />
        </Wrapper>
        </div>
      );
    }
  }
  const mapStateToProps = (state) => {
    return {
       CartList: state.CartList.status.CartList,
       userInfo: state.Authentication.status.userInfo,
       token: state.Authentication.status.token,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getCartListRequest: (id) => dispatch(getCartListRequest(id)),
      deleteCartItem: (itemID,token)=>dispatch(deleteCartItem(itemID,token)),
      deleteCartAllItem:(user_id,token)=>dispatch(deleteCartAllItem(user_id,token)),
    }
  }
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartContainer));
