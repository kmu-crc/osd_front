import React, { Component } from 'react'
import styled from 'styled-components'
import zoom from "source/zoom.svg"

const flag_MaxWidth = 1440;
const flag_MinWidth = 480;
const SearchContainer = styled.div`
    display: ${props => props.visible};
    background-color: #FFFFFF;
    border-radius: 20px;
    border: 1.5px solid #707070;
    position:relative;
    overflow:hidden;
    width: 350px;
    height: 36px;
    @media only screen and (min-width : ${flag_MinWidth}px) and (max-width : ${flag_MaxWidth}px) {
        width:${props => (350 - (flag_MaxWidth - props.formSize)) > 36 ? (350 - (flag_MaxWidth - props.formSize)) : 36}px;
    }
    @media only screen and (max-width : ${flag_MinWidth}px) {
        width: 36px;
    }
    @media only screen and (min-width : ${flag_MaxWidth}px) {
        width: 350px;
    }

    &:focus{
        outline: 1.5px solid red;
    }
    input {
        outline: none;
        width: 80%;
        border: none;
        margin: 0px 10px;
    }
    .shadow_button{
        width:21px;
        height:21px;
        position: absolute;
        top:3px;
        right:12px;

        background: url(${zoom});
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
    }
`;
class SearchForm extends Component {
    state = {
        searchKeyword: "",
    };
    goSearch = () => {
        window.location.href = `/search/update/${this.state.searchKeyword}`;
    };

    submitEnter = (e) => {
        if (e.keyCode === 13) {
            if (this.state.searchKeyword.trim() === "") {
                alert("검색할 내용을 입력하세요.");
                return;
            }
            this.goSearch();
        }
    };
    onClickedIcon = (e) => {
        if (this.state.searchKeyword.trim() === "") {
            alert("검색할 내용을 입력하세요.");
            return;
        }
        this.goSearch();
    }
    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.goSearch();
        }
        const target = e.target;
        const value = target.value;
        console.log(e.keyCode);
        // let regExp = /^[a-zA-Zㄱ-힣0-9"_-]*$/i;
        let regExp = /^[a-zA-Zㄱ-힣0-9"_-\s]*$/;
        if (!value.match(regExp)) {
            alert("특수문자는 사용할 수 없습니다.");
            target.value = "";
            return;
        } else {
            this.setState({ searchKeyword: value });
        }
    }
    render() {
        return (
            <SearchContainer formSize={this.props.formWidth} visible={this.props.visible === 1 ? "block" : "none"} >
                <div className="shadow_button" onClick={this.onClickedIcon} />
                <input type="text" placeholder={this.props.formWidth > 1200 ? "Search..." : ""} maxLength="100" onChange={this.handleKeyDown} onKeyDown={this.submitEnter} value={this.state.searchKeyword} />
            </SearchContainer>)
    }
}


export default SearchForm