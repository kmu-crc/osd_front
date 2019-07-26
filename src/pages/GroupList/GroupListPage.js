import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetGroupListRequest, GetGroupListCountRequest } from "actions/Groups/GroupList/GroupList"
import styled from 'styled-components'
import OrderOption from "components/Commons/OrderOption"

import ScrollList from "components/Commons/ScrollList"
import Group from "components/Groups/Group"
import Loading from "components/Commons/Loading"

const TextWrapper = styled.div`
    position: relative;
    padding-top: 25px;
    text-align: center;
    font-size: 25px;
    font-family: Noto Sans KR;
    font-weight: 700;
    color: red;
`

const margin = {
    width: "902px", height: "230px",
    marginRight: "96px", marginBottom: "60px",
    marginRightLast: "1px", marginBottomLast: "1px"
}

class GroupListPage extends Component {
    state = {
        page: 0, this_order: { text: "등록순", keyword: "update" }, search: null
    }
    componentDidMount() {
        this.props.GetGroupListCountRequest()
            .then(this.props.GetGroupListRequest(0, this.state.this_order.keyword))
    }
    handleChangeOrderOps = async (order) => {
        await this.setState({ page: 0, this_order: order })
        this.reloadData()
    }
    reloadData = () => {
        this.props.GetGroupListRequest(this.state.page, this.state.this_order.keyword, this.state.search)
        console.log(this.state.page, this.state.this_order.keyword, this.state.search)
    }
    getList = async () => {
        await this.setState({ page: this.state.page + 1 })
        const { page, keyword, order } = this.state
        return this.props.GetDesignListRequest(page, order, keyword)
    }
    render() {
        const { width, height, marginRight, marginRightLast, marginBottom, marginBottomLast } = margin
        const { page, this_order } = this.state
        // console.log(this.props.Count, this.props.dataList, this.props.dataListAdded)
        return (
            <>
                <TextWrapper>그룹(333)</TextWrapper>
                {/* <OrderOption order_clicked={this.handleChangeOrderOps} selected={this.state.this_order} /> */}
                <div style={{ color: "#FF0000", marginRight: "50px", fontFamily: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", fontSize: "20px", cursor: "pointer", borderBottom: "1.5px solid red" }}>그룹 등록</div>
                <div style={{ paddingTop: "30px", paddingBottom: "68px" }}>
                    {this.props.status === "INIT" ?
                        <Loading /> : <ScrollList cols={2} width={width} height={height} marginRight={marginRight} marginBottom={marginBottom} marginRightLast={marginRightLast} marginBottomLast={marginBottomLast}
                            page={page} ListComponent={Group} dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} getListRequest={this.getList} />}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataList: state.GroupList.status.GroupList,
        dataListAdded: state.GroupList.status.GroupListAdded,
        Count: state.GroupList.status.Count,
        status: state.GroupList.status
    }
}

const mapDispatchToProps = (disptch) => {
    return {
        GetGroupListRequest: (page, sort, keyword) => {
            return disptch(GetGroupListRequest(page, sort, keyword))
        },
        GetGroupListCountRequest: () => {
            return disptch(GetGroupListCountRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupListPage)
