import React, { Component } from 'react';
import styled from 'styled-components'

//component
import ScrollList from "components/Commons/ScrollList"
import Loading from 'components/Commons/Loading'
import opendesign_style from 'opendesign_style';
import NumberFormat from 'modules/NumberFormat';
import OrderOption from "components/Commons/OrderOption";

//css
const Wrapper = styled.div`
    margin-top: ${28}px;
    // margin-left: ${100 + 38}px;
    margin-left: 38px;
    margin-right: 38px;

    // *{border: 1px solid red;}

    .menu-container {
        max-width: 1737px;
        min-width: 1000px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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
`;
const TabMenu = styled.div`
    display: flex;
    justify-content: space-start;

    .tab {
        text-align: center;
        font-weight: medium;
        font-size: 28px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        cursor: pointer;
        color: #000000;
        
        margin-left: 43px;
        :first-child{
            margin-left: 21px;
        }
    }
    .selected { 
        color: #FF0000; 
    }
`;

class MypageBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*reload: false,*/
            this_order: { text: "최신순", keyword: "update" },
            orders: [{ text: "최신순", keyword: "update" }, { text: "최신순", keyword: "update" }, { text: "최신순", keyword: "update" },],
            cateIndex: 0,
        };
    };
    handleReload = () => {
        this.setState({ reload: false });
    };
    componentDidMount() {
        this.getInitData();
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.Count !== this.props.Count) {
            this.setTab(nextProps.Count);
        }
    };
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
    };
    getInitData() {
        this.getLikeGroupList(0);
        this.getLikeDesignList(0);
        this.getLikeDesignerList(0);
        this.getMyDesignListRequest(0);
        this.getMyGroupListRequest(0);
        this.getRelatedGroupInDesignerRequest(0);
    };
    getLikeDesignList = async (page) => {
        this.props.id && this.props.GetLikeInDesignerRequest(this.props.id, page, this.state.orders[0].keyword);
    };
    getLikeDesignerList = async (page) => {
        this.props.id && this.props.GetLikeDesignerInDesignerRequest(this.props.id, page, this.state.orders[2].keyword);
    };
    getLikeGroupList = async (page) => {
        this.props.id && this.props.GetLikeGroupInDesignerRequest(this.props.id, page, this.state.orders[1].keyword);
    };
    getMyGroupListRequest = async (page) => {
        this.props.id && this.props.GetGroupInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
    };
    getMyDesignListRequest = async (page) => {
        this.props.id && this.props.GetMyDesignInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
    };
    getRelatedGroupInDesignerRequest = async (page) => {
        this.props.id && this.props.GetRelatedGroupInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
    };
    changeCategory = (index) => {
        this.setState({ cateIndex: index, this_order: { text: "최신순", keyword: "update" } });
    };
    handleChangeOrderOps = async (order, getfunc) => {
        await this.setState({ this_order: order });
        getfunc(0);
    }
    handleChangeSubOrder = async (num, order, getfunc) => {
        let copy = [...this.state.orders];
        await copy.splice(num, 1, order);
        console.log(copy);
        await this.setState(copy);
        getfunc(0);
    };

    render() {
        const { Count, MyLikeDesign, MyLikeDesigner, MyLikeDesignAdded, MyLikeDesignerAdded, MyGroup, MyGroupAdded, MyDesign, MyDesignAdded, MyLikeGroup, MyLikeGroupAdded, RelatedGroup, RelatedGroupAdded } = this.props;
        const { this_order } = this.state;

        console.log(this.props, this.state);

        return (<Wrapper>

            <div className="menu-container">
                <TabMenu>
                    {/* ({NumberFormat(Count.total_group || 0)}) ({NumberFormat(Count.joined_group || 0)})({NumberFormat(Count.total_design || 0) + (Count.joined_design || 0)})({NumberFormat(Count.total_favorite || 0)})*/}
                    <a onClick={() => this.changeCategory(4)}><div className={`tab ${this.state.cateIndex === 4 ? "selected" : ""}`}>경험</div></a>
                    <a onClick={() => this.changeCategory(0)}><div className={`tab ${this.state.cateIndex === 0 ? "selected" : ""}`}>그룹</div></a>
                    <a onClick={() => this.changeCategory(1)}><div className={`tab ${this.state.cateIndex === 1 ? "selected" : ""}`}>참여그룹</div></a>
                    <a onClick={() => this.changeCategory(2)}><div className={`tab ${this.state.cateIndex === 2 ? "selected" : ""}`}>디자인</div></a>
                    <a onClick={() => this.changeCategory(3)}><div className={`tab ${this.state.cateIndex === 3 ? "selected" : ""}`}>관심항목</div></a>
                </TabMenu>

                {this.state.cateIndex === 0 && <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyGroupListRequest)} selected={this_order} />}
                {this.state.cateIndex === 1 && <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getRelatedGroupInDesignerRequest)} selected={this_order} />}
                {this.state.cateIndex === 2 && <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyDesignListRequest)} selected={this_order} />}

            </div>

            {this.state.cateIndex === 4 &&
                <div>
                    { }
                </div>}

            {this.state.cateIndex === 0 &&
                <div style={{ paddingTop: "37px" }}>
                    {this.props.status === "INIT"
                        ? <Loading />
                        : <ScrollList {...opendesign_style.group_margin} type="group" dataList={MyGroup} dataListAdded={MyGroupAdded} getListRequest={this.getMyGroupListRequest} />}
                </div>}

            {this.state.cateIndex === 1 &&
                <div style={{ paddingTop: "37px" }}>
                    {this.props.status === "INIT"
                        ? <Loading />
                        : <ScrollList {...opendesign_style.group_margin} type="group" dataList={RelatedGroup} dataListAdded={RelatedGroupAdded} getListRequest={this.getRelatedGroupInDesignerRequest} />}
                </div>}

            {this.state.cateIndex === 2 &&
                <div style={{ paddingTop: "37px" }}>
                    {this.props.status === "INIT"
                        ? <Loading />
                        : <ScrollList {...opendesign_style.design_margin} type="design" dataList={MyDesign} dataListAdded={MyDesignAdded} getListRequest={this.getMyDesignListRequest} />
                    }
                </div>}

            {this.state.cateIndex === 3 &&
                <div style={{ paddingTop: "37px" }}>
                    {Count.like_design > 0
                        ? <React.Fragment>
                            <div className="interested">관심있는 디자인({NumberFormat(Count.like_design)})</div>
                            {this.props.status === "INIT"
                                ? <Loading />
                                : <ScrollList manual {...opendesign_style.design_margin} type="design" dataList={MyLikeDesign} dataListAdded={MyLikeDesignAdded} getListRequest={this.getLikeDesignList} />}
                        </React.Fragment>
                        : null}
                    {Count.like_group > 0
                        ? <React.Fragment>
                            <div className="interested">관심있는 그룹({NumberFormat(Count.like_group)})</div>
                            {this.props.status === "INIT"
                                ? <Loading />
                                : <ScrollList manual {...opendesign_style.group_margin} type="group" dataList={MyLikeGroup} dataListAdded={MyLikeGroupAdded} getListRequest={this.getLikeGroupList} />}
                        </React.Fragment>
                        : null}

                    {Count.like_designer > 0
                        ? <React.Fragment>
                            <div className="interested">관심있는 디자이너({NumberFormat(Count.like_designer)})</div>
                            {this.props.status === "INIT"
                                ? <Loading />
                                : <ScrollList manual {...opendesign_style.designer_margin} type="designer" dataList={MyLikeDesigner} dataListAdded={MyLikeDesignerAdded} getListRequest={this.getLikeDesignerList} />}
                        </React.Fragment>
                        : null}
                </div>}

        </Wrapper>);
    };
};

