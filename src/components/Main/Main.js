import React, { Component } from "react";
import hero1920 from "source/hero1920.png";
import hero1440 from "source/hero1440.png";
import hero360 from "source/hero360.png";
import context from "source/context_banner.png";
import styled from 'styled-components';
import TopDesignListContainer from "containers/Designs/TopDesignListContainer";
import MainMyDesignListContainer from "containers/Designs/MainMyDesignContainer";
import MainMyGroupListContainer from "containers/Groups/MainMyGroupContainer";

const BannerWrapper = styled.div`
  width: ${props => props.width}px;
  height: 349.5px;
  margin-top: 15px;
  margin-bottom: 25px;
  background: url(${props => props.img});
  background-repeat: no-repeat;
  background-size: 100% 349.5px;
`;
const Context = styled.div`
  width: 504px;
  height: 196px;
  top: 40px;
  position: relative;
  background: url(${context});
  background-repeat: no-repeat;
  background-size: 504px 196px;
  margin: auto;
`;

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { heroSize: 'l'/* l,m,s */, };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize, false);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  }
  handleResize = (event) => {
    if (window.innerWidth > 1440 && window.innerWidth <= 1920) {
      this.setState({ heroSize: 'l' });
    }
    if (window.innerWidth > 360 && window.innerWidth <= 1440) {
      this.setState({ heroSize: 'm' });
    };
    if (window.innerWidth > 0 && window.innerWidth <= 360) {
      this.setState({ heroSize: 's' });
    }
  }
  render() {
    const { heroSize } = this.state;
    return (
      <React.Fragment>
        <BannerWrapper width={heroSize === 'l' ? 1920 : heroSize === 'm' ? 1440 : 360} img={heroSize === 'l' ? hero1920 : heroSize === 'm' ? hero1440 : hero360}>
          <Context /> {/* <LinkWrapper><a href="/tour">이용 가이드 보러가기</a></LinkWrapper> */}
        </BannerWrapper> {/* const Textwrapper = styled.div`float: center;margin-top: 60.5px;// margin-bottom: 60px;text-align: center;font-size: 25px;font-family: Noto Sans KR;font-weight: 700;line-height: 37px;color: #FF0000;cursor: default;`;<Textwrapper>인기 디자인</Textwrapper> */}

        {this.props.userInfo
          ? <MainMyDesignListContainer /> : null}

        {this.props.userInfo
          ? <MainMyGroupListContainer /> : null}

        <TopDesignListContainer />
      </React.Fragment>
    )
  }
}
