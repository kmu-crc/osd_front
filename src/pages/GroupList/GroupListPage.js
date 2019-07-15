import React, { Component } from 'react'
import Group from "components/Groups/Group"
import styled from 'styled-components'
// import MenuContext from "Global/Context/GlobalContext"

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
`
class OrderOption extends Component {
    state = { options: orderoption }
    handleClicked = (idx) => {
        this.props.order_clicked(idx)
    }
    render() {
        const opts = this.state.options
        return (
            <Options>
                <div style={{color: "#FF0000", marginRight: "50px", fontFamily: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", fontSize: "20px", cursor: "pointer", borderBottom: "1.5px solid red" }}>
                    그룹 등록
                </div>
                {opts.map((option, key) => {
                    return (
                        <div onClick={() => this.handleClicked(key)} key={key}
                            style={key === this.props.selected
                                ? { color: "#FF0000", marginRight: orderoption_margin[key], fontFamily: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", fontSize: "20px", cursor: "pointer", borderBottom: "1.5px solid red" }
                                : { color: "#707070", marginRight: orderoption_margin[key], fontFamily: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", fontSize: "20px", cursor: "pointer"}}>
                            {option}
                        </div>
                    )
                })}
            </Options>
        )
    }
}

const TextWrapper = styled.div`
    position: relative;
    padding-top: 25px;
    text-align: center;
    font-size: 25px;
    font-family: Noto Sans KR;
    font-weight: 700;
    color: red;
`
class GroupListPage extends Component {
    state = { this_order: 0 }
    handleChangeOrderOps = (idx) => {
        this.setState({ this_order: idx })
        // console.log("changed_order", idx)
    }
    render() {
        return (
            <>
                <TextWrapper>그룹(333)</TextWrapper>
                <OrderOption order_clicked={this.handleChangeOrderOps} selected={this.state.this_order} />
                <>
                    <div style={{ marginLeft: "10px", paddingTop: "30px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "60px", paddingBottom: "68px", display: "flex" }}><Group forked={true} /><Group forked={true} /></div>
                </>
            </>
        )
    }
}

export default GroupListPage
