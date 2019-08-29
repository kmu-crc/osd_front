import React, { Component } from "react"
import { connect } from "react-redux"
import { GetDesignListRequest, GetDesignListCountRequest } from "redux/modules/design"
import { GetCategoryAllRequest } from "redux/modules/category"
import Category from "components/Commons/Category"
import OrderOption from "components/Commons/OrderOption"
import ScrollList from "components/Commons/ScrollList"
import Loading from "components/Commons/Loading"
import Design from "components/Designs/Design"
import styled from 'styled-components'

const TextWrapper = styled.div`
    position: relative;
    width: 1920px;
    top: 25px;
    text-align: center;
    font-size: 25px;
    font-family: Noto Sans KR;
    font-weight: 700;
    color: red;
    cursor: pointer;
`
const margin = { width: "330px", height: "330px", marginRight: "63px", marginBottom: "80px", marginRightLast: "8px", marginBottomLast: "68px" }
class DesignListContainer extends Component {
  state = {
    page: 0,
    search: null,
    this_category: { text: null, value: null },
    sub_category: { text: null, value: null },
    main_category: { text: null, value: null },
    this_order: { text: "등록순", keyword: "update" }
  }
  componentDidMount() {
    this.props.GetCategoryAllRequest()
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
    await this.setState({ page: 0, main_category: this.props.category1[parent], this_category: category, sub_category: category })
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
  changeCategory = (category) => {
    if (this.state.this_category === category) {
      return;
    }
    this.handleChangeCategory(category)
    // console.log(this.state)
  }
  render() {
    const { this_category, main_category, sub_category, page, this_order } = this.state
    const { category1, category2, Count, status } = this.props
    const { width, height, marginRight, marginRightLast, marginBottom, marginBottomLast } = margin;
    console.log(this_order);
    return (<>
      <Category
        subcategory_clicked={this.handleChangeSubCategory} category_clicked={this.handleChangeCategory}
        category1={category1} category2={category2[main_category.value]} main_selected={main_category} sub_selected={sub_category} />

      {/* <div style={{ height: "29px", zIndex: "999", transform: "translateY(-50%)" }}> */}
      <OrderOption order_clicked={this.handleChangeOrderOps} selected={this_order} />
      {/* </div> */}

      <TextWrapper onClick={() => this.changeCategory(main_category)}>{(this_category && this_category.text === "전체" ? "디자인" : this_category.text) || "디자인"}&nbsp;({Count})</TextWrapper>
      <div style={{ paddingTop: "128px", paddingBottom: "68px" }}>
        {status === "INIT"
          ? <Loading />
          : <ScrollList cols={5} width={width} height={height}
            marginRight={marginRight} marginRightLast={marginRightLast} marginBottom={marginBottom} marginBottomLast={marginBottomLast}
            page={page} ListComponent={Design} dataList={this.props.DesignList} dataListAdded={this.props.DesignListAdded} getListRequest={this.getList} />}
      </div>
    </>)
  }
}

const mapStateToProps = (state) => {
  return {
    DesignList: state.DesignList.status.DesignList,
    DesignListAdded: state.DesignList.status.DesignListAdded,
    userInfo: state.Authentication.status.userInfo,
    category1: state.Category.status.category1,
    category2: state.Category.status.category2,
    Count: state.DesignList.status.Count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignListRequest: (page, sort, categoryLevel1, categoryLevel2) => {
      return dispatch(GetDesignListRequest(page, sort, categoryLevel1, categoryLevel2))
    },
    GetDesignListCountRequest: (category1, category2) => {
      return dispatch(GetDesignListCountRequest(category1, category2))
    },
    GetCategoryAllRequest: () => {
      return dispatch(GetCategoryAllRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignListContainer);
