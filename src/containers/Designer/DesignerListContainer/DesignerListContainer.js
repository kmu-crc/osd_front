import React, { Component } from 'react'
import { GetDesignerListRequest, GetDesignerTotalCountRequest } from "redux/modules/designer"
import { GetCategoryAllRequest } from "redux/modules/category"

import styled from 'styled-components'
import Category from "components/Commons/Category"
import OrderOption from "components/Commons/OrderOption"
import ScrollList from "components/Commons/ScrollList"
import Loading from "components/Commons/Loading"
import { connect } from "react-redux";
import opendesign_style from 'opendesign_style';

const TextWrapper = styled.div`
    top: 25px;
    font-size: 25px;
    font-family: Noto Sans KR;
    font-weight: 700;
    color: red;
    cursor: pointer;
    margin-top:100px;
    @media only screen and (max-width : 900px) {
      margin-top:150px;
      
    }
    .title{
    width:300px;
    text-align:center;
    position:absolute;
    @media only screen {
        right:${props => (props.centerPos - 300) / 2}px;
  }
}
`;
const JoinDesigner = styled.div`
    position: relative;
    left: 1724px;
    width:max-content;
    text-align: left;
    font-size: 20px;
    cursor: pointer;
    font-family: Noto Sans KR;
    font-weight:500;
    color: red;
    line-height: 29px;
    border-bottom: 1.5px solid red;
`;
const JoinDesignerContainer = styled.div`
    position: relative;
`;
const ScrollListContainer = styled.div`
    padding-top: 100px;
    padding-bottom: 68px;
`;
class DesignerListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: window.innerWidth,
            reload: false,
            this_order: { text: "최신순", keyword: "update" },
            this_category: { text: null, value: null },
            main_category: { text: null, value: null }, sub_category: { text: null, value: null },
        };
        this.handleReload = this.handleReload.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeSubCategory = this.handleChangeSubCategory.bind(this);
        this.handleChangeOrderOps = this.handleChangeOrderOps.bind(this);
        this.getList = this.getList.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.handleCreateDesigner = this.handleCreateDesigner.bind(this);
        this.handleResize = this.handleResize.bind(this);

    }
    componentDidMount() {
        this.props.GetCategoryAllRequest()
            .then(() => { this.props.GetDesignerTotalCountRequest() });
        this.props.GetDesignerListRequest(0, this.state.this_order.keyword)
        window.addEventListener("resize", this.handleResize, false);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize, false);
    };
    handleReload() {
        this.setState({ reload: !this.state.reload });
    }
    handleResize() {
        this.setState({ screenWidth: window.innerWidth })
    }
    async handleChangeCategory(category) {
        await this.setState({ main_category: category, this_category: category, sub_category: { text: null, value: null } })
        this.props.GetDesignerTotalCountRequest(category.value, null);
        this.handleReload();
        this.getList(0);
    }
    async handleChangeSubCategory(parent, category) {
        await this.setState({ main_category: parent, this_category: category, sub_category: category });
        this.props.GetDesignerTotalCountRequest(this.state.main_category.value, category.value);
        this.handleReload();
        this.getList(0);
    }
    async handleChangeOrderOps(order) {
        await this.setState({ this_order: order })
        this.handleReload();
        this.getList(0);
    }
    async getList(page) {
        const { main_category, sub_category, keyword, this_order } = this.state;
        this.props.GetDesignerListRequest(page, this_order.keyword, main_category.value, sub_category.value, keyword);
    }
    changeCategory(category) {
        if (this.state.this_category === category) {
            return;
        }
        this.handleChangeCategory(category)
    }
    handleCreateDesigner() {
        let href = window.location.href.substring(0, window.location.href.search("designer"))
        window.location.href = href + 'createdesigner';
    }

    render() {
        const { this_category, main_category, sub_category, reload, this_order } = this.state
        const { category1, category2, Count, status } = this.props
        return (<React.Fragment>
            <Category subcategory_clicked={this.handleChangeSubCategory} category_clicked={this.handleChangeCategory}
                category1={category1} category2={category2[category1.indexOf(main_category)]} main_selected={main_category} sub_selected={sub_category} />

            <TextWrapper centerPos={this.state.screenWidth} onClick={() => this.changeCategory(main_category)}>
                <div className="title">{(this_category && this_category.text === "전체" ? "디자이너" : this_category.text) || "디자이너"}&nbsp;({Count})</div>
            </TextWrapper>

            <JoinDesignerContainer>
                <JoinDesigner onClick={() => this.handleCreateDesigner()}>디자이너 등록하기</JoinDesigner>
            </JoinDesignerContainer>

            <div style={{ width: "100%", marginTop: "50px",  height: "1px", position: "relative" }}>
                <OrderOption order_clicked={this.handleChangeOrderOps} selected={this_order} />
            </div>

            <ScrollListContainer>
                {status === "INIT"
                    ? <Loading />
                    : <ScrollList {...opendesign_style.designer_margin} reload={reload} handleReload={this.handleReload}
                        type="designer" dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} getListRequest={this.getList} />}
            </ScrollListContainer>
        </React.Fragment>)
    }
}

const mapStateToProps = (state) => {
    return {
        dataList: state.DesignerList.status.DesignerList,
        dataListAdded: state.DesignerList.status.DesignerListAdded,
        category1: state.Category.status.category1,
        category2: state.Category.status.category2,
        Count: state.DesignerList.status.Count,
        status: state.DesignerList.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetDesignerListRequest: (page, sort, cate1, cate2, keyword) => {
            return dispatch(GetDesignerListRequest(page, sort, cate1, cate2, keyword))
        },
        GetDesignerTotalCountRequest: (cate1, cate2) => {
            return dispatch(GetDesignerTotalCountRequest(cate1, cate2))
        },
        GetCategoryAllRequest: () => {
            return dispatch(GetCategoryAllRequest())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignerListContainer)
