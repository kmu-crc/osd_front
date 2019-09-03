import React, { Component } from "react";
import styled from "styled-components";
import zoom from "source/zoom.svg";
import OrderOption from "components/Commons/OrderOption"

import ScrollDesignListContainer from "containers/Designs/ScrollDesignListContainer";
import ScrollGroupListContainer from "containers/Groups/ScrollGroupListContainer";
import ScrollDesignerListContainer from "containers/Designer/ScrollDesignerListContainer";
import Dropdown from 'react-dropdown'
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
        width: 762px;
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
        display:flex;
        justify-content:space-start;
        padding-top:125px;
        padding-left:635px;

        font-weight: 300;
        text-align: left;
        font-size:20px;
        letter-spacing: 0;
        color: #707070;
        opacity: 1;
    }
    
    
    
`;
const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
  margin-top:40px;
  margin-left:100px
  & ul {
    margin-top: 30px;
    
  }
`;
const type = [
    { key: "design", value: "디자인", text: "디자인" },
    { key: "group", value: "그룹", text: "그룹" },
    { key: "designer", value: "디자이너", text: "디자이너" }
];
class Re_SearchList extends Component{

    state = {
        mainCate:['디자인', '그룹','디자이너'],
        this_order: { text: "등록순", keyword: "update" },
        selectedCate:"디자인",
        rendering: true,
        keyword: "",
        currentType:"",
    }
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
    changeState = async () => { // 리렌더링을 위한 state값 변경
        await this.setState({
            rendering: false
        });
        await this.setState({
            rendering: true
        });
    }
    onSearchSubmit = (data) => {
        if (this.state.keyword === null || this.state.keyword === "") {
            alert("키워드를 입력해주세요");
        } else {
            this.props.history.replace(`/search/${this.props.type}/${this.props.sort}/${this.state.keyword}`);
            console.log(this.props.history);
            this.changeState();
        }
    }
    onChangeDropBox(event)
    {
        console.log(event.target.value);
        //alert(event.target.selected);
    }
    typeChange = (e, { value }) => {
        this.props.history.replace(`/search/${value}/${this.props.sort}/${this.props.keyword}`);

    }



    sortChange = (e, { value }) => {
        this.props.history.replace(`/search/${this.props.type}/${value}/${this.props.keyword}`);
        this.changeState();
    }

    render(){
        const DesignProps = { cols: 5, width: "330px", height: "330px", marginRight: "63px", marginBottom: "80px", marginRightLast: "8px", marginBottomLast: "26px"};
        const GroupProps = { cols: 2, width: "902", height: "230px", marginRight: "94px", marginBottom: "60px", marginRightLast: "11px", marginBottomLast: "179px"};
        const DesignerProps = {cols:3, width: "590px", height: "150px", marginRight: "63px", marginBottom: "80px", marginRightLast: "8px", marginBottomLast: "68px" }

        return(
            <SearchForm>
                <div className="inputBox">
                    <div className="zoomImg"><img src={zoom} style={{width:"33px", height:"33px"}}/></div>
                    <input className="searchInput" id="searchInput"
                           placeholder="검색어를 입력하세요"
                           onChange={this.getSearchValue}
                           onKeyDown={this.submitEnter}

                    />
                </div>
                {/*x box position*/}
                <div style={{display:"flex", justifyContent:"space-start"}}>

                    <div style={{minWidth:"110px",paddingTop:"60px", paddingLeft:"300px", zIndex:"501"}}>
                        <Dropdown placeholder={this.props.type && this.props.type === "designer"
                        ? "디자이너"
                        : this.props.type && this.props.type === "group"
                            ? "그룹"
                            : "디자인"}
                        options={type}
                        onChange={this.typeChange}/>
                    </div>

                    <div className="cateUI">
                    <React.Fragment>
                        <div style={{color:"red"}}>세부카테고리</div>
                        <div style={{paddingLeft:'20px'}}>세부카테고리</div>
                        <div style={{paddingLeft:'20px'}}>세부카테고리</div>
                        <div style={{paddingLeft:'20px'}}>세부카테고리</div>
                        <div style={{paddingLeft:'20px'}}>세부카테고리</div>
                    </React.Fragment>
                    }

                    </div>
                    <div style={{paddingLeft:"1310px", paddingTop:"70px"}}><OrderOption order_clicked = {this.handleChangeOrderOps} selected = {this.state.this_order}/></div>
                </div>
                <Wrapper>
                    {this.props.type === "designer"
                        ? <ScrollDesignerListContainer sort={this.props.sort} keyword={this.props.keyword}/>
                        : this.props.type === "group"
                            ? <ScrollGroupListContainer sort={this.props.sort} keyword={this.props.keyword}/>
                            : <ScrollDesignListContainer sort={this.props.sort} keyword={this.props.keyword}/>
                    }
                </Wrapper>


            </SearchForm>



        )
    }
}
export default Re_SearchList;