import React, { Component } from 'react'
import styled from 'styled-components'
import banner from "source/tmp_main_banner.png"

const Banner = styled.div`
    position:relative;
    top: 70px;
    border: 1px solid cyan;
    width: 100%;
    height: 349.5px;
    background-image: url(${banner});
    background-size: cover;
    font-family: "Noto Sans KR";
    .goTour{
        height: 29px;
        width: 175px;
        font-size: 20px;
        color: red;
        position: relative;
        border-bottom: 1.5px solid red;
        left: 50%;
        top: 50%;
        cursor: pointer;
    }
    .contextBox{width:100%;color:#707070;font-size:20px;left:50%;}
    .title{width:100%;text-align:center;color:red;font-size:25px;font-weight:bold;}
`
const TextTitle = styled.div`
    display:flex;
    align-items: center
    justify-content: center;
    top: 60.5px;
    width: 120px;
    height: 37px;
    color: red;
    font-size: 25px;
`
class MainContainer extends Component {
    goTourPage = () => {
        window.location.href = "/tour"
    }
    render() {
        return (
            <div>
                <Banner >
                    <div className="contextBox">
                        <span className="title">OPEN SOURCE DESIGN, OPEN DESIGN</span><br />
                        <span className="context">오픈 소스 기반 플랫폼을 통해 다양한 사람들과 함께<br />
                            당신의 아이디어를 쉽게, 최고의 디자인으로 만들어 보세요.<br /><br />
                            당신의 아이디어가 최고가 되는 경험을 저희와 함께하세요! </span>
                    </div>
                    <div onClick={this.goTourPage} className="goTour">이용 가이드 보러가기</div>
                </Banner>
                <TextTitle>인기디자인</TextTitle>
                <HotDesignList />
            </div>
        )
    }
}
class HotDesignList extends Component {
    render() {
        return (<div>hothothothot</div>)
    }
}
class Design extends Component {
    render() {
        return (<div></div>)
    }
}
class ScrollList extends Component {
    render() {
        return (<div></div>)
    }
}
class MainPage extends Component {
    render() {
        return (
            <MainContainer />
        )
    }
}


export default MainPage