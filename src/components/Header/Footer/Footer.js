import React, { Component } from 'react'
import styled from 'styled-components'
import GitInfo from 'react-git-info/macro';
// import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
const FooterContainer = styled.div`
    width:100%;
    height:1px;
    display:flex;
    position:fixed;
    bottom:0;
    margin-height:100%;
    font-size:15px;
    font-weight:500;
    font-family:Noto Sans KR;
    color:#707070;
    text-align:center;
    background-color:transparent;
    .origin{
        min-width:max-content;
        cursor: pointer;
        margin-left:15px;
        float:left;
    }
    .term{
        min-width:max-content;
        cursor: pointer;
        margin-left:auto;
        margin-right:17px;
    }
    .security{
        min-width:max-content;
        cursor: pointer;
        margin-right: 13px;
    }
    @media only screen and (min-width : ${0}px) and (max-width : ${500}px) {
        .origin{font-size:10px;}
        .term{font-size:10px;}
        .security{font-size:10px;}
    }
`

const gitInfo = GitInfo();

class Footer extends Component {
    constructor(props) {
        super(props);
        this.gotoPrivacy = this.gotoPrivacy.bind(this);
        this.gotoTerm = this.gotoTerm.bind(this);
    }
    gotoPrivacy() {
        window.location.href = "/footerPrivacy";
    }
    gotoTerm() {
        window.location.href = "/footerPara";
    }
    render() {
        return (
            <FooterContainer id="footer-div">
                {/* <div className="origin" title={`${gitInfo.commit.date}`} onClick={async () => await alert(`현재 버전: ${gitInfo.commit.date}`, "확인")}>Copyright @ 2021 Open Design Inc.(ver.{global.appVersion})</div>
                <div className="term" onClick={this.gotoTerm}>이용약관</div>
                <div className="security" onClick={this.gotoPrivacy}>개인 정보 보호 방책</div> */}
            </FooterContainer>
        )
    }
}

export default Footer;
