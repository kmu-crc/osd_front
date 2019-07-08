import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
            <div style={{ height: "22px", marginBottom: "20px", color: "#707070", backgroundColor: "white", display: "flex" }}>
                <div style={{ marginLeft: "14px", float: "left" }}>copyright @ 2019 Open Design Inc.</div>
                <div style={{ marginLeft: "auto", marginRight: "17px" }}>이용약관</div>
                <div style={{ marginRight: "13px" }}>개인 정보 보호 방책</div>
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