export default MypageBody;

{/* <MypageBodyComp>
                <div className="MypageCategory"></div>

                {this.state.cateIndex === 0 &&
                    <div className="compWrapper" style={{ paddingTop: "37px" }}>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <div>
                            </div>}
                    </div>}

                {this.state.cateIndex === 1 &&
                    <div className="compWrapper" style={{ paddingTop: "37px" }}>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <div>
                                <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.)} selected={this_order} />
                                <ScrollList {...opendesign_style.group_margin} type="group" dataList={RelatedGroup} dataListAdded={RelatedGroupAdded} getListRequest={this.getRelatedGroupInDesignerRequest} />
                            </div>}
                    </div>}

                {this.state.cateIndex === 2 &&
                    <div className="compWrapper" style={{ paddingTop: "37px" }}>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <div>
                                <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.)} selected={this_order} />
                                <ScrollList {...opendesign_style.design_margin} type="design" dataList={MyDesign} dataListAdded={MyDesignAdded} getListRequest={this.getMyDesignListRequest} />
                            </div>}
                    </div>}

                {this.state.cateIndex === 3 &&
                    <div className="compWrapper">
                        <div className="interested">관심있는 디자인({NumberFormat(Count.like_group)})</div>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList manual {...opendesign_style.design_margin} type="design" dataList={MyLikeDesign} dataListAdded={MyLikeDesignAdded} getListRequest={this.getLikeDesignList} />
                        }
                        <div className="interested">관심있는 그룹({NumberFormat(Count.like_design)})</div>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList manual {...opendesign_style.group_margin} type="group" dataList={MyLikeGroup} dataListAdded={MyLikeGroupAdded} getListRequest={this.getLikeGroupList} />
                        }
                        <div className="interested">관심있는 디자이너({NumberFormat(Count.like_designer)})</div>

                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList manual {...opendesign_style.designer_margin} type="designer" dataList={MyLikeDesigner} dataListAdded={MyLikeDesignerAdded} getListRequest={this.getLikeDesignerList} />
                        }
                    </div>}
            </MypageBodyComp>
        
        const MypageBodyComp = styled.div`
    padding-bottom:50px;
    font-family: Noto Sans KR;
    .MypageCategory{
       
    }}
    .selectedCate {
        opacity: 1.0;
    }
    .unSelectedCate {
        opacity: 0.5;
    }

    .interested-first-scroll {
        padding-top: 15px;
    }
`;
 */}