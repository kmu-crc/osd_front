import React, { Component } from 'react';
import styled from 'styled-components';

// //component
import { MyMenu, MyProfile } from 'components/MyDetail';

import ScrollList from "components/Commons/ScrollList";
import Design from 'components/Designs/Design';
import opendesign_style from 'opendesign_style';
// import opendesign_style from 'opendesign_style';
// import Loading from 'components/Commons/Loading'
// import opendesign_style from 'opendesign_style';
// import NumberFormat from 'modules/NumberFormat';
import OrderOption from "components/Commons/OrderOption";

const MyPageWrapper = styled.div`
    margin-left: 100px;
    margin-top: ${90 + 24}px;

    display: flex;
    flex–direction: rows;

    .menubox{
        margin-right:48px;
        margin-left:38px;
        width:174px;
    }
    .vline{
        width: 0px;
        height: 871px;
        margin-top: 62px;
        border-left: 2px solid #CCCCCC;
        opacity: 1;
        margin-left:25px;
    }
    .list_wrapper{
        display:flex;
        flex-direction:column;
    }
    .orderBox{
        width:100%;
        height:30px;
        padding-right:85px;
    }
    .likeMenuBox{
        width:100%;
        display:flex;
    }
    .likeMenu{
        height:40px;
        display:flex;
        align-items:center;
        padding-right:33px;
        font-size:28px;
        font-weight:Medium;
        font-family:Spoqa Han Sans Neo;
    }
    .active{
        color:red;
    }
`;
const FavoriteItemListWrapper = styled.div`
    // *{border:1px dashed red;}
    margin-left: 30px;
    
    // width: 100%;
    width: 1168px;
    height: 100%;

    .top {

        display: flex;
        justify-content: space-between;

        .title {
            // margin-left: 30px;
            width: max-content;
            height: 40px;
            text-align: center;
            font-weight: medium;
            font-size: 28px;
            line-height: 40px;
            font-family: Spoqa Han Sans Neo;
            letter-spacing: 0px;
            color: #000000;
            opacity: 1;
        }
        .order {
            margin-left: auto;
            a {
                width: 128px;
                height: 34px;
                opacity: 1;
                padding: 5px 17px 4px 17px; 
                border: 1px solid white;
                cursor: pointer;
                
                &.active {
                    border: 1px solid #707070;
                }
                :hover {
                    background: #FAFAFA;
                }
            }
            span {
                width: 94px;
                height: 25px;
                text-align: center;
                font-weight: medium;
                font-size: 18px;
                line-height: 24px;
                font-family: Noto Sans KR;
                letter-spacing: 0px;
                color: #000000;
                opacity: 1;
            }
        }
    }
    .grid {

        margin-top: 26px;
        width: ${1118 + 16 + 16}px;
        height: 978px;
        overflow: hidden scroll;

        ::-webkit-scrollbar {
          width: 16px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(233, 233, 233, 0.2);
        }
        ::-webkit-scrollbar-thumb {
          background: #F00;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #F00000;
        }
    }
`;
const BestDesign = styled.div`
    width: 360px;

    .title {
        width: 168px;
        height: 40px;
        text-align: center;
        font-weight: medium;
        font-size: 28px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
    }
    &.row {
        display: flex;
        flex-direction: row;
    }
    .create-design {
        margin-top: 44px;

        width: 346px;
        height: 94px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 8px 8px 8px #0000002B;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;

        :hover {
            background: #FAFAFA;
        }

        .button {
            width: 224px;
            height: 40px;
            text-align: center;
            font-weight: medium;
            font-size: 28px;
            line-height: 40px;
            font-family: Spoqa Han Sans Neo;
            letter-spacing: 0px;
            color: #000000;
            opacity: 1;
            cursor: pointer;
        }
    }
`;
const designmargin = {
    width: 238,
    height: 348,
    marginRight: 42,
    marginBottom: 42,
    marginBottomLast: 16,
    small: { marginRightLast: 26, cols: 1, },
    medium: { marginRightLast: 26, cols: 3, },
    large: { marginRightLast: 26, cols: 4, },
    big: { marginRightLast: 26, cols: 4, },
};

