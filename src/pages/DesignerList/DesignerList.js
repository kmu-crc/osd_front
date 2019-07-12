import React, { Component } from 'react'
import Designer from "components/Designer/Designer";
import styled from 'styled-components'


const orderoption = ["인기순", "최신순"]
const orderoption_margin = [30, 44]
const Options = styled.div`
    position: relative;
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
    font-size: 20px;
    font-family: Noto Sans KR;
    color: #707070;
    font-weight: 500;
    line-height: 29px;
    text-align: middle;
`;
const TextWrapper = styled.div`
    position: relative;
    padding-top: 27px;
    text-align: center;
    font-size: 25px;
    font-family: Noto Sans KR;
    font-weight: 700;
    color: red;
`;
class OrderOption extends Component {
    state = { options: orderoption }
    handleClicked = (idx) => {
        this.props.order_clicked(idx)
    }
    render() {
        const opts = this.state.options
        return (
            <Options>
                {opts.map((option, key) => {
                    return (
                        <div onClick={() => this.handleClicked(key)} key={key}
                             style={key === this.props.selected
                                 ? { color: "#FF0000", marginRight: orderoption_margin[key], fontFamily: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", fontSize: "20px", borderBottom: "1.5px solid red" }
                                 : { color: "#707070", marginRight: orderoption_margin[key], fontFamily: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", fontSize: "20px" }}>
                            {option}
                        </div>
                    )
                })}
            </Options>
        )
    }
}
class DesignerListPage extends Component {
    state = { this_order: 0 }
    handleChangeOrderOps = (idx) => {
        this.setState({ this_order: idx })
        // console.log("changed_order", idx)
    }
    render() {
        console.log("designer:", this.props)
        return (
            <>
                <TextWrapper>디자이너(333)</TextWrapper>
                <OrderOption order_clicked={this.handleChangeOrderOps} selected={this.state.this_order} />

                <div style={{display:"flex", paddingTop:"29px",marginLeft:"9px", marginRight:"12px",justifyContent:"space-between"}}><Designer /><Designer/><Designer /></div>
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