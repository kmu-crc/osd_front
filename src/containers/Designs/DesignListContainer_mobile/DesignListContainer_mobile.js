import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest, GetDesignListCountRequest } from "redux/modules/design";
import { GetCategoryAllRequest } from "redux/modules/category";
import Category from "components/Commons/Category";
import OrderOption_mobile from "components/Commons/OrderOption_mobile";
import ScrollList_mobile from "components/Commons/ScrollList_mobile";
import Loading from "components/Commons/Loading";
import styled from 'styled-components';
import opendesign_mobile_style from "opendesign_mobile_style";

const Wrapper = styled.div`
  width:100%;
  display:flex;
  padding-left:10px;
  .contentBox{
    max-width:354px;
  }
  .header_box{
    width:100%;
    padding-right:10px;
    display:flex;
    justify-content:space-between;
    margin-bottom:5px;
    .category_name{
      font-family:Spoqa Han Sans Neo;
      font-size:12px;
      font-weight:500;
      color:#1262AB;
    }
  }
  .scroll_wrapper{
    width:100%;
  }
`

class DesignListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: false, screenWidth: window.innerWidth,
      this_order: this.props.sort == "like" ? { text: "인기순", keyword: "like" } : { text: "등록순", keyword: "update" },
      this_category: { text: null, value: null },
      main_category: { text: null, value: null }, sub_category: { text: null, value: null }, third_category:{text:null,value:null},
      category2: [],
    };
    this.handleReload = this.handleReload.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeSubCategory = this.handleChangeSubCategory.bind(this);
    this.handleChangeThirdCategory = this.handleChangeThirdCategory.bind(this);
    this.handleChangeOrderOps = this.handleChangeOrderOps.bind(this);
    this.getList = this.getList.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.props.GetCategoryAllRequest()
      .then(() => { this.props.GetDesignListCountRequest(this.props.cate1, this.props.cate2, this.props.cate3) });
    this.props.GetDesignListRequest(0, this.props.sort, this.props.cate1, this.props.cate2,this.props.cate3, null);
    window.addEventListener("resize", this.handleResize, false);

  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  };
  componentWillUpdate(nextProps) {
    if (this.props.category1 !== nextProps.category1) {
      let main_category = { text: "", value: "" };
      nextProps.category1.map((item, index) => {
        if (this.props.cate1 == item.value) {
          main_category.text = item.text;
          main_category.value = item.value;
        }
      })
      this.setState({ main_category: main_category, this_category: main_category });
    }
    if (this.props.category2 !== nextProps.category2) {
      let sub_category = { text: null, value: null };
      let nCount = 0;
      let nParent = -1;
      this.props.cate1 && nextProps.category1.map((item, index) => {
        if (this.props.cate1 == item.value) {
          nParent = nCount;
        }
        nCount++;
      })
      nParent != -1 && nextProps.category2[nParent].map((item, index) => {
        if (this.props.cate2 == item.value) {
          sub_category.text = item.text;
          sub_category.value = item.value;
          sub_category.parent = nParent;
        }
      })
      this.setState({ sub_category: sub_category, category2: nextProps.category2[nParent] });
      if (this.props.cate2 !== null) {
        this.setState({ this_category: sub_category });
      }
    }

    if (this.props.category3 !== nextProps.category3) {
      let third_category = {text:null,value:null};
      let nCount=0;
      let nParent;
      for(let i in nextProps.category2){
        nextProps.category2&&nextProps.category2[i]&&nextProps.category2[i].map((item,index)=>{
          if(this.props.cate2==item.value){
            nParent = nCount;
          }
          nCount++;
        })
      }
      nParent != -1 &&nextProps.category3[nParent]&&nextProps.category3[nParent].map((item, index) => {
        if (this.props.cate3 == item.value) {
          third_category.text = item.text;
          third_category.value = item.value;
          third_category.parent = nParent;
        }
      })
      this.setState({ third_category: third_category, category3: nextProps.category3[nParent] });
      if (this.props.cate3 !== null) {
        this.setState({ this_category: third_category });
      }
    }


  }
  handleResize() {
    this.setState({ screenWidth: window.innerWidth })
  }
  handleReload() {
    this.setState({ reload: !this.state.reload });
  }
  async handleChangeCategory(category) {
    await this.setState({ main_category: category, this_category: category, sub_category: { text: null, value: null } })
    this.props.GetDesignListCountRequest(category.value, null, null);
    this.handleReload();
    this.getList(0);
    const orderkeyword = this.props.sort == null ? "update" : `${this.props.sort}`;

    window.location.href = "/design" + `/${orderkeyword}` + "/" + category.value;
  }
  async handleChangeSubCategory(parent, category) {
    console.log("handleChangeSubCategory:::::",category);
    await this.setState({ main_category: parent, this_category: category, sub_category: category });
    this.props.GetDesignListCountRequest(this.state.main_category.value, category.value, null);
    this.handleReload();
    this.getList(0);
    const orderkeyword = this.props.sort == null ? "update" : `${this.props.sort}`;

    window.location.href = "/design" + `/${orderkeyword}` + "/" + parent.value + "/" + category.value;
  }
  async handleChangeThirdCategory(old_parent,parent,category){
    console.log(old_parent,parent,category.value);
    await this.setState({ main_category: old_parent, this_category: category, sub_category: parent, third_category:category });
    this.props.GetDesignListCountRequest(this.state.main_category.value, this.state.sub_category.value, category.value);
    this.handleReload();
    this.getList(0);
    const orderkeyword = this.props.sort == null ? "update" : `${this.props.sort}`;
    window.location.href = "/design" + `/${orderkeyword}` + "/" + old_parent.value + "/" + parent.value+ "/" + category.value;
  }
  async handleChangeOrderOps(order) {
    await this.setState({ this_order: order })
    this.handleReload();
    this.getList(0);
    const orderkeyword = order.keyword == null ? "" : `/${order.keyword}`;
    const cate1 = this.props.cate1 == null ? "" : `/${this.props.cate1}`;
    const cate2 = this.props.cate2 == null ? "" : `/${this.props.cate2}`;
    window.location.href = "/design" + orderkeyword + cate1 + cate2;
    // console.log("/design"+orderkeyword+cate1+cate2);

  }
  async getList(page) {
    const { main_category, sub_category, third_category, keyword, this_order } = this.state;
    return this.props.GetDesignListRequest(page, this_order.keyword || null, main_category.value || null, sub_category.value || null, third_category.value||null ,keyword || null);
  }
  changeCategory(category) {
    if (this.state.this_category === category) {
      return;
    }
    this.handleChangeCategory(category);
  }

  render() {
    const { main_category, this_category, sub_category,third_category, reload, this_order } = this.state
    const { category1, category2, category3, Count, status } = this.props;
    return(
      <React.Fragment>
        <Wrapper>
          <div className="contentBox">
          <div className="header_box">
            <div style={{width:"67px"}}/>
            <div className="category_name">{(this_category && this_category.text === "전체" ? "디자인" : this_category.text) || "디자인"}&nbsp;({Count})</div>
            <OrderOption_mobile type="design" order_clicked={this.handleChangeOrderOps} selected={this_order} />
          </div>
          <div className="scroll_wrapper">
          {status === "INIT"
            ? <Loading />
            : <ScrollList_mobile {...opendesign_mobile_style.design_margin} reload={reload} handleReload={this.handleReload}
              type="design" dataList={this.props.DesignList} dataListAdded={this.props.DesignListAdded} getListRequest={this.getList} />}
          </div>
          </div>
        </Wrapper>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    DesignList: state.DesignList.status.DesignList,
    DesignListAdded: state.DesignList.status.DesignListAdded,
    userInfo: state.Authentication.status.userInfo,
    category1: state.Category.status.category1,
    category2: state.Category.status.category2,
    category3: state.Category.status.category3,
    Count: state.DesignList.status.Count,
    status: state.DesignList.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignListRequest: (page, sort, categoryLevel1, categoryLevel2, categoryLevel3) => {
      return dispatch(GetDesignListRequest(page, sort, categoryLevel1, categoryLevel2, categoryLevel3))
    },
    GetDesignListCountRequest: (category1, category2, category3) => {
      return dispatch(GetDesignListCountRequest(category1, category2, category3))
    },
    GetCategoryAllRequest: () => {
      return dispatch(GetCategoryAllRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignListContainer);

{/* <Wrapper>
  <div className="category_wrapper">
    <Category thirdcategory_clicked={this.handleChangeThirdCategory} subcategory_clicked={this.handleChangeSubCategory} category_clicked={this.handleChangeCategory}
    category1={category1} category2={this.state.category2} category3={this.state.category3} main_selected={main_category} sub_selected={sub_category} third_selected={third_category} />
  </div>

  <div className="content">
    <div className="header_box">
        <div className="category_title">{(this_category && this_category.text === "전체" ? "디자인" : this_category.text) || "디자인"}&nbsp;({Count})</div>
        <OrderOption order_clicked={this.handleChangeOrderOps} selected={this_order} />
    </div>
    <div className="scroll_wrapper">
    {status === "INIT"
      ? <Loading />
      : <ScrollList {...opendesign_style.design_margin} reload={reload} handleReload={this.handleReload}
        type="design" dataList={this.props.DesignList} dataListAdded={this.props.DesignListAdded} getListRequest={this.getList} />}
    </div>
  </div>
</Wrapper> */}
// const Wrapper = styled.div`
//   // margin-left:100px;
//   // margin-top:90px;
//   .category_wrapper{
//     width:100%;
//     padding-left:41px;
//     padding-top:19px;
//   }
//   .content{
//     padding-left:41px;
//     width:100%;
//   }
//   .scroll_wrapper{
//     margin-top:21px;
//     margin-bottom:100px;
//   }
//   .header_box{
//     width:100%;
//     display:flex;
//     justify-content:space-between;
//     align-items:center;
//     margin-top:13px;
//     padding-right:39px;
//     .category_title{
//       min-width:200px;
//       height:32px;
//       font-family:Spoqa Han Sans Neo;
//       font-weight:Medium;
//       font-size:24px;
//       color:#1262AB;
//       display:flex;
//       align-items:center;
//     }
//   }
// `