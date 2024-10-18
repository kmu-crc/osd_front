import React, { Component } from 'react';
import styled from 'styled-components'

//component
import ScrollList_mobile from "components/Commons/ScrollList_mobile"
import Loading from 'components/Commons/Loading'
import opendesign_mobile_style from 'opendesign_mobile_style';
import NumberFormat from 'modules/NumberFormat';
import OrderOption_mobile from "components/Commons/OrderOption_mobile"

const Wrapper = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    .contentsBox{
        width:360px;
    }
    .order{margin-top:7px;}
    .list{margin-top:5px;}
    .interested{
        font-family:Spoqa Han Sans;
        font-size:20px;
        color:#707070;
        width:100%;
        height:28px;
        display:flex;
        justify-content:center;
        align-items:center;

        margin-bottom:7px;
    }
`
const MenuBox = styled.div`
    width:100%;
    height:35px;
    padding:6px 17px;
    display:flex;
    justify-content:space-around;
    align-items:center;
    .tab{
        font-family:Spoqa Han Sans;
        font-size:15px;
        color:#7A7A7A;
    }
    .selected{color:red;}
`
const HrLine = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    .line{
        border-top:1px solid #7a7a7a;
        width:50%;
    }
`
const CareerListTable = styled.div`
    width:100%;
    .wrap{
        width:360px;
        padding:14px 23px;
    }
    .row{
        display:flex;
        .bold{
           font-family: Spoqa Han Sans;
           font-size:20px;
           font-weight:700;
           color:#777777;
           margin-right:28px;
        }
        .light{
            font-family: Spoqa Han Sans;
            font-size:20px;
            font-weight:400;
            color:#777777;
            margin-right:28px;  
        }
        
    }
    .marginBottom{margin-bottom:40px;}
`


class MypageBody_mobile extends Component {
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