const ItemList = ({ getList, itemList, itemListAdded, tab, order = "like", onClickedOrder = () => alert('함수를 넘겨주세요.') }) =>{
    let styleSheet =  {...opendesign_style.my_design_margin}
    if(tab == "design") styleSheet = {...opendesign_style.my_design_margin}
    else if(tab == "group") styleSheet = {...opendesign_style.my_group_margin}
    else if(tab == "join-group") styleSheet = {...opendesign_style.my_group_margin}
    else if(tab == "designer") styleSheet = {...opendesign_style.my_designer_margin}

    return(
        <FavoriteItemListWrapper>
        <div className="top">
        </div>
        <div className="grid">
            <ScrollList
                {...styleSheet}
                type={tab=="design"?"myDesign"
                      :tab=="join-group"?"myGroup"
                      :tab=="group"?"myGroup"
                      :tab=="designer"?"myDesigner"
                      :null
                      }
                dataList={itemList}
                dataListAdded={itemListAdded}
                getListRequest={getList} />
        </div>
    </FavoriteItemListWrapper>
    )
}

class MypageBody extends Component {
        constructor(props) {
            super(props);
            this.state = {
                /*reload: false,*/
                this_order: { text: "최신순", keyword: "update" },
                orders: [{ text: "최신순", keyword: "update" }, { text: "최신순", keyword: "update" }, { text: "최신순", keyword: "update" },],
                tab: "design", 
                like_tab:"design",
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
            let tab = "design"
            if (total_group === 0) {
                tab = "join_group";
            }
            if (total_group === 0 && joined_group === 0) {
                tab = "design";
            }
            if (total_group === 0 && joined_group === 0 && total_design === 0) {
                tab = "like";
            }
            if (total_group === 0 && joined_group === 0 && total_design === 0 && total_favorite === 0) {
                tab = "group";
            }
            if (total_group !== 0 && joined_group === 0 && total_design !== 0 && total_favorite !== 0) {
                tab = "group";
            }
            this.setState({ tab: tab });
        };
        changeTab = async (tab) => {
            await this.setState({ tab: tab });
            this.getDataList(tab);
        };
        getInitData() {
            this.getLikeGroupList(0);
            this.getLikeDesignList(0);
            this.getLikeDesignerList(0);
            this.getMyDesignListRequest(0);
            this.getMyGroupListRequest(0);
            this.getRelatedGroupInDesignerRequest(0);
        };
        changeCategory = (name) => {
            this.setState({ tab: name, this_order: { text: "최신순", keyword: "update" } });
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
        }
    render() {
        // const {
        //     MyLikeDesign, MyLikeDesigner, MyLikeDesignAdded, MyLikeDesignerAdded,
        //     MyGroup, MyGroupAdded, MyDesign, MyDesignAdded, TheBestDesign,
        //     MyLikeGroup, MyLikeGroupAdded, RelatedGroup, RelatedGroupAdded } = this.props;
        // console.log({ MyLikeDesign, MyLikeDesigner, MyLikeDesignAdded, MyLikeDesignerAdded, MyGroup, MyGroupAdded, MyDesign, MyDesignAdded, TheBestDesign, MyLikeGroup, MyLikeGroupAdded, RelatedGroup, RelatedGroupAdded });
        // const { userInfo, Count, MyDetail } = this.props;
        // const { tab, order } = this.state;
        const { Count, userInfo, MyDetail, MyLikeDesign, MyLikeDesigner, MyLikeDesignAdded, MyLikeDesignerAdded, MyGroup, MyGroupAdded, MyDesign, MyDesignAdded, MyLikeGroup, MyLikeGroupAdded, RelatedGroup, RelatedGroupAdded } = this.props;
        const { this_order,tab,like_tab } = this.state;
        console.log(this.state.tab)
        return (
        <MyPageWrapper>
            <div className="menubox">
                <MyMenu tab={tab}
                        Count={Count}
                        changeTab={this.changeTab}
                        nickName={(userInfo && userInfo.nickName) || "회원"} />
            </div>
            <MyProfile
                tab={tab}
                userInfo={userInfo}
                MyDetail={MyDetail}
                Count={Count}
                changeTab={this.changeCategory}
            />
            <div className="vline"/>
            {
                tab == "group"?
                <div className="list_wrapper">
                <div className="orderBox">
                <OrderOption wrap={true} order_clicked={(order) => this.handleChangeOrderOps(order, this.getRelatedGroupInDesignerRequest)} selected={this_order} />
                </div>
                <ItemList
                    tab="group"
                    itemList={MyGroup}
                    itemListAdded={MyGroupAdded}
                    getList={this.getMyGroupListRequest}
                /> 
                </div>
                :null
            }
            {
                tab == "join-group"?
                <div className="list_wrapper">
                <div className="orderBox">
                <OrderOption wrap={true} order_clicked={(order) => this.handleChangeOrderOps(order, this.getRelatedGroupInDesignerRequest)} selected={this_order} />
                </div>
                <ItemList
                    tab="join-group"
                    itemList={RelatedGroup}
                    itemListAdded={RelatedGroupAdded}
                    getList={this.getRelatedGroupInDesignerRequest}
                /> 
                </div>
                :null
            }
            {
                tab == "design"?
                <div className="list_wrapper">
                <div className="orderBox">
                <OrderOption wrap={true} order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyDesignListRequest)} selected={this_order} />
                </div>
                <ItemList
                    tab="design"
                    itemList={MyDesign}
                    itemListAdded={MyDesignAdded}
                    getList={this.getMyDesignListRequest}
                /> 
                </div>
                :null
            }
            {
                tab == "like"?
                <div className="list_wrapper">
                    {console.log(this.state.tab,this.state.like_tab)}
                    <div className="likeMenuBox">
                        <div onClick={()=>this.setState({like_tab:"design"})} className={`likeMenu ${this.state.like_tab == "design"&&"active"}`}>관심 디자인</div>
                        <div onClick={()=>this.setState({like_tab:"group"})} className={`likeMenu ${this.state.like_tab == "group"&&"active"}`}>관심 그룹</div>
                        <div onClick={()=>this.setState({like_tab:"designer"})} className={`likeMenu ${this.state.like_tab == "designer"&&"active"}`}>관심 디자이너</div>
                    </div>
                    {
                        this.state.like_tab == "design"&&
                        <ItemList
                            tab="design"
                            itemList={MyLikeDesign}
                            itemListAdded={MyLikeDesignAdded}
                            getList={this.getLikeDesignList}
                        /> 
                    }
                                        {
                        this.state.like_tab == "group"&&
                        <ItemList
                            tab="group"
                            itemList={MyLikeGroup}
                            itemListAdded={MyLikeGroupAdded}
                            getList={this.getLikeGroupList}
                        /> 
                    }
                                        {
                        this.state.like_tab == "designer"&&
                        <ItemList
                            tab="designer"
                            itemList={MyLikeDesigner}
                            itemListAdded={MyLikeDesignerAdded}
                            getList={this.getLikeDesignerList}
                        /> 
                    }
                </div>
                :null
            }
        </MyPageWrapper>);
    }
}

