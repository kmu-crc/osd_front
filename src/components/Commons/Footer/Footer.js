import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TextFormat from "modules/TextFormat"
import market_style from "market_style";
// import { Grid } from "semantic-ui-react";

// css styling

const Foot = styled.footer`
  background-color: #191919;
  position: fixed;
  z-index: 900;
  bottom: 0px;
  width: 100%;
  color: #fff;
  & .ui.grid>.row {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    display:flex;
    justify-content:space-between;
  }
  & .copyright {
  }
  & .list > a {
    float: left;
    margin-right: 3rem;
    font-size: ${market_style.font.size.tiny3};
    cursor: pointer;
  }

  // new 
  .row{
    padding:5px;
    display:flex;
    justify-content:space-between;
  }
  .ul > .Link{
    margin-right:10px;
  }
`;


class Footer extends Component {
  goNewWorld = () => {
    // alert("새로운 오픈디자인 베타사이트로 이동합니다!");
    // window.location.href = `https://opensrcdesign.com`;
  }
  render() {
    return (
      <Foot>
        <div className="row">
           <div onClick={this.goNewWorld}>
                <TextFormat txt="Copyright @ 2020 Open Design Inc." />
              </div>
          <div>
            <ul className="list">
              <Link to="/">사이트 소개</Link>
              <Link to="/footerPara">이용약관</Link>
              <Link to="/footerPrivacy">개인정보보호정책</Link>
            </ul>
          </div>
        </div>
      </Foot>
    );
  }
}

export default Footer;