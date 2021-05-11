import React, { Component } from "react";
import styled from "styled-components";
import Zoom from "source/baseline_search_black_48dp.png";
import host from "config";
import { Link } from "react-router-dom";
import NoFace from "source/thumbnail.png";
import TextFormat from "modules/TextFormat";
import { SetSession } from "modules/Sessions";
import { Icon } from "semantic-ui-react";
import AlarmContainer from "containers/Commons/AlarmContainer";
import { alert } from "components/Commons/Alert/Alert";
import market_style from "market_style";
import OWD from "source/OWD.png";
const BannerWrapper = styled.div`
  width:100%;
  height:206px;
  border-radius:0px 0px 100px 0px;
  background-color:#F7F7F7;
  display:flex;
  align-items:center;
  .char{
    width:171px;
    height:152px;
    font-family:AG초특태고딕,Noto Sans KR;
    font-weight:1000;
    font-size:40px;
    line-height:50px;
    color:black;
    margin-left:20px;
  }
  .logo{
    width:100px;
    height:100px;
    background-image: url(${OWD});
    margin-left:58px;
  }
`
class Banner extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <BannerWrapper>
          <div className="char">OPEN<br/>DESIGN<br/>WORLD</div>
          <div className="logo"/>
        </BannerWrapper>
      </React.Fragment>
    )
  };
};

export default Banner;
