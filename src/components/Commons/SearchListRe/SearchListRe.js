import React, { Component } from "react";
import styled from "styled-components";
import zoom from "source/zoom.svg";
import OrderOption from "components/Commons/OrderOption"


import ScrollDesignListContainer from "containers/Designs/ScrollDesignListContainer";
import ScrollGroupListContainer from "containers/Groups/ScrollGroupListContainer";
import ScrollDesignerListContainer from "containers/Designer/ScrollDesignerListContainer";
import { Dropdown } from "semantic-ui-react";
import 'react-dropdown/style.css'

import Category from "components/Commons/Category"

const SearchForm = styled.div`
    font-family: Noto Sans KR;
    position:relative;
    height:1100px;
    .inputBox{
        z-index:500;
        justify-content: space-start;
        position:relative;
        padding-top:105px;
        left: 580px;
        height: 49px;
        border-bottom: 1.5px solid black;
        width:760px;
    }
    .zoomImg{
        z-index:500;
        position:relative;
        bottom: 45px;
    }
    .searchInput{
        z-index:500;
        position:relative;
        bottom:80px;
        min-height:30px;
        left:80px;
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
        z-index:500;
        position:absolute;

        left:645px;
        top:245px;

        display:flex;
        justify-content:space-start;

        font-weight: 300;
        text-align: left;
        font-size:20px;
        letter-spacing: 0;
        color: #707070;
        opacity: 1;
    }
`;
class SearchListRe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [{ value: 0, text: "디자인", type: "design" }, { value: 1, text: "그룹", type: "group" }, { value: 2, text: "디자이너", type: "designer" }],
            order: [{ text: "인기순", keyword: "like" }, { text: "최신순", keyword: "update" }],
            selectedType:
                this.props.type === "design" ? { value: 0, text: "디자인", type: "design" }
                    : this.props.type === "group" ? { value: 1, text: "그룹", type: "group" } : { value: 2, text: "디자이너", type: "designer" },
            this_order: this.props.sort === "like" ? { text: "인기순", keyword: "like" } : { text: "최신순", keyword: "update" },
            keyword: this.props.keyword || ""
        }
        this.onChangeDropBox = this.onChangeDropBox.bind(this);
    };

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
    };
    changeState = async () => { // 리렌더링을 위한 state값 변경
        await this.setState({ rendering: false });
        await this.setState({ rendering: true });
    };
    onSearchSubmit = (data) => {
        if (this.state.keyword === null || this.state.keyword === "") {
            alert("키워드를 입력해주세요");
        } else {
            this.props.history.replace(`/search/${this.props.type}/${this.props.sort}/${this.state.keyword}`);
            this.changeState();
        }
    };
    onChangeDropBox = async (event, { value }) => {
        console.log(this.state.type[value]);
        await this.setState({ selectType: this.state.type[value] });
        this.props.history.replace(`/search/${this.state.selectedType.type}/${this.state.this_order.keyword}/${this.props.keyword}`);
        this.changeState();
    };
    handleChangeOrderOps = (order) => {
        this.setState({ this_order: order })
        this.props.history.replace(`/search/${this.props.type}/${order.keyword}/${this.props.keyword}`);
        this.changeState();
    }
    render() {
        return (
            <div style={{ position: "relative", overflow: "hidden" }}>
                <SearchForm>
                    <div className="inputBox">
                        <div className="zoomImg"><img src={zoom} style={{ width: "33px", height: "33px" }} /></div>
                        <input className="searchInput" id="searchInput"
                            placeholder="검색어를 입력하세요"
                            onChange={this.getSearchValue}
                            onKeyDown={this.submitEnter}
                        />
                    </div>
                    {/*x box position*/}
                    <div style={{ display: "flex", justifyContent: "space-start" }}>
                        <div style={{ position: "absolute", top: "250px", left: "44px", zIndex: "501" }}>
                            <Dropdown onChange={this.onChangeDropBox} options={this.state.type} value={this.state.selectedType.value} />
                        </div>
                        {/* <div className="cateUI">{this.state.selectCate != 1 &&<React.Fragment><div style={{ color: "red" }}>세부카테고리</div><div style={{ paddingLeft: '20px' }}>세부카테고리</div><div style={{ paddingLeft: '20px' }}>세부카테고리</div><div style={{ paddingLeft: '20px' }}>세부카테고리</div><div style={{ paddingLeft: '20px' }}>세부카테고리</div></React.Fragment>}</div> */}
                        {/* <div style={{ position: "absolute", top: "200px", right: "0px" }}> */}
                        <OrderOption order_clicked={this.handleChangeOrderOps} selected={this.state.this_order} />
                        {/* </div> */}
                    </div>
                    <div>
                        {/* {this.props.type === "designer" && <ScrollDesignerListContainer sort={this.props.sort} keyword={this.props.keyword} />} */}
                        {/* {this.props.type === "group" && <ScrollGroupListContainer sort={this.props.sort} keyword={this.props.keyword} />} */}
                        {/* {this.props.type === "design" && <ScrollDesignListContainer sort={this.props.sort} keyword={this.props.keyword} />} */}
                    </div>
                </SearchForm>
            </div>
        )
    }
}
export default SearchListRe;