        return (
            <Wrapper>
                <div className="contentsBox">
                    <MenuBox>
                    <a onClick={() => this.changeCategory(0)}><div className={`tab ${this.state.cateIndex === 0 ? "selected" : ""}`}>그룹({NumberFormat(Count.total_group || 0)})</div></a>
                    <a onClick={() => this.changeCategory(1)}><div className={`tab ${this.state.cateIndex === 1 ? "selected" : ""}`}>참여그룹({NumberFormat(Count.joined_group || 0)})</div></a>
                    <a onClick={() => this.changeCategory(2)}><div className={`tab ${this.state.cateIndex === 2 ? "selected" : ""}`}>디자인({NumberFormat((Count.total_design || 0) + (Count.joined_design || 0))})</div></a>
                    <a onClick={() => this.changeCategory(3)}><div className={`tab ${this.state.cateIndex === 3 ? "selected" : ""}`}>관심항목({NumberFormat(Count.total_favorite || 0)})</div></a>
                    <a onClick={() => this.changeCategory(4)}><div className={`tab ${this.state.cateIndex === 4 ? "selected" : ""}`}>경험</div></a>
                    </MenuBox>
                </div>
                <HrLine><div className="line"/></HrLine>
                <div className="order">
                {this.state.cateIndex === 0 && <OrderOption_mobile  order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyGroupListRequest)} selected={this_order} />}
                {this.state.cateIndex === 1 && <OrderOption_mobile  order_clicked={(order) => this.handleChangeOrderOps(order, this.getRelatedGroupInDesignerRequest)} selected={this_order} />}
                {this.state.cateIndex === 2 && <OrderOption_mobile  order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyDesignListRequest)} selected={this_order} />}
                </div>

                {this.state.cateIndex === 0 &&
                <div className="list">
                {this.props.status === "INIT"
                    ? <Loading />
                    : <ScrollList_mobile {...opendesign_mobile_style.group_margin} type="group" dataList={MyGroup} dataListAdded={MyGroupAdded} getListRequest={this.getMyGroupListRequest} />}
                </div>}
                {this.state.cateIndex === 1 &&
                <div className="list">
                {this.props.status === "INIT"
                    ? <Loading />
                    : <ScrollList_mobile {...opendesign_mobile_style.group_margin} type="group" dataList={RelatedGroup} dataListAdded={RelatedGroupAdded} getListRequest={this.getRelatedGroupInDesignerRequest} />}
                </div>}
                {this.state.cateIndex === 2 &&
                <div className="list">
                {this.props.status === "INIT"
                    ? <Loading />
                    : <ScrollList_mobile {...opendesign_mobile_style.design_my_margin} type="design_my" dataList={MyDesign} dataListAdded={MyDesignAdded} getListRequest={this.getMyDesignListRequest} />}
                </div>}
                 {this.state.cateIndex === 3 &&
                <div className="list">
                {Count.like_design > 0
                    ? <React.Fragment>
                        <div className="interested">관심있는 디자인({NumberFormat(Count.like_design)})</div>
                        {this.props.status === "INIT"
                            ? <Loading />
                            : <ScrollList_mobile manual {...opendesign_mobile_style.design_my_margin} type="design_my" dataList={MyLikeDesign} dataListAdded={MyLikeDesignAdded} getListRequest={this.getLikeDesignList} />}
                    </React.Fragment>
                    : null}
                {Count.like_group > 0
                    ? <React.Fragment>
                        <div className="interested">관심있는 그룹({NumberFormat(Count.like_group)})</div>
                        {this.props.status === "INIT"
                            ? <Loading />
                            : <ScrollList_mobile manual {...opendesign_mobile_style.group_margin} type="group" dataList={MyLikeGroup} dataListAdded={MyLikeGroupAdded} getListRequest={this.getLikeGroupList} />}
                    </React.Fragment>
                    : null}                
                {Count.like_designer > 0
                    ? <React.Fragment>
                        <div className="interested">관심있는 디자이너({NumberFormat(Count.like_designer)})</div>
                        {this.props.status === "INIT"
                            ? <Loading />
                            : <ScrollList_mobile manual {...opendesign_mobile_style.designer_margin} type="designer" dataList={MyLikeDesigner} dataListAdded={MyLikeDesignerAdded} getListRequest={this.getLikeDesignerList} />}
                    </React.Fragment>
                    : null}
                     </div>}
                {this.state.cateIndex === 4 &&
                <CareerListTable>
                    {careerList.length > 0
                        ? careerList.map((item, index) => {
                            const ary = item && item.split(',') || ["-", "-", "-", "-"];
                            const idx = ary[0] || "-", what = ary[1] || "-", which = ary[2] || "-", when = ary[3] ;
                            return (
                            <React.Fragment>
                            <div className="wrap" key={index}>
                                <div className="row marginBottom"><div className="bold">번호</div><div className="light"> {idx + 1} </div></div>
                                <div className="row marginBottom"><div className="bold">업무</div><div className="light">{what}</div></div>
                                <div className="row marginBottom"><div className="bold">기간</div><div className="light">{when}</div></div>
                                <div className="row"><div className="bold">내용</div><div className="light">{which}</div></div>
                            </div>
                            <HrLine><div className="line"/></HrLine>
                            </React.Fragment>
                            );
                        })
                        : <div className="no-exp"><div className="text">디자이너가 입력한 <br />경력/경험 사항이 없습니다.</div></div>}
                </CareerListTable>}
                
            </Wrapper>
        );
    };
};

export default MypageBody_mobile;


    
// <Wrapper>

// <div className="menu-container">
//     <TabMenu>
//         <a onClick={() => this.changeCategory(0)}><div className={`tab ${this.state.cateIndex === 0 ? "selected" : ""}`}>그룹({NumberFormat(Count.total_group || 0)})</div></a>
//         <a onClick={() => this.changeCategory(1)}><div className={`tab ${this.state.cateIndex === 1 ? "selected" : ""}`}>참여그룹({NumberFormat(Count.joined_group || 0)})</div></a>
//         <a onClick={() => this.changeCategory(2)}><div className={`tab ${this.state.cateIndex === 2 ? "selected" : ""}`}>디자인({NumberFormat((Count.total_design || 0) + (Count.joined_design || 0))})</div></a>
//         <a onClick={() => this.changeCategory(3)}><div className={`tab ${this.state.cateIndex === 3 ? "selected" : ""}`}>관심항목({NumberFormat(Count.total_favorite || 0)})</div></a>
//         <a onClick={() => this.changeCategory(4)}><div className={`tab ${this.state.cateIndex === 4 ? "selected" : ""}`}>경험</div></a>
//     </TabMenu>

