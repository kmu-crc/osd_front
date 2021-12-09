import React, { Component } from 'react';
import styled from 'styled-components'

//component
import ScrollList_mobile from "components/Commons/ScrollList_mobile"
import Loading from 'components/Commons/Loading'
import opendesign_mobile_style from 'opendesign_mobile_style';
import NumberFormat from 'modules/NumberFormat';
import OrderOption_mobile from "components/Commons/OrderOption_mobile"

// CSS
const EmptyBox = styled.div`
  height:300px;
  font-size:15px;
  display:flex;
  align-items:center;
  justify-content:center;
`
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


class DesignerDetailBody_mobile extends Component {
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
    };

    render() {
        const { DesignerDetail, Count, MyDesignInDesigner, MyDesignInDesignerAdded, GroupInDesigner, GroupInDesignerAdded, RelatedGroupInDesigner, RelatedGroupInDesignerAdded,
            LikeInDesigner, LikeInDesignerAdded, LikeGroupInDesigner, LikeGroupInDesignerAdded, LikeDesignerInDesigner, LikeDesignerInDesignerAdded } = this.props;
        const { reload, this_order } = this.state;

        console.log(this.props, this.state);

        const careerList = (DesignerDetail && DesignerDetail.careerlist && DesignerDetail.careerlist.split('/').slice(0, -1)) || [];
        return (
            <React.Fragment>
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
                {this.state.cateIndex === 0 && <OrderOption_mobile  order_clicked={(order) => this.handleChangeOrderOps(order, this.getGroupInDesignerRequest)} selected={this_order} />}
                {this.state.cateIndex === 1 && <OrderOption_mobile  order_clicked={(order) => this.handleChangeOrderOps(order, this.getRelatedGroupInDesignerRequest)} selected={this_order} />}
                {this.state.cateIndex === 2 && <OrderOption_mobile  order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyDesignInDesignerRequest)} selected={this_order} />}
                </div>

                {this.state.cateIndex === 0 &&
                <div className="list">
                {this.props.status === "INIT"
                    ? <Loading />
                    : <ScrollList_mobile {...opendesign_mobile_style.group_margin} handleReload={this.handleReload} reloader={reload} type="group" dataList={GroupInDesigner} dataListAdded={GroupInDesignerAdded} getListRequest={this.getGroupInDesignerRequest}  />}
                </div>}
                {this.state.cateIndex === 1 &&
                <div className="list">
                {this.props.status === "INIT"
                    ? <Loading />
                    : <ScrollList_mobile  {...opendesign_mobile_style.group_margin} handleReload={this.handleReload} reloader={reload} type="group" dataList={RelatedGroupInDesigner} dataListAdded={RelatedGroupInDesignerAdded} getListRequest={this.getRelatedGroupInDesignerRequest}  />}
                </div>}
                {this.state.cateIndex === 2 &&
                <div className="list">
                {this.props.status === "INIT"
                    ? <Loading />
                    : <ScrollList_mobile {...opendesign_mobile_style.design_margin} handleReload={this.handleReload} reloader={reload} type="design" dataList={MyDesignInDesigner} dataListAdded={MyDesignInDesignerAdded} getListRequest={this.getMyDesignInDesignerRequest} />}
                </div>}
                 {this.state.cateIndex === 3 &&
                <div className="list">
                {Count.like_design > 0
                    ? <React.Fragment>
                        <div className="interested">관심있는 디자인({NumberFormat(Count.like_design)})</div>
                        {this.props.status === "INIT"
                            ? <Loading />
                            : <ScrollList_mobile {...opendesign_mobile_style.group_margin} handleReload={this.handleReload} reloader={reload} manual type="group" dataList={LikeGroupInDesigner} dataListAdded={LikeGroupInDesignerAdded} getListRequest={this.getLikeGroupInDesignerRequest}  />}
                    </React.Fragment>
                    : null}
                {Count.like_group > 0
                    ? <React.Fragment>
                        <div className="interested">관심있는 그룹({NumberFormat(Count.like_group)})</div>
                        {this.props.status === "INIT"
                            ? <Loading />
                            : <ScrollList_mobile {...opendesign_mobile_style.design_margin} handleReload={this.handleReload} reloader={reload} manual type="design" dataList={LikeInDesigner} dataListAdded={LikeInDesignerAdded} getListRequest={this.getLikeInDesignerRequest} manual type="designer" dataList={LikeDesignerInDesigner} dataListAdded={LikeDesignerInDesignerAdded} getListRequest={this.getLikeDesignerInDesignerRequest} />}
                    </React.Fragment>
                    : null}                
                {Count.like_designer > 0
                    ? <React.Fragment>
                        <div className="interested">관심있는 디자이너({NumberFormat(Count.like_designer)})</div>
                        {this.props.status === "INIT"
                            ? <Loading />
                            : <ScrollList_mobile {...opendesign_mobile_style.designer_margin} handleReload={this.handleReload} reloader={reload} />}
                    </React.Fragment>
                    : null}
                {Count.like_design<=0&&Count.like_group<=0&&Count.like_designer<=0?<EmptyBox>내용이 없습니다</EmptyBox>:null}
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
            </React.Fragment>

        );
    };
};

