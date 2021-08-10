import React, { Component } from 'react';
import styled from 'styled-components';
import noface from 'source/thumbnail.png';

// //component
// import ScrollList from "components/Commons/ScrollList"
// import Loading from 'components/Commons/Loading'
// import opendesign_style from 'opendesign_style';
// import NumberFormat from 'modules/NumberFormat';
// import OrderOption from "components/Commons/OrderOption";

const MyPageWrapper = styled.div`
    display: flex;
    flex–direction: rows;
    margin-left: 100px;
    margin-top: 90px;
`;
const MenuWrapper = styled.div`
    margin-left: 39.5px;
    // margin-top: 27px;
    .greet {
        width: 156px;
        height: 62px;
        text-align: center;
        font-family: Noto Sans KR;
        // font: normal normal medium 24px/29px 
        line-height: 29px;
        font-size: 24px;
        font-weight: medium;
        letter-spacing: 0px;
        color: #4F4F4F;
        // color: red;
        opacity: 1;
    }
    .menu-element {
        text-align: center;
        font-weight: medium;
        font-size: 24px;
        line-height: 29px;
        font-family: Noto Sans KR;
        letter-spacing: 0px;
        color: #4F4F4F;
        opacity: 1;
        :last {
            background-color: red;
        }
    }
`;
const ProfileWrapper = styled.div`
    margin-left: 161.5px;
    .title {

    }
    .card {
        padding: 9px;
        width: 326px;
        height: 485px;

        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 8px 8px 8px #0000002B;
        opacity: 1;

        .thumbnail {
            width: 290px;
            height: 290px;
            border-radius: 100%;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 50% 50%;
            background-image: url(${prop => prop.face});
        }
        .nick_name {
            // width: 140px;
            height: 41px;
            text-align: left;
            font-weight: bold;
            font-size: 28px;
            line-height: 41px;
            font-family: Spoqa Han Sans;
            letter-spacing: 0px;
            color: #000000;
            opacity: 1;
        }
        .category {
            margin-top: 29px;
            height: 27px;
            text-align: left;
            font-size: 18px;
            line-height: 27px;
            font-family: Spoqa Han Sans;
            font-weight: normal;
            letter-spacing: 0px;
            color: #777777;
            opacity: 1;
        }
        .count {
            display: flex;
            flex-direction: rows;
            justify-content: space-between;

            .item {
                height: 27px;
                text-align: left;
                font-size: 18px;
                font-weight: normal;
                line-height: 27px;
                font-family: Spoqa Han Sans;
                letter-spacing: 0px;
                color: #454545;
                opacity: 1;
            }

            .liked {
                i{
                    height: 27px;
                }
                height: 27px;
                text-align: left;
                font-size: 18px;
                font-weight: normal;
                line-height: 27px;
                font-family: Spoqa Han Sans;
                letter-spacing: 0px;
                color: #454545;
                opacity: 1;
                margin-right: 17px;
            }

         }
    }
`;
const FavoriteItemListWrapper = styled.div`
    margin-left: 46px;
    
`;

class Menu extends Component {
    render() {
        // const { nickName } = this.props.userInfo;
        const nickName = "국민대 CRC----";
        return (<MenuWrapper>
            <div className="greet"><b>{nickName ? nickName.slice(0, 6) : "회원"}</b>님<br />반갑습니다.</div>
            <div className="menu-element"><i className="bell outline icon"></i></div>
            <div className="menu-element"><i className="letter icon"></i></div>
            <div className="menu-element">로그아웃</div>
            <div className="menu-element">내 디자인 관리</div>
            <div className="menu-element">회원정보 수정</div>
        </MenuWrapper>);
    }
}
class Profile extends Component {
    render() {
        const { userInfo, MyDetail, Count } = this.props;
        console.log({ Count, MyDetail, userInfo })
        return (<ProfileWrapper face={(userInfo && userInfo.thumbnail && userInfo.thumbnail.l_img) || noface}>
            {/* (userInfo) || */}
            <div className="title">내 프로필</div>
            <div className="card">
                <div className="thumbnail"></div>
                <div className="nick_name">{(userInfo && userInfo.nickName) || "회원"}</div>
                <div className="category">{(MyDetail && MyDetail.categoryName) || "전체"}</div>
                <div className="count">
                    <div className="item">{(Count && Count.total_design) || 0}개의 아이템</div>
                    <div className="liked"><i className="heart outline icon"></i>{(Count && Count.total_like) || 0}</div>
                </div>
            </div>
        </ProfileWrapper>);
    }
}
class FavoriteItemList extends Component {
    render() {
        return (<FavoriteItemListWrapper> <div>관심 아이템</div>
            <div></div>
        </FavoriteItemListWrapper>);
    }
}

