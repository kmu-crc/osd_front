import React, { Component, Fragment } from 'react'
import banner from "source/tmp_main_banner.png"
import context from "source/context_banner.png"
import Design from "components/Designs/Design"
import styled from 'styled-components'
<<<<<<< HEAD
import MemberList from "../../components/Commons/MemberList/MemberList";
const Memberlist = MemberList;
=======
>>>>>>> 9e041528fd422b3137dac7f398a8a83f4ef35871

const Textwrapper = styled.div`
    margin-top: 60.5px;
    padding-bottom: 60px;
    text-align: center;
    font-size: 25px;
    font-family: "Noto Sans KR";
    line-height: 37px;
    font-weight: 700;
    color: #F00;
`
const BannerWrapper = styled.div`
    background: url(${ banner});
    background-repeat: no-repeat;
    background-size: 100% 349.5px;
    margin-top: 15px;
    width: 100%;
    height: 349.5px;
    .context {
        margin: auto;
        background: url(${ context});
        background-repeat: no-repeat;
        top: 40px;
        position: relative;
        background-size: 504px 196px;
        width: 504px;
        height: 196px;
    }
    .goto_guide {
        margin: auto;
        top: 85px;
        position: relative;
        width: 175px;
        height: 29px;
        border-bottom: solid 1.5px #F00;
        a {
            color: #F00;
            font-size: 20px;
            line-height: 29px;
            font-family: "Noto Sans KR";
            font-weight: 500;
        }
    }
`
class MainPage extends Component {
    render() {
        return (
            <Fragment>
                <BannerWrapper>
                    <div className="context" />
                    <div className="goto_guide" ><a href="/tour">이용 가이드 보러가기</a></div>
                </BannerWrapper>
                <Textwrapper>인기 디자인</Textwrapper>
                <div style={{ marginLeft: "10px", paddingBottom: "80px", display: "flex" }}><Design forked={true} /><Design /><Design /><Design /><Design /></div>
                <div style={{ marginLeft: "10px", paddingBottom: "80px", display: "flex" }}><Design forked={true} /><Design /><Design forked={true} /><Design forked={true} /><Design /></div>
                <div style={{ marginLeft: "10px", paddingBottom: "80px", display: "flex" }}><Design /><Design /><Design forked={true} /><Design forked={true} /><Design /></div>
                <div style={{ marginLeft: "10px", paddingBottom: "80px", display: "flex" }}><Design /><Design /><Design /><Design /><Design /></div>
                <div style={{ marginLeft: "10px", paddingBottom: "68px", display: "flex" }}><Design /><Design /><Design /><Design /><Design /></div>
<<<<<<< HEAD
                <MemberList />
=======
>>>>>>> 9e041528fd422b3137dac7f398a8a83f4ef35871
            </Fragment>)
    }
}

export default MainPage