export default DesignerDetailBody_mobile;


// <Wrapper>

// <div className="menu-container">
//     <TabMenu>
//         <a onClick={() => this.changeCategory(0)}><div className={`tab ${this.state.cateIndex === 0 ? "selected" : ""}`}>그룹({NumberFormat(Count.total_group || 0)})</div></a>
//         <a onClick={() => this.changeCategory(1)}><div className={`tab ${this.state.cateIndex === 1 ? "selected" : ""}`}>참여그룹({NumberFormat(Count.joined_group || 0)})</div></a>
//         <a onClick={() => this.changeCategory(2)}><div className={`tab ${this.state.cateIndex === 2 ? "selected" : ""}`}>디자인({NumberFormat((Count.total_design || 0) + (Count.joined_design || 0))})</div></a>
//         <a onClick={() => this.changeCategory(3)}><div className={`tab ${this.state.cateIndex === 3 ? "selected" : ""}`}>관심항목({NumberFormat(Count.total_favorite || 0)})</div></a>
//         <a onClick={() => this.changeCategory(4)}><div className={`tab ${this.state.cateIndex === 4 ? "selected" : ""}`}>경험</div></a>
//     </TabMenu>

//     {this.state.cateIndex === 0 && <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getGroupInDesignerRequest)} selected={this_order} />}
//     {this.state.cateIndex === 1 && <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getRelatedGroupInDesignerRequest)} selected={this_order} />}
//     {this.state.cateIndex === 2 && <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyDesignInDesignerRequest)} selected={this_order} />}

// </div>

// <div className="scroll-list">
//     {this.state.cateIndex === 4 &&
//         <CareerListTable>
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

//     {this.state.cateIndex === 0 &&
//         <div>
//             {this.props.status === "INIT"
//                 ? <Loading />
//                 : <ScrollList {...opendesign_style.group_margin} handleReload={this.handleReload} reloader={reload} type="group" dataList={GroupInDesigner} dataListAdded={GroupInDesignerAdded} getListRequest={this.getGroupInDesignerRequest} />
//             }
//         </div>}

//     {this.state.cateIndex === 1 &&
//         <div>
//             {this.props.status === "INIT"
//                 ? <Loading />
//                 : <ScrollList {...opendesign_style.group_margin} handleReload={this.handleReload} reloader={reload} type="group" dataList={RelatedGroupInDesigner} dataListAdded={RelatedGroupInDesignerAdded} getListRequest={this.getRelatedGroupInDesignerRequest} />
//             }
//         </div>}

//     {this.state.cateIndex === 2 &&
//         <div>
//             {this.props.status === "INIT"
//                 ? <Loading />
//                 : <ScrollList {...opendesign_style.design_margin} handleReload={this.handleReload} reloader={reload} type="design" dataList={MyDesignInDesigner} dataListAdded={MyDesignInDesignerAdded} getListRequest={this.getMyDesignInDesignerRequest} />
//             }
//         </div>}