class MypageBody extends Component {

    render() {
        console.log(this.props)

        const { userInfo, Count, MyDetail } = this.props;

        return (<MyPageWrapper>
            {/* menu */}
            <Menu userInfo={userInfo}>
            </Menu>

            {/* profile */}
            <Profile userInfo={userInfo} MyDetail={MyDetail} Count={Count}>
            </Profile>

            {/* favorite-item */}
            <FavoriteItemList itemList={null}>
            </FavoriteItemList>

        </MyPageWrapper>);
    }
}

// //css
// const MypageBodyComp = styled.div`
//     padding-bottom:50px;
//     font-family: Noto Sans KR;
//     .MypageCategory{
//         display: flex;
//         justifyContent: space-start;
//         font-size: 20px;
//         color: #707070;
//     }}
//     .selectedCate {
//         opacity: 1.0;
//     }
//     .unSelectedCate {
//         opacity: 0.5;
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
//     .interested-first-scroll {
//         padding-top: 15px;
//     }
// `;
// const CategoryItems = styled.div`
//     padding-left: ${props => props.paddingLeft}px;
//     padding-top: ${props => props.paddingTop}px;
//     opacity: ${props => props.opacity};
//     cursor: pointer;
//     opacity: ${props => props.opacity};
//     @media only screen and (min-width: ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width: ${opendesign_style.resolutions.SmallMaxWidth}px) {
//       font-size: 15px;
//       width: max-content;
//       margin: 0px;
//       padding: 13px;
//     }
// `;
// class MypageBody extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             /*reload: false,*/
//             this_order: { text: "최신순", keyword: "update" },
//             orders: [{ text: "최신순", keyword: "update" }, { text: "최신순", keyword: "update" }, { text: "최신순", keyword: "update" },],
//             cateIndex: 0,
//         };
//     };
//     handleReload = () => {
//         this.setState({ reload: false });
//     };
//     componentDidMount() {
//         this.getInitData();
//     };
//     componentWillReceiveProps(nextProps) {
//         if (nextProps.Count !== this.props.Count) {
//             this.setTab(nextProps.Count);
//         }
//     };
//     setTab = (props) => {
//         const { total_design, total_group, joined_group, total_favorite } = props;
//         // console.log("index", props);
//         let tabindex = 0;
//         if (total_group === 0) {
//             tabindex = 1;
//         }
//         if (total_group === 0 && joined_group === 0) {
//             tabindex = 2;
//         }
//         if (total_group === 0 && joined_group === 0 && total_design === 0) {
//             tabindex = 3;
//         }
//         if (total_group === 0 && joined_group === 0 && total_design === 0 && total_favorite === 0) {
//             tabindex = 0;
//         }
//         if (total_group !== 0 && joined_group === 0 && total_design !== 0 && total_favorite !== 0) {
//             tabindex = 0;
//         }
//         this.setState({ cateIndex: tabindex });
//     };
//     getInitData() {
//         this.getLikeGroupList(0);
//         this.getLikeDesignList(0);
//         this.getLikeDesignerList(0);
//         this.getMyDesignListRequest(0);
//         this.getMyGroupListRequest(0);
//         this.getRelatedGroupInDesignerRequest(0);
//     };
//     getLikeDesignList = async (page) => {
//         this.props.id && this.props.GetLikeInDesignerRequest(this.props.id, page, this.state.orders[0].keyword);
//     };
//     getLikeDesignerList = async (page) => {
//         this.props.id && this.props.GetLikeDesignerInDesignerRequest(this.props.id, page, this.state.orders[2].keyword);
//     };
//     getLikeGroupList = async (page) => {
//         this.props.id && this.props.GetLikeGroupInDesignerRequest(this.props.id, page, this.state.orders[1].keyword);
//     };
//     getMyGroupListRequest = async (page) => {
//         this.props.id && this.props.GetGroupInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
//     };
//     getMyDesignListRequest = async (page) => {
//         this.props.id && this.props.GetMyDesignInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
//     };
//     getRelatedGroupInDesignerRequest = async (page) => {
//         this.props.id && this.props.GetRelatedGroupInDesignerRequest(this.props.id, page, this.state.this_order.keyword);
//     };
//     changeCategory = (index) => {
//         this.setState({ cateIndex: index, this_order: { text: "최신순", keyword: "update" } });
//     };
//     handleChangeOrderOps = async (order, getfunc) => {
//         await this.setState({ this_order: order });
//         getfunc(0);
//     }
//     handleChangeSubOrder = async (num, order, getfunc) => {
//         let copy = [...this.state.orders];
//         await copy.splice(num, 1, order);
//         console.log(copy);
//         await this.setState(copy);
//         getfunc(0);
//     }

