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
import opendesign_style from "opendesign_style";

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
class DesignListContainer extends Component {
  state = {
    reload: false,
    search: null,
    this_category: { text: null, value: null },
    sub_category: { text: null, value: null },
    main_category: { text: null, value: null },
    this_order: { text: "등록순", keyword: "update" }
  }
  componentDidMount() {
    // this.props.GetCategoryAllRequest()
    this.getList(0);
    this.props.GetCategoryAllRequest()
      .then(() => { this.props.GetDesignListCountRequest() });
    this.props.GetDesignListCountRequest(0, this.state.this_order.keyword)
  }
  handleReload = () => {
    this.setState({ reload: !this.state.reload });
  }
  handleChangeCategory = async (category) => {
    await this.setState({ main_category: category, this_category: category, sub_category: { text: null, value: null } })
    this.props.GetDesignListCountRequest(category.value, null);
    this.handleReload();
    this.getList(0);
  }
  handleChangeSubCategory = async (parent, category) => {
    await this.setState({ main_category: this.props.category1[parent], this_category: category, sub_category: category })
    this.props.GetDesignListCountRequest(this.state.main_category.value, category.value)
    this.handleReload();
    this.getList(0);
  }

  handleChangeOrderOps = async (order) => {
    await this.setState({ this_order: order })
    this.handleReload();
    this.getList(0);
  }

  getList = async (page) => {
    const { main_category, sub_category, keyword, this_order } = this.state;
    this.props.GetDesignListRequest(page, this_order.keyword, main_category.value, sub_category.value, keyword);
  };
  changeCategory = (category) => {
    if (this.state.this_category === category) {
      return;
    }
    this.handleChangeCategory(category);
    // console.log(this.state)
  }
  render() {
    const { this_category, main_category, sub_category, reload, this_order } = this.state
    const { category1, category2, Count, status } = this.props
    return (<>
      <Category
        subcategory_clicked={this.handleChangeSubCategory} category_clicked={this.handleChangeCategory}
        category1={category1} category2={category2[main_category.value + 1]} main_selected={main_category} sub_selected={sub_category} />

      <OrderOption order_clicked={this.handleChangeOrderOps} selected={this_order} />

      <TextWrapper onClick={() => this.changeCategory(main_category)}>{(this_category && this_category.text === "전체" ? "디자인" : this_category.text) || "디자인"}&nbsp;({Count})</TextWrapper>
      <div style={{ paddingTop: "128px", paddingBottom: "68px" }}>
        {status === "INIT"
          ? <Loading />
          : <ScrollList {...opendesign_style.design_margin} reload={reload} handleReload={this.handleReload}
            ListComponent={Design} dataList={this.props.DesignList} dataListAdded={this.props.DesignListAdded} getListRequest={this.getList} />}
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
