import React, { Component } from "react";
import styled from "styled-components";
import zoom from "source/zoom.svg";
import Category from "components/Commons/Category"

const SearchForm = styled.div`
    display:flex;
    font-family: Noto Sans KR;
    justify-content: space-start;
    position:relative;
    padding-top:105px;
    left: 580px;
    width: 762px;
    height: 49px;
    border-bottom: 1.5px solid black;
    width:760px;
    .zoomImg{
        position:relative;
        bottom: 45px;
    }
    .searchInput{
        position:relative;
        bottom:45px;
        min-height:30px;
        left:43px;
        text-align: left;
        font-size:23px;
        color: #707070;
        opacity: 1;
        border: 0;
    }

    *:focus {
        outline: none;
    }
    .cateUI{
        position:relative;
        display:flex;
        justify-content:space-start;
        
        top:125px;

        text-align: left;
        font: Light 20px/29px Noto Sans KR;
        letter-spacing: 0;
        color: #FF0000;
        opacity: 1;
    }
    
    
    
`;
class Re_SearchList extends Component{
    getSearchValue = (e) => {
        const target = e.target;
        const value = target.value;
        let regExp = /^[a-zA-Zㄱ-힣0-9]*$/i;
        if (!value.match(regExp)) {
            alert("특수문자는 사용할 수 없습니다.");
            target.value = "";
            return;
        } else {
            this.setState({
                keyword: value
            });
        }
    };
    submitEnter = (e) => {
        if (e.keyCode === 13) {
            this.onSearchSubmit(this.state.keyword);
        }
    }

    onSearchSubmit = (data) => {
        if (this.state.keyword === null || this.state.keyword === "") {
            alert("키워드를 입력해주세요");
        } else {
            this.props.history.replace(`/search/${this.props.type}/${this.props.sort}/${this.state.keyword}`);
            this.changeState();
        }
    }

    render(){
        return(
            <>
                <SearchForm>
                    <div className="zoomImg"><img src={zoom} style={{width:"33px", height:"33px"}}/></div>
                    <input className="searchInput"
                           placeholder="검색어를 입력하세요"
                           onChange={this.getSearchValue}
                           onKeyDown={this.submitEnter}

                    />
                    {/*x box position*/}
                    <div className="cateUI">
                        <div>새부카테고리</div>
                        <div>새부카테고리</div>
                        <div>새부카테고리</div>
                        <div>새부카테고리</div>
                        <div>새부카테고리</div>
                        <div>새부카테고리</div>
                    </div>
                </SearchForm>
            </>

        )
    }
}
export default Re_SearchList;