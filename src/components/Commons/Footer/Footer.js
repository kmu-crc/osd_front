import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import TextFormat from "modules/TextFormat"

// css styling

const Foot = styled.footer`
  background-color: #191919;
  position: fixed;
  z-index: 100;
  bottom: 0px;
  width: 100%;
  color: #fff;
  & .ui.grid>.row {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  & .copyright {
  }
  & .list > a {
    float: left;
    margin-right: 3rem;
    font-size: 11px;
    cursor: pointer;
  }
`;


class Footer extends Component {
  goNewWorld = () => {
    alert("새로운 오픈소스디자인 베타사이트로 이동합니다!");
    window.location.href = `https://opensrcdesign.com`;
  }
  render() {
    return (
      <Foot>
        <Grid padded={true} columns={2}>
          <Grid.Row>
            <Grid.Column className="copyright">
              <div onClick={this.goNewWorld}>
                <TextFormat txt="Copyright @ 2019 Open Design Inc." />
              </div>
            </Grid.Column>
            <Grid.Column as="ul" className="list">
              <Link to="/Info/info">사이트 소개</Link>
              <Link to="/Term/term">이용약관</Link>
              <Link to="/Privacy/privacy">개인정보보호정책</Link>
              {/* <Link>Contact Us</Link> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Foot>
    );
  }
}

export default Footer;
