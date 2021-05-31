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
import Banner_mobile from "source/banner_mob.png";
const BannerWrapper = styled.div`
  width:${window.outerWidth}px;
  height:220px;
  border-radius:0px 0px 100px 0px;
  background-color:#F7F7F7;
  display:flex;
  justify-content:center;
  .wrapper{
    margin-top:27px;
    margin-left:10px;
    margin-right:54px;
    width:100%;
    height:max-content;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .char{
    width:128px;
    height:max-content;
    font-family:AG초특태고딕,Noto Sans KR;
    font-weight:1000;
    font-size:40px;
    line-height:45px;
    color:black;
  }
  .logo{
    width:100px;
    height:100px;
    background-image: url(${OWD});
    background-size:cover;
  }
  .fullBanner{
    width:100%;
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
          <img src={Banner_mobile}/>
          {/* <div className="wrapper">
            <div className="char">OPEN<br/>DESIGN<br/>WORLD</div>
            <div className="logo"/>
          </div> */}
        </BannerWrapper>
      </React.Fragment>
    )
  };
};

export default Banner;
