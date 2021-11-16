import React, { Component } from 'react'
import styled from 'styled-components'
import zoom from "source/zoom.svg"
import new_logo_zoom_red from "source/new_logo_zoom_red.svg";
import new_logo_zoom_purple from "source/new_logo_zoom_purple.svg";
import new_logo_zoom_green from "source/new_logo_zoom_green.svg";
import new_logo_zoom_blue from "source/new_logo_zoom_blue.svg";
// import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
// import Slider from "react-slick";
import { isMobile } from "constant";
import mobilesearch from "resources/images/mobile_search_icon.svg";

// const flag_MaxWidth = 1440;
// const flag_MinWidth = 480;
// const SearchContainer = styled.div`
//     display: ${props => props.visible};
//     background-color: #FFFFFF;
//     border-radius: 20px;
//     border: 1.5px solid #707070;
//     position:relative;
//     overflow:hidden;
//     width: 350px;
//     min-width:150px;
//     height: 36px;
//     @media only screen and (min-width : ${flag_MinWidth}px) and (max-width : ${flag_MaxWidth}px) {
//         width:${props => (350 - (flag_MaxWidth - props.formSize)) > 36 ? (350 - (flag_MaxWidth - props.formSize)) : 36}px;
//     }
//     @media only screen and (max-width : 1024px) {
//         min-width:90%;
//     }
//     @media only screen and (max-width : ${flag_MinWidth}px) {
//         width: 90%;
//     }
//     @media only screen and (min-width : ${flag_MaxWidth}px) {
//         width: 350px;
//     }

//     &:focus{
//         outline: 1.5px solid red;
//     }
//     input {
//         outline: none;
//         width: 80%;
//         border: none;
//         margin: 5px 10px;
//     }
//     .shadow_button{
//         width:21px;
//         height:21px;
//         position: absolute;
//         top:3px;
//         right:12px;

//         background: url(${zoom});
//         background-size: contain;
//         background-repeat: no-repeat;
//         cursor: pointer;
//     }
// `;
const SearchContainer = styled.div`
    // border:1px solid black;
    width:579px;
    // max-width:579px;
    // min-width:100px;
    height:40px;
    border-bottom:2px solid white;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:5px 0px;
    .searchbox{
        width:80%;
        font-size:23px;
        font-family:Spoqa Han Sans;
        border:none;
        outline:none;
        background:transparent;
        color:white;
        ::placeholder{
            color:white;
        }
    }
    .icon_zoom{
        width:38px;
        height:38px;
    }
    @media only screen and (min-width: 0px) and (max-width: 1300px) {
        width: 100%;
        min-width: 100px;
        max-width: 450px;
    }
`;
// mobile
const MobileSearchContainer = styled.div`
    width: ${props => props.width};
    height: 22px;
    border-radius: 10px;
    border: 1px solid #C3C3C3;
    position: relative;

    input {
        height: 20px;
        width: 170px;
        margin-left: 7px;
        // padding-left: 5px;
        border: none;
        :focus {
            outline: none;
        }
        color: ${props => props.fontColor};
        background-color: transparent;
        // background-color: ${props => props.inputbgcolor};
    }

    img {
        width: 18px;
        height: 18px;
        object-fit: cover;
        border: none;
        position: absolute;
        right: 5px;
        top: 1px;
    }
`;
class SearchForm extends Component {
    state = {
        searchKeyword: "",
    };
    goSearch = () => {
        window.location.href = `/search/update/${this.state.searchKeyword}`;
    };

    submitEnter = async (e) => {
        if (e.keyCode === 13) {
            document.getElementById("searchbox").blur();
            if (this.state.searchKeyword.trim() === "") {
                await alert("검색할 내용을 입력하세요.", "확인");
                await document.getElementById("searchbox").focus();
            } else {
                this.goSearch();
            }
        }
    };
    onClickedIcon = async (e) => {
        if (this.state.searchKeyword.trim() === "") {
            await alert("검색할 내용을 입력하세요.", "확인");
            return;
        }
        this.goSearch();
    }
    handleKeyDown = async (e) => {
        if (e.keyCode === 13) {
            this.goSearch();
        }
        const target = e.target;
        const value = target.value;
        console.log(e.keyCode);
        // let regExp = /^[a-zA-Zㄱ-힣0-9"_-]*$/i;
        let regExp = /^[a-zA-Zㄱ-힣0-9"_-\s]*$/;
        if (!value.match(regExp)) {
            await alert("특수문자는 사용할 수 없습니다.", "확인");
            target.value = "";
            return;
        } else {
            this.setState({ searchKeyword: value });
        }
    }
    render() {
        return (

            isMobile()
                ? <MobileSearchContainer
                    fontColor={this.props.transparent ? "white" : "black"}
                    inputbgcolor={this.props.transparent ? "transparent" : "white"}
                    width={this.props.formWidth ? `${this.props.formWidth}px` : "100%"} >
                    <input
                        className="searchbox"
                        id="searchbox"
                        type="text"
                        placeholder={this.props.transparent ? "" : "새로운 디자인을 찾아보세요!"}
                        maxLength="100"
                        onChange={this.handleKeyDown}
                        onKeyDown={this.submitEnter}
                        value={this.state.searchKeyword} />
                    <a onClick={() => this.onClickedIcon()}>
                        <img src={mobilesearch} />
                    </a>
                </MobileSearchContainer>

                : <SearchContainer
                    formSize={this.props.formWidth}
                    visible={this.props.visible === 1 ? "block" : "none"} >

                    <input
                        className="searchbox"
                        id="searchbox"
                        type="text"
                        placeholder="새로운 디자인을 찾아보세요!"
                        maxLength="100"
                        onChange={this.handleKeyDown}
                        onKeyDown={this.submitEnter}
                        value={this.state.searchKeyword} />

                    <img src={window.location.pathname.indexOf("/group") != -1 ? new_logo_zoom_green
                        : window.location.pathname.indexOf("/designer") != -1 ? new_logo_zoom_purple
                            : window.location.pathname.indexOf("/my") != -1 ? new_logo_zoom_red
                                : window.location.pathname.indexOf("/design") != -1 ? new_logo_zoom_blue
                                    : new_logo_zoom_red}
                        className="icon_zoom"
                        onClick={this.onClickedIcon} />

                    {/* <div className="shadow_button" onClick={this.onClickedIcon} />
                <input id="searchbox" type="text" placeholder={this.props.formWidth > 1200 ? "Search..." : ""} maxLength="100" onChange={this.handleKeyDown} onKeyDown={this.submitEnter} value={this.state.searchKeyword} /> */}
                </SearchContainer>);
    }
}


export default SearchForm