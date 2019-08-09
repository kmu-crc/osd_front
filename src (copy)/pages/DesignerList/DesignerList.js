import React, { Component } from 'react'
import Designer from "components/Designers/Designer/Designer";
import styled from 'styled-components'
import OrderOption from "components/Commons/OrderOption"

const TextWrapper = styled.div`
    position: relative;
    text-align: center;
    line-height:37px;
    font-size: 25px;
    font-family: Noto Sans KR;
    font-weight: 700;
    color: red;
`;
const JoinDesigner = styled.div`
    position: relative;
    left: 1724px;
    width:152px;
    text-align: left;
    font-size: 20px;
    cursor: pointer;
    font-family: Noto Sans KR;
    font-weight:500;
    color: red;
    line-height: 29px;
    border-bottom: 1.5px solid red;
`;


class DesignerListPage extends Component {
    state = { this_order: 0 }
    handleChangeOrderOps = (idx) => {
        this.setState({ this_order: idx })
        // console.log("changed_order", idx)
    }
    handleClickJoin = () => {
        console.log("click!!");
    }

    render() {
        console.log("designer:", this.props)
        let designerData = this.state;
        return (
            <>
                <OrderOption order_clicked = {this.handleChangeOrderOps} selected = {designerData.this_order}/>
                <TextWrapper>디자이너(333)</TextWrapper>
                <div style = {{position:"relative"}}><JoinDesigner onClick = {()=>this.handleClickJoin()}>디자이너 등록하기</JoinDesigner></div>
                <div style={{display:"flex", paddingTop:"100px",marginLeft:"9px", marginRight:"12px",justifyContent:"space-between"}}><Designer /><Designer/><Designer /></div>
                <div style={{display:"flex", paddingTop:"80px",marginLeft:"9px", marginRight:"12px",justifyContent:"space-between"}}><Designer /><Designer/><Designer /></div>
                <div style={{display:"flex", paddingTop:"80px",marginLeft:"9px", marginRight:"12px",justifyContent:"space-between"}}><Designer /><Designer/><Designer /></div>
                <div style={{display:"flex", paddingTop:"80px",marginLeft:"9px", marginRight:"12px",justifyContent:"space-between"}}><Designer /><Designer/><Designer /></div>
                <div style={{display:"flex", paddingTop:"80px",marginLeft:"9px", marginRight:"12px",justifyContent:"space-between"}}><Designer /><Designer/><Designer /></div>
                <div style={{display:"flex", paddingTop:"80px",paddingBottom:"66px",marginLeft:"10px", marginRight:"12px",justifyContent:"space-between"}}><Designer /><Designer/><Designer /></div>
            </>
        )

    }
}
/*
                  <div style = {{display:"flex", justifyContent:"space-between", height:"230px"}}><Designer /> <Designer /> <Designer /></div>
                  <div style = {{display:"flex", justifyContent:"space-between", height:"230px"}}><Designer /> <Designer /> <Designer /></div>
                  <div style = {{display:"flex", justifyContent:"space-between", height:"230px"}}><Designer /> <Designer /> <Designer /></div>
                  <div style = {{display:"flex", justifyContent:"space-between", height:"230px"}}><Designer /> <Designer /> <Designer /></div>
                  <div style = {{display:"flex", justifyContent:"space-between", height:"230px"}}><Designer /> <Designer /> <Designer /></div>
              */
export default DesignerListPage
