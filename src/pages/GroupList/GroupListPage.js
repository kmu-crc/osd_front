import React, { Component } from 'react'
import Group from "components/Groups/Group"
import styled from 'styled-components'
// import MenuContext from "Global/Context/GlobalContext"
import OrderOption from "components/Commons/OrderOption"

const TextWrapper = styled.div`
    position: relative;
    line-height: 37px;
    text-align: center;
    font-size: 25px;
    font-family: Noto Sans KR;
    font-weight: 700;
    color: red;
`;

const JoinGroup = styled.div`
    position: relative;
    left:1761px;
    width:115px;
    text-align: left;
    font-size: 20px;
    cursor: pointer;
    font-family: Noto Sans KR;
    font-weight:500;
    color: red;
    line-height: 29px;
    border-bottom: 1.5px solid red;
    
`;
class GroupListPage extends Component {
    state = { this_order: 0 }
    handleClickJoin = () => {
        console.log("click!!");
    }

    handleChangeOrderOps = (idx) => {
        this.setState({ this_order: idx })
        // console.log("changed_order", idx)
    }
    render() {
        let designerData = this.state;
        return (
            <>
                <OrderOption order_clicked = {this.handleChangeOrderOps} selected = {designerData.this_order}/>
                <TextWrapper>그룹(333)</TextWrapper>
                <div style = {{position:"relative"}}><JoinGroup onClick = {()=>this.handleClickJoin()}>그룹 등록하기</JoinGroup></div>
                <div style={{position:'relative',paddingTop:'100px'}}>
                    <div style={{ marginLeft: "10px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", paddingBottom: "68px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                </div>
            </>
        )
    }
}

export default GroupListPage

