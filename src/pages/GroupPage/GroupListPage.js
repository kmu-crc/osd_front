import React, { Component } from 'react'
import GroupListContainer from "containers/Groups/GroupListContainer"
import styled from 'styled-components'
import OrderOption from "components/Commons/OrderOption"
import osdstyle from "opendesign_style"

const TextWrapper = styled.div`
    position: relative;
    width: 1920px;
    line-height: 37px;
    text-align: center;
    font-size: 25px;
    font-family: Noto Sans KR;
    font-weight: 700;
    color: red;
    cursor: pointer;
`

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
    
`
class GroupListPage extends Component {
    state = { search: null, count: 0, this_order: { text: "등록순", keyword: "update" } }
    handleClickJoin = () => {
        window.location.href = "/createGroup"
    }
    handleChangedTotalCount = (count) => {
        this.setState({ count: count })
    }
    handleChangeOrderOps = (idx) => {
        this.setState({ this_order: idx })
    }
    render() {
        const { this_order, count } = this.state;
        return (
            <>
                <OrderOption order_clicked={this.handleChangeOrderOps} selected={this_order} />
                <TextWrapper>그룹({count})</TextWrapper>
                <div style={{ position: "relative" }}><JoinGroup onClick={() => this.handleClickJoin()}>그룹 등록하기</JoinGroup></div>
                <div style={{ position: "relative", paddingTop: "100px" }}>
                    <GroupListContainer {...this.state} updateGroupCount={this.handleChangedTotalCount} {...osdstyle.group_margin} />
                </div>
            </>
        )
    }
}

export default GroupListPage

