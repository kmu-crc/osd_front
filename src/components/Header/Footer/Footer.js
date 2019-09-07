import React, { Component } from 'react'
// import styled from 'styled-components'
// import { Link } from 'react-router-dom'

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
            <div style={{ width:"100%",marginHeight:"100%",position:"absolute",padding:"20px",
                height: "22px", marginBottom: "30px", fontFamily: "Noto Sans KR", color: "#707070", backgroundColor: "white",
                display: "flex", fontSize: "15px", lineHeight: "22px", textAlign: "center",
                fontWeight: "500"
            }}>
                <div style={{ marginLeft: "15px", float: "left" }}>copyright @ 2019 Open Design Inc.</div>
                <div onClick = {this.gotoTerm} style={{ cursor:"pointer", marginLeft: "auto", marginRight: "17px" }}>이용약관</div>
                <div onClick = {this.gotoPrivacy} style={{cursor:"pointer", marginRight: "13px" }}>개인 정보 보호 방책</div>
            </div>
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