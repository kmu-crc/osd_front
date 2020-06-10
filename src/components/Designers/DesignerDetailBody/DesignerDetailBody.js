import React, { Component } from 'react';
import styled from 'styled-components'

//component
import ScrollList from "components/Commons/ScrollList"
import Loading from 'components/Commons/Loading'
import opendesign_style from "opendesign_style";
import NumberFormat from 'modules/NumberFormat';
import OrderOption from "components/Commons/OrderOption";

//css
const DesignerDetailBody = styled.div`
    font-family: Noto Sans KR;
    padding-bottom:50px;
    .MypageCategory{
        display: flex;
        justifyContent: space-start;
        font-size: 20px;
        color: #707070;
    }
    .selectedCate {
        opacity: 1.0;
    }
    .compWrapper {
        padding-top: 35px;
        padding-bottom: 15px;
    }
    .interested {
        font-size: ${opendesign_style.font.size.heading2};
        line-height: ${opendesign_style.font.size.heading2};
        text-align: center;
        margin-top: 42px;
        margin-bottom: 42px;
        color: #707070;
        position: relative;
        margin: auto;
        padding-top: 42px;
        padding-bottom: 42px;
    }
    .interested-first-scroll {
        padding-top: 15px;
    }
`;
const CategoryItems = styled.div`
    padding-left: ${props => props.paddingLeft}px;
    padding-top: ${props => props.paddingTop}px;
    opacity: ${props => props.opacity};
    cursor: pointer;
    @media only screen and (min-width: ${opendesign_style.resolutions.SmallMinWidth}px) 
    and (max-width: ${opendesign_style.resolutions.SmallMaxWidth}px) {
      font-size: 15px;
      width: max-content;
      margin: 0px;
      padding: 13px;
    }
`;

class DesignerPageBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: false,
            cateIndex: 0,
            this_order: { text: "최신순", keyword: "update" },
        };
        this.handleReload = this.handleReload.bind(this);
        this.getInitData = this.getInitData.bind(this);
        this.setTab = this.setTab.bind(this);
        this.getMyDesignInDesignerRequest = this.getMyDesignInDesignerRequest.bind(this);
        this.getGroupInDesignerRequest = this.getGroupInDesignerRequest.bind(this);
        this.getRelatedGroupInDesignerRequest = this.getRelatedGroupInDesignerRequest.bind(this);
        this.getLikeInDesignerRequest = this.getLikeInDesignerRequest.bind(this);
        this.getLikeGroupInDesignerRequest = this.getLikeGroupInDesignerRequest.bind(this);
        this.getLikeDesignerInDesignerRequest = this.getLikeDesignerInDesignerRequest.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.handleChangeOrderOps = this.handleChangeOrderOps.bind(this);

    }
    handleReload = () => {
        this.setState({ reload: false });
    }
    componentWillMount() {
        this.getInitData();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.Count !== this.props.Count) {
            this.setTab(nextProps.Count);
        }
    }
    setTab = (props) => {
        const { total_design, total_group, joined_group, total_favorite } = props;
        // console.log("index", props);
        let tabindex = 0;
        if (total_group === 0) {
            tabindex = 1;
        }
        if (total_group === 0 && joined_group === 0) {
            tabindex = 2;
        }
        if (total_group === 0 && joined_group === 0 && total_design === 0) {
            tabindex = 3;
        }
        if (total_group === 0 && joined_group === 0 && total_design === 0 && total_favorite === 0) {
            tabindex = 0;
        }
        if (total_group !== 0 && joined_group === 0 && total_design !== 0 && total_favorite !== 0) {
            tabindex = 0;
        }
        this.setState({ cateIndex: tabindex });
    }
    getInitData() {
        this.getMyDesignInDesignerRequest(0);
        this.getGroupInDesignerRequest(0);
        this.getRelatedGroupInDesignerRequest(0);
        this.getLikeInDesignerRequest(0);
        this.getLikeGroupInDesignerRequest(0);
        this.getLikeDesignerInDesignerRequest(0);
    }
    getMyDesignInDesignerRequest = async (page) => {
        this.props.id && this.props.GetMyDesignInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
    }
    getGroupInDesignerRequest = async (page) => {
        this.props.id && this.props.GetGroupInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
    }
    getRelatedGroupInDesignerRequest = async (page) => {
        this.props.id && this.props.GetRelatedGroupInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
    }
    getLikeInDesignerRequest = async (page) => {
        this.props.id && this.props.GetLikeInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
    }
    getLikeGroupInDesignerRequest = async (page) => {
        this.props.id && this.props.GetLikeGroupInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
    }
    getLikeDesignerInDesignerRequest = async (page) => {
        this.props.id && this.props.GetLikeDesignerInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
    }
    changeCategory = (index) => {
        this.setState({ cateIndex: index, this_order: { text: "최신순", keyword: "update" } });
    }
    handleChangeOrderOps = async (order, getfunc) => {
        await this.setState({ this_order: order });
        getfunc(0);
    }
    render() {
        const { Count, MyDesignInDesigner, MyDesignInDesignerAdded, GroupInDesigner, GroupInDesignerAdded, RelatedGroupInDesigner, RelatedGroupInDesignerAdded,
            LikeInDesigner, LikeInDesignerAdded, LikeGroupInDesigner, LikeGroupInDesignerAdded, LikeDesignerInDesigner, LikeDesignerInDesignerAdded } = this.props;
        const { reload, this_order } = this.state;
        return (
            <DesignerDetailBody>
                <div className="MypageCategory">
                    <CategoryItems paddingTop={42} paddingLeft={42} opacity={this.state.cateIndex === 0 ? "1.0" : "0.5"} onClick={() => this.changeCategory(0)}>그룹({NumberFormat(Count.total_group || 0)})</CategoryItems>
                    <CategoryItems paddingTop={42} paddingLeft={42} opacity={this.state.cateIndex === 1 ? "1.0" : "0.5"} onClick={() => this.changeCategory(1)}>참여그룹({NumberFormat(Count.joined_group || 0)})</CategoryItems>
                    <CategoryItems paddingTop={42} paddingLeft={42} opacity={this.state.cateIndex === 2 ? "1.0" : "0.5"} onClick={() => this.changeCategory(2)}>디자인({NumberFormat((Count.total_design || 0) + (Count.joined_design || 0))})</CategoryItems>
                    <CategoryItems paddingTop={42} paddingLeft={42} opacity={this.state.cateIndex === 3 ? "1.0" : "0.5"} onClick={() => this.changeCategory(3)}>관심항목({NumberFormat(Count.total_favorite || 0)})</CategoryItems>
                </div>

                {this.state.cateIndex === 0 &&
                    <div className="compWrapper" >
                        {this.props.status === "INIT" ? <Loading /> :
                            <div>
                                <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getGroupInDesignerRequest)} selected={this_order} />
                                <ScrollList {...opendesign_style.group_margin} handleReload={this.handleReload} reloader={reload} type="group"
                                    dataList={GroupInDesigner} dataListAdded={GroupInDesignerAdded} getListRequest={this.getGroupInDesignerRequest} />
                            </div>}
                    </div>}

                {this.state.cateIndex === 1 &&
                    <div className="compWrapper" >
                        {this.props.status === "INIT" ? <Loading /> :
                            <div>
                                <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getRelatedGroupInDesignerRequest)} selected={this_order} />
                                <ScrollList {...opendesign_style.group_margin} handleReload={this.handleReload} reloader={reload} type="group"
                                    dataList={RelatedGroupInDesigner} dataListAdded={RelatedGroupInDesignerAdded} getListRequest={this.getRelatedGroupInDesignerRequest} />
                            </div>}
                    </div>}

                {this.state.cateIndex === 2 &&
                    <div className="compWrapper" >
                        {this.props.status === "INIT" ? <Loading /> :
                            <div>
                                <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyDesignInDesignerRequest)} selected={this_order} />
                                <ScrollList {...opendesign_style.design_margin} handleReload={this.handleReload} reloader={reload} type="design"
                                    dataList={MyDesignInDesigner} dataListAdded={MyDesignInDesignerAdded} getListRequest={this.getMyDesignInDesignerRequest} />
                            </div>}
                    </div>}

                {this.state.cateIndex === 3 &&
                    <div className="compWrapper">
                        <div className="interested first">관심있는 그룹({NumberFormat(Count.like_group)})</div>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.group_margin} handleReload={this.handleReload} reloader={reload}
                                manual type="group" dataList={LikeGroupInDesigner} dataListAdded={LikeGroupInDesignerAdded} getListRequest={this.getLikeGroupInDesignerRequest} />
                        }

                        <div className="interested second">관심있는 디자인({NumberFormat(Count.like_design)})</div>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.design_margin} handleReload={this.handleReload} reloader={reload}
                                manual type="design" dataList={LikeInDesigner} dataListAdded={LikeInDesignerAdded} getListRequest={this.getLikeInDesignerRequest} />
                        }

                        <div className="interested third">관심있는 디자이너({NumberFormat(Count.like_designer)})</div>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.designer_margin} handleReload={this.handleReload} reloader={reload}
                                manual type="designer" dataList={LikeDesignerInDesigner} dataListAdded={LikeDesignerInDesignerAdded} getListRequest={this.getLikeDesignerInDesignerRequest} />
                        }

                    </div>
                }
            </DesignerDetailBody >
        )
    }
}

export default DesignerPageBody;