//     {this.state.cateIndex === 3 &&
//         <div>
//             {Count.like_group > 0
//                 ? <React.Fragment>
//                     <div className="interested first">관심있는 그룹({NumberFormat(Count.like_group)})</div>
//                     {this.props.status === "INIT" ?
//                         <Loading /> :
//                         <ScrollList {...opendesign_style.group_margin} handleReload={this.handleReload} reloader={reload}
//                             manual type="group" dataList={LikeGroupInDesigner} dataListAdded={LikeGroupInDesignerAdded} getListRequest={this.getLikeGroupInDesignerRequest} />}
//                 </React.Fragment>
//                 : null}
//             {Count.like_design > 0
//                 ? <React.Fragment>
//                     <div className="interested second">관심있는 디자인({NumberFormat(Count.like_design)})</div>
//                     {this.props.status === "INIT" ?
//                         <Loading /> :
//                         <ScrollList {...opendesign_style.design_margin} handleReload={this.handleReload} reloader={reload}
//                             manual type="design" dataList={LikeInDesigner} dataListAdded={LikeInDesignerAdded} getListRequest={this.getLikeInDesignerRequest} />
//                     }
//                 </React.Fragment>
//                 : null}

//             {Count.like_designer > 0
//                 ? <React.Fragment>
//                     <div className="interested third">관심있는 디자이너({NumberFormat(Count.like_designer)})</div>
//                     {this.props.status === "INIT" ?
//                         <Loading /> :
//                         <ScrollList {...opendesign_style.designer_margin} handleReload={this.handleReload} reloader={reload}
//                             manual type="designer" dataList={LikeDesignerInDesigner} dataListAdded={LikeDesignerInDesignerAdded} getListRequest={this.getLikeDesignerInDesignerRequest} />
//                     }
//                 </React.Fragment>
//                 : null}
//         </div>}
// </div>

// </Wrapper >




// const Wrapper = styled.div`
//     margin-top: 28px;
//     margin-left: 38px;
//     // margin-right: 38px;
//     max-width:1740px;
//     min-width: ${1000 - (38 * 2)}px;

//     // margin-left: ${100 + 38}px;
//     // *{border: 1px solid red;}

//     .menu-container {
//         // max-width: 1737px;
//         // min-width: 1000px;
//         width:100%;
//         display: flex;
//         flex-direction: row;
//         justify-content: space-between;
//     }
//     .interested {
//         font-size: ${opendesign_style.font.size.heading2};
//         line-height: ${opendesign_style.font.size.heading2};
//         text-align: center;
//         margin-top: 42px;
//         margin-bottom: 42px;
//         color: #707070;
//         position: relative;
//         margin: auto;
//         padding-top: 42px;
//         padding-bottom: 42px;
//     }
//     .scroll-list {
//         padding-top: 37px;
//     }

//     @media only screen and (max-width: 1000px) {
//         width: 100vw;
//     }
//     @media only screen and (min-width: 1920px) {
//         width:100vw;
//     }

// `;
// const TabMenu = styled.div`
//     display: flex;
//     justify-content: space-start;

//     .tab {
//         text-align: center;
//         font-weight: medium;
//         font-size: 20px;
//         line-height: 40px;
//         font-family: Spoqa Han Sans Neo;
//         letter-spacing: 0px;
//         cursor: pointer;
//         color: #000000;
        
//         margin-right 43px;
//         :first-child{
//             margin-right: 21px;
//         }
//     }
//     .selected { 
//         color: #7E1E9B; 
//     }
// `;
// const CareerListTable = styled.div`
//     width: 100%;
//     min-width: 1000px;
//     max-width: 1737px;

//     margin-top: 70px;

//     // *{border: 1px solid red;}
//     .head {
//         padding-bottom: 18px;
//         margin-bottom: 23px;
//         border-bottom: 1px solid #707070;
//     }
//     .row {
//         display: flex;
//         flex-direction: row;
//         margin-bottom: 58px;
//         :last-child {
//             margin-bottom: 0px;
//         }
//     }
//     .text {
//         max-width: 430px;
//         width: 100%;
//         height: 33px;
//         text-align: left;
//         font-weight: bold;
//         font-size: 22px;
//         line-height: 33px;
//         font-family: Spoqa Han Sans;
//         letter-spacing: 0px;
//         color: #777777;
//         opacity: 1;
//         word-break: break-all;
//         white-space: nowrap;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         white-space: normal;
//     }
//     .cell {
//         margin-left: 4%; //80px;
//         width: ${450 / 1737 * 100}%;
//         height: 40px;
//         opacity: 1;
//         padding-left: 6px;
//         display: flex;
//         align-items: center;
//     }
//     .cell-short {
//         width: ${150 / 1737 * 100}%;
//         height: 40px;
//     }
//     .no-exp {
//         width: 100%;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//     }
// `;