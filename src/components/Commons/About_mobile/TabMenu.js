import React from 'react';
import styled from 'styled-components';

const Navi = styled.div`
  min-width: 264px;
  width: 264px;
  padding-top: 305px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .menu {
    width: 168px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Noto Sans KR;
    font-weight: Medium;
    font-size: 24px;
    cursor: pointer;
  }

  .borderBottom {
    border-bottom: 2px solid #707070;
  }

  .red {
    color: red;
  }

`;

export const TabMenu = ({ }) => <Navi>
    <div className={`menu ${window.location.href.search("aboutIntro") > -1 ? "red" : ""} borderBottom`} onClick={() => window.location.href = "/aboutIntro"}>사이트 소개</div>
    <div className={`menu ${window.location.href.search("aboutTermsOfUse") > -1 ? "red" : ""} borderBottom`} onClick={() => window.location.href = "/aboutTermsOfUse"}>이용약관</div>
    <div className={`menu ${window.location.href.search("aboutPrivacyPolicy") > -1 ? "red" : ""}`} onClick={() => window.location.href = "/aboutPrivacyPolicy"}>개인정보 보호</div>
</Navi>