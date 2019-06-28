import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// css
const FooterContainer = styled.header`
    background-color: #FFFFFF;
    position: relative;
    z-index: 0;
    bottom: 0px;
    width: 100%;
    color: #707070;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    font-family: "Noto Sans KR";
    & .copyright {}
    & .links > a {
        -webkit-text-size-adjust: none;
        -ms-text-size-adjust: none;
        -moz-text-size-adjust: none;
        text-size-adjust: none;
        color: #707070;
        margin-right: 17px;
        font-size: 15px;
        font-family: "Noto Sans KR";
        &:hover{
            color: #E72327;
        }
    }
`
class Footer extends Component {
    render() {
        return (
            <FooterContainer>
                <div className="copyright">copyright @ 2019 Open Design Inc.</div>
                <div className="links">
                    {/* <Link to="">사이트 소개</Link> */}
                    <Link to="/Term/term">이용약관</Link>
                    <Link to="/Privacy/privacy">개인정보보호정책</Link>
                    {/* <Link to="">문의</Link> */}
                </div>
            </FooterContainer>
        )
    }
}

export default Footer