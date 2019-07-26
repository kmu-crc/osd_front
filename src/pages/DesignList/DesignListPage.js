import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetDesignListRequest, GetDesignListCountRequest } from "actions/Designs/DesignList/DesignList"
import { GetCategoryListRequest } from "actions/Category/Category"
import styled from 'styled-components'
import Category from "components/Commons/Category"
import OrderOption from "components/Commons/OrderOption"

import ScrollList from "components/Commons/ScrollList"
import Design from "components/Designs/Design"
import Loading from "components/Commons/Loading"

const TextWrapper = styled.div`
    position: relative;
    top: 25px;
    text-align: center;
    font-size: 25px;
    font-family: Noto Sans KR;
    font-weight: 700;
    color: red;
`
const margin = { width: "330px", height: "330px", marginRight: "63px", marginBottom: "80px", marginRightLast: "8px", marginBottomLast: "68px" }
class DesignListPage extends Component {
    state = {
        page: 0,
        this_category: { text: null, value: 0 },
        main_category: { text: null, value: null },
        sub_category: { text: null, value: null },
        this_order: { text: "등록순", keyword: "update" },
        search: null
    }
    componentDidMount() {
        this.props.GetCategoryListRequest()
            .then(() => { this.props.GetDesignListCountRequest() })
        this.props.GetDesignListRequest(0, this.state.this_order.keyword)
    }
    handleChangeCategory = async (category) => {
        await this.setState({ page: 0, main_category: category, this_category: category, sub_category: { text: null, value: null } })
        console.log("category.value:", category.value)
        this.props.GetDesignListCountRequest(category.value || null)
        this.reloadData()
    }
    handleChangeSubCategory = async (parent, category) => {
        console.log(this.props.category1[parent], parent)
        await this.setState({ page: 0, main_category: this.props.category1[parent], sub_category: category, this_category: category })
        this.props.GetDesignListCountRequest(this.state.main_category.value, category.value)
        this.reloadData()
    }
    handleChangeOrderOps = async (order) => {
        await this.setState({ page: 0, this_order: order })
        this.reloadData()
    }
    reloadData = () => {
        this.props.GetDesignListRequest(this.state.page, this.state.this_order.keyword, this.state.main_category.value || null, this.state.sub_category.value || null, this.state.search)
        console.log("clicked, and will request as below\n", this.state.page, this.state.this_order.keyword, this.state.main_category.value, this.state.sub_category.value, this.state.search)
    }
    getList = async () => {
        await this.setState({ page: this.state.page + 1 })
        const { page, main_category, sub_category, keyword, order } = this.state
        return this.props.GetDesignListRequest(page, order, main_category.value, sub_category.value, keyword)
    }

    render() {
        const { this_category, page, this_order } = this.state
        const { category1, category2 } = this.props
        const { width, height, marginRight, marginRightLast, marginBottom, marginBottomLast } = margin

        return (<>
            <Category subcategory_clicked={this.handleChangeSubCategory} category_clicked={this.handleChangeCategory} list={category1} sublist={category2} />
            <TextWrapper>{(this_category && this_category.text === "전체" ? "디자인" : this_category.text) || "디자인"}&nbsp;({this.props.Count || "-"})</TextWrapper>
            <OrderOption order_clicked={this.handleChangeOrderOps} selected={this_order} />
            <div style={{ paddingTop: "30px", paddingBottom: "68px" }}>
                {this.props.status === "INIT" ?
                    <Loading /> :
                    <ScrollList cols={5}
                        width={width} height={height} marginRight={marginRight} marginBottom={marginBottom} marginRightLast={marginRightLast} marginBottomLast={marginBottomLast}
                        page={page} ListComponent={Design} dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} getListRequest={this.getList} />}
            </div>
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        dataList: state.DesignList.status.DesignList,
        dataListAdded: state.DesignList.status.DesignListAdded,
        category1: state.Category.status.category1,
        category2: state.Category.status.category2,
        Count: state.DesignList.status.Count,
        status: state.DesignList.status
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetDesignListRequest: (page, sort, cate1, cate2, keyword) => {
            return dispatch(GetDesignListRequest(page, sort, cate1, cate2, keyword))
        },
        GetDesignListCountRequest: (cate1, cate2) => {
            return dispatch(GetDesignListCountRequest(cate1, cate2))
        },
        GetCategoryListRequest: () => {
            return dispatch(GetCategoryListRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignListPage)
