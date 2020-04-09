import React, { Component } from 'react'
import styled from 'styled-components'
import GitInfo from 'react-git-info/macro';
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
const FooterContainer = styled.div`
    width:100%;
    height:32px;
    display:flex;
    position:fixed;
    bottom:0;
    margin-height:100%;
    font-size:15px;
    font-weight:500;
    padding:5px;
    font-family:Noto Sans KR;
    color:#707070;
    text-align:center;
    background-color:white;
    z-index: 999;
    .origin{
        cursor: pointer;
        margin-left:15px;
        float:left;
    }
    .term{
        cursor: pointer;
        margin-left:auto;
        margin-right:17px;
    }
    .security{
        cursor: pointer;
        margin-right: 13px;
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
            <FooterContainer>
                <div className="origin" title={`${gitInfo.commit.date}`} onClick={async() => await alert(`현재 버전: ${gitInfo.commit.date}`,"확인")}>Copyright @ 2019 Open Design Inc.</div>
                <div className="term" onClick={this.gotoTerm}>이용약관</div>
                <div className="security" onClick={this.gotoPrivacy}>개인 정보 보호 방책</div>
            </FooterContainer>
        )
    }
}

export default Footer;
