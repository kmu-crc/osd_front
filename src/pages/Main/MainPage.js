import React, { Component, Fragment } from 'react'
import banner from "source/tmp_main_banner.png"
import context from "source/context_banner.png"
import Design from "components/Designs/Design"

//<div style={{ zIndex: "901", position: "absolute", width: "5px", height: "50px", borderRadius: "3px", backgroundColor: "#FF55AA" }}></div>
class MainPage extends Component {
    render() {
        return (
            <Fragment>
                <div style={{ background: `url(${banner})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 349.5px", marginTop: "15px", width: "100%", height: "349.5px" }}>
                    <div style={{ margin: "auto", background: `url(${context})`, backgroundRepeat: "no-repeat", top: "40px", position: "relative", backgroundSize: "504px 196px", width: "504px", height: "196px" }} />
                    <div style={{ margin: "auto", top: "85px", position: "relative", width: "175px", height: "29px", borderBottom: "solid 1.5px #F00" }}><a style={{ color: "#F00", fontSize: "20px", lineHeight: "29px", fontFamily: "Noto Sans KR", fontWeight: "500" }} href="/tour">이용 가이드 보러가기</a></div>
                </div>
                <div style={{ marginTop: "60.5px", paddingBottom: "60px", textAlign: "center", fontSize: "25px", fontFamily: "Noto Sans KR", lineHeight: "37px", fontWeight: "700", color: "red" }}>인기 디자인</div>
                <div style={{ marginLeft: "10px", paddingBottom: "80px", display: "flex" }}><Design forked={true} /><Design /><Design /><Design /><Design /></div>
                <div style={{ marginLeft: "10px", paddingBottom: "80px", display: "flex" }}><Design forked={true} /><Design /><Design forked={true} /><Design forked={true} /><Design /></div>
                <div style={{ marginLeft: "10px", paddingBottom: "80px", display: "flex" }}><Design /><Design /><Design forked={true} /><Design forked={true} /><Design /></div>
                <div style={{ marginLeft: "10px", paddingBottom: "80px", display: "flex" }}><Design /><Design /><Design /><Design /><Design /></div>
                <div style={{ marginLeft: "10px", paddingBottom: "68px", display: "flex" }}><Design /><Design /><Design /><Design /><Design /></div>
            </Fragment>)
    }
}

export default MainPage