//     {this.state.cateIndex === 0 && <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyGroupListRequest)} selected={this_order} />}
//     {this.state.cateIndex === 1 && <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getRelatedGroupInDesignerRequest)} selected={this_order} />}
//     {this.state.cateIndex === 2 && <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyDesignListRequest)} selected={this_order} />}

// </div>

// {this.state.cateIndex === 4 &&
//     <CareerListTable>
//         <div className="head row">
//             <div className="cell-short"><div className="text">번호</div></div>
//             <div className="cell"><div className="text">업무</div></div>
//             <div className="cell"><div className="text">기간</div></div>
//             <div className="cell"><div className="text">내용</div></div>
//         </div>
//         {careerList.length > 0
//             ? careerList.map((item, index) => {
//                 const ary = item && item.split(',') || ["-", "-", "-", "-"];
//                 const idx = ary[0] || "-", what = ary[1] || "-", which = ary[2] || "-", when = ary[3] ;

//                 return (<div className="row" key={index}>
//                     <div className="cell-short"><div className="text"> {idx + 1} </div></div>
//                     <div className="cell"><div className="text">{what}</div></div>
//                     <div className="cell"><div className="text">{when}</div></div>
//                     <div className="cell"><div className="text">{which}</div></div>
//                 </div>);
//             })
//             : <div className="no-exp"><div className="text">디자이너가 입력한 <br />경력/경험 사항이 없습니다.</div></div>}
//     </CareerListTable>}

// {this.state.cateIndex === 0 &&
//     <div style={{ paddingTop: "37px" }}>
//         {this.props.status === "INIT"
//             ? <Loading />
//             : <ScrollList {...opendesign_style.group_margin} type="group" dataList={MyGroup} dataListAdded={MyGroupAdded} getListRequest={this.getMyGroupListRequest} />}
//     </div>}

// {this.state.cateIndex === 1 &&
//     <div style={{ paddingTop: "37px" }}>
//         {this.props.status === "INIT"
//             ? <Loading />
//             : <ScrollList {...opendesign_style.group_margin} type="group" dataList={RelatedGroup} dataListAdded={RelatedGroupAdded} getListRequest={this.getRelatedGroupInDesignerRequest} />}
//     </div>}

// {this.state.cateIndex === 2 &&
//     <div style={{ paddingTop: "37px" }}>
//         {this.props.status === "INIT"
//             ? <Loading />
//             : <ScrollList {...opendesign_style.design_margin} type="design" dataList={MyDesign} dataListAdded={MyDesignAdded} getListRequest={this.getMyDesignListRequest} />
//         }
//     </div>}

// {this.state.cateIndex === 3 &&
//     <div style={{ paddingTop: "37px" }}>
//         {Count.like_design > 0
//             ? <React.Fragment>
//                 <div className="interested">관심있는 디자인({NumberFormat(Count.like_design)})</div>
//                 {this.props.status === "INIT"
//                     ? <Loading />
//                     : <ScrollList manual {...opendesign_style.design_margin} type="design" dataList={MyLikeDesign} dataListAdded={MyLikeDesignAdded} getListRequest={this.getLikeDesignList} />}
//             </React.Fragment>
//             : null}
//         {Count.like_group > 0
//             ? <React.Fragment>
//                 <div className="interested">관심있는 그룹({NumberFormat(Count.like_group)})</div>
//                 {this.props.status === "INIT"
//                     ? <Loading />
//                     : <ScrollList manual {...opendesign_style.group_margin} type="group" dataList={MyLikeGroup} dataListAdded={MyLikeGroupAdded} getListRequest={this.getLikeGroupList} />}
//             </React.Fragment>
//             : null}

//         {Count.like_designer > 0
//             ? <React.Fragment>
//                 <div className="interested">관심있는 디자이너({NumberFormat(Count.like_designer)})</div>
//                 {this.props.status === "INIT"
//                     ? <Loading />
//                     : <ScrollList manual {...opendesign_style.designer_margin} type="designer" dataList={MyLikeDesigner} dataListAdded={MyLikeDesignerAdded} getListRequest={this.getLikeDesignerList} />}
//             </React.Fragment>
//             : null}
//     </div>}

// </Wrapper>
