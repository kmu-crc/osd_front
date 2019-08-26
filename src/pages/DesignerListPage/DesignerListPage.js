import React, { Component } from 'react'
import Designer from "components/Designers/Designer";
import { GetDesignerListRequest, GetDesignerListCountRequest } from "redux/modules/designerlist"
import { GetCategoryListRequest } from "redux/modules/category"

import styled from 'styled-components'
import Category from "components/Commons/Category"
import OrderOption from "components/Commons/OrderOption"
import ScrollList from "components/Commons/ScrollList"
import Loading from "components/Commons/Loading"
import {connect} from "react-redux";


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


const margin = { width: "590px", height: "150px", marginRight: "63px", marginBottom: "80px", marginRightLast: "8px", marginBottomLast: "68px" }

class DesignerListPage extends Component {
    state = {
        page: 0,
        search: null,
        this_category: { text: null, value: null },
        sub_category: { text: null, value: null },
        main_category: { text: null, value: null },
        this_order: { text: "등록순", keyword: "update" },
        checkDataLength:0,
    }
    componentDidMount() {
         this.props.GetCategoryListRequest()
             .then(() => { this.props.GetDesignerListCountRequest() });
        this.props.GetDesignerListRequest(0, this.state.this_order.keyword)
    }
    handleChangeCategory = async (category) => {
        await this.setState({ page: 0, main_category: category, this_category: category, sub_category: { text: null, value: null } })
        //console.log("category.value:", category.value)
        this.props.GetDesignerListCountRequest(category.value || null)
        this.reloadData()
    }
    handleChangeSubCategory = async (parent, category) => {
        // console.log(this.props.category1[parent], parent)
        await this.setState({ page: 0, main_category: this.props.category1[parent], this_category: this.props.category1[parent], sub_category: category })
        this.props.GetDesignerListCountRequest(this.state.main_category.value, category.value)
        this.reloadData()
    }
    handleChangeOrderOps = async (order) => {
        await this.setState({ page: 0, this_order: order })
        this.reloadData()
    }
    reloadData = () => {
        this.props.GetDesignerListRequest(this.state.page, this.state.this_order.keyword, this.state.main_category.value || null, this.state.sub_category.value || null, this.state.search)
    }
    getList = async () => {
        await this.setState({ page: this.state.page + 1 });
        const { page, main_category, sub_category, keyword, order } = this.state;

        return this.props.GetDesignerListRequest(page, order, main_category.value, sub_category.value, keyword);

    };
    changeCategory = (category) => {
        this.handleChangeCategory(category)
    }



    render() {
        const { this_category, sub_category, page, this_order } = this.state
        const { category1, category2, Count, status } = this.props
        const { width, height, marginRight, marginRightLast, marginBottom, marginBottomLast } = margin;
        return (
            <>
                <Category
                    subcategory_clicked={this.handleChangeSubCategory} category_clicked={this.handleChangeCategory}
                    category1={category1} category2={category2[this_category.value]} sub_selected={sub_category} />

                <OrderOption order_clicked = {this.handleChangeOrderOps} selected = {this_order}/>
                <TextWrapper onClick={() => this.changeCategory(this_category)}>{(this_category && this_category.text === "전체" ? "디자이너" : this_category.text) || "디자이너"}&nbsp;({Count || "-"})</TextWrapper>
                <div style = {{position:"relative"}}><JoinDesigner onClick = {()=>this.handleClickJoin()}>디자이너 등록하기</JoinDesigner></div>
                <div style={{ paddingTop: "100px", paddingBottom: "68px" }}>
                    {status === "INIT"
                        ? <Loading />
                        : <ScrollList cols={3} width={width} height={height}
                                      marginRight={marginRight} marginRightLast={marginRightLast} marginBottom={marginBottom} marginBottomLast={marginBottomLast}
                                      page={page} ListComponent={Designer} dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} getListRequest={this.getList} />}
                </div>
            </>
        )

    }
}


const mapStateToProps = (state) => {
    // console.log("designerlist:", state)
    return {
        dataList: state.designerlist.status.DesignerList,
        dataListAdded: state.designerlist.status.DesignerListAdded,
        category1: state.category.status.category1,
        category2: state.category.status.category2,
        Count: state.designerlist.status.Count,
        status: state.designerlist.status
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetDesignerListRequest: (page, sort, cate1, cate2, keyword) => {
            return dispatch(GetDesignerListRequest(page, sort, cate1, cate2, keyword))
        },
        GetDesignerListCountRequest: (cate1, cate2) => {
            return dispatch(GetDesignerListCountRequest(cate1, cate2))
        },
        GetCategoryListRequest: () => {
            return dispatch(GetCategoryListRequest())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignerListPage)
