import React, { Component } from 'react';
import styled from 'styled-components'

//component
import ScrollList from "components/Commons/ScrollList"
import Loading from 'components/Commons/Loading'
import opendesign_style from 'opendesign_style';
import NumberFormat from 'modules/NumberFormat';
import OrderOption from "components/Commons/OrderOption";

const Wrapper = styled.div`
    margin-top: 28px;
    margin-left: 38px;
    // margin-right: 38px;
    max-width:1740px;
    min-width: ${1000 - (38 * 2)}px;

    // margin-left: ${100 + 38}px;
    // *{border: 1px solid red;}

    .menu-container {
        // max-width: 1737px;
        // min-width: 1000px;
        width:100%;
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
    .scroll-list {
        padding-top: 37px;
    }

    @media only screen and (max-width: 1000px) {
        width: 100vw;
    }
    @media only screen and (min-width: 1920px) {
        width:100vw;
    }

`;
const TabMenu = styled.div`
    display: flex;
    justify-content: space-start;

    .tab {
        text-align: center;
        font-weight: medium;
        font-size: 20px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        cursor: pointer;
        color: #000000;
        
        margin-right 43px;
        :first-child{
            margin-right: 21px;
        }
    }
    .selected { 
        color: red; 
    }
`;
const CareerListTable = styled.div`
    width: 100%;
    min-width: 1000px;
    max-width: 1737px;

    margin-top: 70px;

    // *{border: 1px solid red;}
    .head {
        padding-bottom: 18px;
        margin-bottom: 23px;
        border-bottom: 1px solid #707070;
    }
    .row {
        display: flex;
        flex-direction: row;
        margin-bottom: 58px;
        :last-child {
            margin-bottom: 0px;
        }
    }
    .text {
        max-width: 430px;
        width: 100%;
        height: 33px;
        text-align: left;
        font-weight: bold;
        font-size: 22px;
        line-height: 33px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: #777777;
        opacity: 1;
        word-break: break-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
    }
    .cell {
        margin-left: 4%; //80px;
        width: ${450 / 1737 * 100}%;
        height: 40px;
        opacity: 1;
        padding-left: 6px;
        display: flex;
        align-items: center;
    }
    .cell-short {
        width: ${150 / 1737 * 100}%;
        height: 40px;
    }
    .no-exp {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
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
        const { MyDetail, Count, MyLikeDesign, MyLikeDesigner, MyLikeDesignAdded, MyLikeDesignerAdded, MyGroup, MyGroupAdded, MyDesign, MyDesignAdded, MyLikeGroup, MyLikeGroupAdded, RelatedGroup, RelatedGroupAdded } = this.props;
        const { this_order } = this.state;

        const careerList = (MyDetail && MyDetail.careerlist && MyDetail.careerlist.split('/').slice(0, -1)) || [];

        return (<Wrapper>

            <div className="menu-container">
                <TabMenu>
                    {/* ({NumberFormat(Count.total_group || 0)}) ({NumberFormat(Count.joined_group || 0)})({NumberFormat(Count.total_design || 0) + (Count.joined_design || 0)})({NumberFormat(Count.total_favorite || 0)})*/}
                    <a onClick={() => this.changeCategory(0)}><div className={`tab ${this.state.cateIndex === 0 ? "selected" : ""}`}>그룹({NumberFormat(Count.total_group || 0)})</div></a>
                    <a onClick={() => this.changeCategory(1)}><div className={`tab ${this.state.cateIndex === 1 ? "selected" : ""}`}>참여그룹({NumberFormat(Count.joined_group || 0)})</div></a>
                    <a onClick={() => this.changeCategory(2)}><div className={`tab ${this.state.cateIndex === 2 ? "selected" : ""}`}>디자인({NumberFormat((Count.total_design || 0) + (Count.joined_design || 0))})</div></a>
                    <a onClick={() => this.changeCategory(3)}><div className={`tab ${this.state.cateIndex === 3 ? "selected" : ""}`}>관심항목({NumberFormat(Count.total_favorite || 0)})</div></a>
                    <a onClick={() => this.changeCategory(4)}><div className={`tab ${this.state.cateIndex === 4 ? "selected" : ""}`}>경험</div></a>
                </TabMenu>

                {this.state.cateIndex === 0 && <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyGroupListRequest)} selected={this_order} />}
                {this.state.cateIndex === 1 && <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getRelatedGroupInDesignerRequest)} selected={this_order} />}
                {this.state.cateIndex === 2 && <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyDesignListRequest)} selected={this_order} />}

            </div>

            {this.state.cateIndex === 4 &&
                <CareerListTable>
                    <div className="head row">
                        <div className="cell-short"><div className="text">번호</div></div>
                        <div className="cell"><div className="text">업무</div></div>
                        <div className="cell"><div className="text">기간</div></div>
                        <div className="cell"><div className="text">내용</div></div>
                    </div>
                    {careerList.length > 0
                        ? careerList.map((item, index) => {
                            const ary = item && item.split(',') || ["-", "-", "-"];
                            const what = ary[1] || "-", when = ary[2] || "-", which = ary[3] || "-";

                            return (<div className="row" key={index}>
                                <div className="cell-short"><div className="text"> {index + 1} </div></div>
                                <div className="cell"><div className="text">{what}</div></div>
                                <div className="cell"><div className="text">{when}</div></div>
                                <div className="cell"><div className="text">{which}</div></div>
                            </div>);
                        })
                        : <div className="no-exp"><div className="text">디자이너가 입력한 <br />경력/경험 사항이 없습니다.</div></div>}
                </CareerListTable>}

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