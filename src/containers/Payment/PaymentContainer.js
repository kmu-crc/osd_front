import React, { Component } from "react";
import Payment from 'components/Payment/Payment';
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
import mainSlide from "source/mainSlide.jpg";

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {addOrderRequest} from "actions/Product";

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
  width:100%;
  margin-top:60px;
  margin-bottom: 100px;
  position: relative;
  z-index:3;
`

class PaymentContainer extends Component {
  render() {
    return(
        <div>
        <Wrapper>
          <Payment {...this.props}/>
        </Wrapper>
        {/* {this.state.loading && <Loading/>} */}
        </div>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    //  CartList: state.CartList.status.CartList,
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addOrderRequest: (items,token) => dispatch(addOrderRequest(items,token)),
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentContainer));
