import React, { Component } from 'react';
import styled from 'styled-components';
import logo from '../../logo.png';

// css styling
const HeadWrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: #191919;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
`;

const Logo = styled.div`
  width: 80px;
  height: 60px;
  position: absolute;
  & img {
    height: 90%;
    width: auto;
  }
`;

const NavContainer = styled.div`
  width: 100%;
`

const NavUl = styled.ul`
  list-style: none;
  min-width: 300px;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
`;

const NavLi = styled.li`
  color: #fff;
  font-size: 14px;
`;

const InfoContainer = styled.div`
  min-width: 240px;
  width: 20%;
  position: absolute;
  right: 0;
`

const Profile = styled.div`
  float: right;
  margin-right: 20px;
  color: #a4a4a4;
  cursor: pointer;
  min-width: 120px;
  & span {
    font-size: 14px;
  }
  & span.fa {
    font-size: 18px;
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};

  }
  render() {
    return(
      <HeadWrapper>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
        <NavContainer>
          <NavUl>
            <NavLi><a href="design/designList">디자인</a></NavLi>
            <NavLi><a href="group/groupList">그룹</a></NavLi>
            <NavLi><a href="designer/designerList">디자이너</a></NavLi>
            <button className="red"><a href="createDesign">디자인 등록</a></button>
          </NavUl>
        </NavContainer>
        <InfoContainer>
          
          <Profile>
            
            <span>kwonjonghun</span>
          </Profile>
        </InfoContainer>
      </HeadWrapper>
    );
  }
}

Header.propTypes = {

};

export default Header;