export default MypageBody;
// constructor(props) {
//     super(props);
//     this.state = { tab: "design", order: "update"/* or like */,
//     this_order: { text: "최신순", keyword: "update" },
//     orders: [{ text: "최신순", keyword: "update" }, { text: "최신순", keyword: "update" }, { text: "최신순", keyword: "update" },], };
// }
// componentDidMount() {
//     this.getInitData();
// }
// getInitData() {
//     this.getLikeGroupList(0);
//     this.getLikeDesignList(0);
//     this.getLikeDesignerList(0);
//     this.getMyDesignListRequest(0);
//     this.getMyGroupListRequest(0);
//     this.getRelatedGroupInDesignerRequest(0);
// };
// getLikeDesignList = async (page) => {
//     this.props.id && this.props.GetLikeInDesignerRequest(this.props.id, page, this.state.orders[0].keyword);
// };
// getLikeDesignerList = async (page) => {
//     this.props.id && this.props.GetLikeDesignerInDesignerRequest(this.props.id, page, this.state.orders[2].keyword);
// };
// getLikeGroupList = async (page) => {
//     this.props.id && this.props.GetLikeGroupInDesignerRequest(this.props.id, page, this.state.orders[1].keyword);
// };
// getMyGroupListRequest = async (page) => {
//     this.props.id && this.props.GetGroupInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
// };
// getMyDesignListRequest = async (page) => {
//     this.props.id && this.props.GetMyDesignInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
// };
// getRelatedGroupInDesignerRequest = async (page) => {
//     this.props.id && this.props.GetRelatedGroupInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
// };
// changeCategory = (index) => {
//     this.setState({ cateIndex: index, this_order: { text: "최신순", keyword: "update" } });
// };
// handleChangeOrderOps = async (order, getfunc) => {
//     await this.setState({ this_order: order });
//     getfunc(0);
// }