//     render() {
//         const { Count, MyLikeDesign, MyLikeDesigner, MyLikeDesignAdded, MyLikeDesignerAdded, MyGroup, MyGroupAdded, MyDesign, MyDesignAdded, MyLikeGroup, MyLikeGroupAdded, RelatedGroup, RelatedGroupAdded } = this.props;
//         const { this_order } = this.state;
//         return (
//             <MypageBodyComp>
//                 <div className="MypageCategory">
//                     <CategoryItems paddingTop={42} paddingLeft={42} opacity={this.state.cateIndex === 0 ? "1.0" : "0.5"} onClick={() => this.changeCategory(0)}>그룹({NumberFormat(Count.total_group || 0)})</CategoryItems>
//                     <CategoryItems paddingTop={42} paddingLeft={42} opacity={this.state.cateIndex === 1 ? "1.0" : "0.5"} onClick={() => this.changeCategory(1)}>참여그룹({NumberFormat(Count.joined_group || 0)})</CategoryItems>
//                     <CategoryItems paddingTop={42} paddingLeft={42} opacity={this.state.cateIndex === 2 ? "1.0" : "0.5"} onClick={() => this.changeCategory(2)}>디자인({NumberFormat((Count.total_design || 0) + (Count.joined_design || 0))})</CategoryItems>
//                     <CategoryItems paddingTop={42} paddingLeft={42} opacity={this.state.cateIndex === 3 ? "1.0" : "0.5"} onClick={() => this.changeCategory(3)}>관심항목({NumberFormat(Count.total_favorite || 0)})</CategoryItems>
//                 </div>

//                 {this.state.cateIndex === 0 &&
//                     <div className="compWrapper" style={{ paddingTop: "35px" }}>
//                         {this.props.status === "INIT" ?
//                             <Loading /> :
//                             <div>
//                                 <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyGroupListRequest)} selected={this_order} />
//                                 <ScrollList {...opendesign_style.group_margin} type="group" dataList={MyGroup} dataListAdded={MyGroupAdded} getListRequest={this.getMyGroupListRequest} />
//                             </div>}
//                     </div>}

//                 {this.state.cateIndex === 1 &&
//                     <div className="compWrapper" style={{ paddingTop: "35px" }}>
//                         {this.props.status === "INIT" ?
//                             <Loading /> :
//                             <div>
//                                 <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getRelatedGroupInDesignerRequest)} selected={this_order} />
//                                 <ScrollList {...opendesign_style.group_margin} type="group" dataList={RelatedGroup} dataListAdded={RelatedGroupAdded} getListRequest={this.getRelatedGroupInDesignerRequest} />
//                             </div>}
//                     </div>}

//                 {this.state.cateIndex === 2 &&
//                     <div className="compWrapper" style={{ paddingTop: "35px" }}>
//                         {this.props.status === "INIT" ?
//                             <Loading /> :
//                             <div>
//                                 <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getMyDesignListRequest)} selected={this_order} />
//                                 <ScrollList {...opendesign_style.design_margin} type="design" dataList={MyDesign} dataListAdded={MyDesignAdded} getListRequest={this.getMyDesignListRequest} />
//                             </div>}
//                     </div>}

//                 {this.state.cateIndex === 3 &&
//                     <div className="compWrapper">
//                         <div className="interested">관심있는 디자인({NumberFormat(Count.like_group)})</div>
//                         {this.props.status === "INIT" ?
//                             <Loading /> :
//                             <ScrollList manual {...opendesign_style.design_margin} type="design" dataList={MyLikeDesign} dataListAdded={MyLikeDesignAdded} getListRequest={this.getLikeDesignList} />
//                         }
//                         <div className="interested">관심있는 그룹({NumberFormat(Count.like_design)})</div>
//                         {this.props.status === "INIT" ?
//                             <Loading /> :
//                             <ScrollList manual {...opendesign_style.group_margin} type="group" dataList={MyLikeGroup} dataListAdded={MyLikeGroupAdded} getListRequest={this.getLikeGroupList} />
//                         }
//                         <div className="interested">관심있는 디자이너({NumberFormat(Count.like_designer)})</div>

//                         {this.props.status === "INIT" ?
//                             <Loading /> :
//                             <ScrollList manual {...opendesign_style.designer_margin} type="designer" dataList={MyLikeDesigner} dataListAdded={MyLikeDesignerAdded} getListRequest={this.getLikeDesignerList} />
//                         }
//                     </div>}
//             </MypageBodyComp>
//         )
//     }
// }

export default MypageBody;