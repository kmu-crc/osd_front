import React, { Component } from 'react'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'

const FooterContainer = styled.div`
    width:100%;
    height:32px;
    display:flex;
    // position:fixed;
    // bottom:0;
    margin-height:100%;
    font-size:15px;
    font-weight:500;
    padding:5px;
    font-family:Noto Sans KR;
    color:#707070;
    text-align:center;
    background-color:white;
    z-index:9999;
    .origin{
        margin-left:15px;
        float:left;
    }
    .term{
        cursor:pointer;
        margin-left:auto;
        margin-right:17px;
    }
    .security{
        cursor:pointer;
        margin-right:13px;
    }
`

class Footer extends Component {
    
    // constructor(props)
    // {
    //     super(props);
    // }
    gotoPrivacy()
    {
        window.location.href="/footerPrivacy";
    }
    gotoTerm()
    {
        window.location.href="/footerPara";
    }
    render() {
        return (
            <FooterContainer>
                <div className="origin">copyright @ 2019 Open Design Inc.</div>
                <div className="term" onClick = {this.gotoTerm}>이용약관</div>
                <div className="security" onClick = {this.gotoPrivacy}>개인 정보 보호 방책</div>
            </FooterContainer>
        )
    }
}
//<FooterContainer>
//    <div className="copyright">copyright @ 2019 Open Design Inc.</div>
//    <div className="links">
//        {/* <Link to="">사이트 소개</Link> */}
//        <Link to="/Term/term">이용약관</Link>
//        <Link to="/Privacy/privacy">개인정보보호정책</Link>
//        {/* <Link to="">문의</Link> */}
//    </div>
//</FooterContainer>
//
export default Footer