// getDataList = async tab => {
//     if (tab === "design") {
//         await this.getLikeDesignList(0);
//     }
//     else if (tab === "group") {
//         await this.getLikeGroupList(0);
//     }
//     else if (tab === "designer") {
//         await this.getLikeDesignerList(0);
//     } else if (tab === "manage") {
//         await this.props.GetTheBestDesignDesignerRequest(this.props.id);
//         await this.getMyDesignList(0);
//     }
// };
// gotoCreateDesign = () => {
//     window.location.href = "/createdesign";
// };
// changedOrder = async (order) => {
//     await this.setState({ order: order });
//     const { tab } = this.state;
//     this.getDataList(tab);
// };

// changeTab = async (tab) => {
//     await this.setState({ tab: tab });
//     this.getDataList(tab);
// };
            // <div className="menubox">
            //     <MyMenu tab={tab}
            //             Count={Count}
            //             changeTab={this.changeTab}
            //             nickName={(userInfo && userInfo.nickName) || "회원"} />
            // </div>

            // {tab === "manage"

            //     ? <React.Fragment>
            //         <BestDesign className="row">

            //             <div>
            //                 <div className="title">베스트 디자인</div>

            //                 <div>
            //                     {TheBestDesign
            //                         ? <Design data={TheBestDesign} />
            //                         : null}

            //                     <div className="create-design">
            //                         <a onClick={this.gotoCreateDesign} className="button">내 디자인 등록하기</a>
            //                     </div>
            //                 </div>

            //             </div>

            //             <div className="spacer-4">&nbsp;</div>

            //             <div>
            //                 <ItemList
            //                     tab={tab}
            //                     itemList={MyDesign
            //                         && MyDesign.filter(design => design.uid !== TheBestDesign.uid)}
            //                     itemListAdded={MyDesignAdded
            //                         && MyDesignAdded.filter(design => design.uid !== TheBestDesign.uid)}
            //                     getList={this.getLikeGroupList}
            //                 />
            //             </div>

            //         </BestDesign>

            //     </React.Fragment>


            //     : <React.Fragment>
            //         <MyProfile
            //             tab={tab}
            //             userInfo={userInfo}
            //             MyDetail={MyDetail}
            //             Count={Count}
            //             changeTab={this.changeTab}
            //         />
            //         <div className="vline"/>

            //         {tab === "design" ?
            //             <ItemList
            //                 tab="design"
            //                 order={order}
            //                 onClickedOrder={this.changedOrder}
            //                 itemList={MyDesign}
            //                 itemListAdded={MyDesignAdded}
            //                 getList={this.getMyDesignList}
            //             /> : null}
            //         {tab === "group" ?
            //             <ItemList
            //                 tab="group"
            //                 order={order}
            //                 onClickedOrder={this.changedOrder}
            //                 itemList={MyLikeGroup}
            //                 itemListAdded={MyLikeGroupAdded}
            //                 getList={this.getLikeGroupList}
            //             /> : null}
            //         {tab === "designer" ?
            //             <ItemList
            //                 tab="designer"
            //                 order={order}
            //                 onClickedOrder={this.changedOrder}
            //                 itemList={MyLikeDesigner}
            //                 itemListAdded={MyLikeDesignerAdded}
            //                 getList={this.getLikeDesignerList}
            //             /> : null}

            //     </React.Fragment>
            // }