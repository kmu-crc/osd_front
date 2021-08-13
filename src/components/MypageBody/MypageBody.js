import React, { Component } from 'react';
import styled from 'styled-components';

// //component
import { MyMenu, MyProfile } from 'components/MyDetail';

import ScrollList from "components/Commons/ScrollList"
// import opendesign_style from 'opendesign_style';
// import Loading from 'components/Commons/Loading'
// import opendesign_style from 'opendesign_style';
// import NumberFormat from 'modules/NumberFormat';
// import OrderOption from "components/Commons/OrderOption";

const MyPageWrapper = styled.div`
    margin-left: 100px;
    margin-top: ${90 + 24}px;

    display: flex;
    flex–direction: rows;

    .spacer-1 {
        margin-left: 39px;
    }
    .spacer-2 {
        margin-left: 56px;
    }
    .spacer-3 { 
        margin-left: 39px;
        margin-top: 62px;
        width: 0px;
        height: 871px;
        border-left: 2px solid #CCCCCC;
        opacity: 1;
    }
`;
const FavoriteItemListWrapper = styled.div`
    // *{border:1px dashed red;}

    margin-left: 46px;
    
    // width: 100%;
    width: 1168px;
    height: 100%;

    .top {

        display: flex;
        justify-content: space-between;

        .title {
            margin-left: 30px;

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
            a {
                width: 128px;
                height: 34px;
                opacity: 1;
                padding: 4.5px 17px; 
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
        // padding-right: 16px;
        overflow: hidden scroll;

        // scroll
        // width
        ::-webkit-scrollbar {
          width: 16px;
        }
        // track
        ::-webkit-scrollbar-track {
          background: rgba(233, 233, 233, 0.2);
        }
        // handle
        ::-webkit-scrollbar-thumb {
          background: #F00;
        }
        // handle on hover
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

const ItemList = ({ getList, itemList, itemListAdded, tab, order = "like", onClickedOrder = () => alert('함수를 넘겨주세요.') }) =>
    <FavoriteItemListWrapper>
        <div className="top">
            <div className="title">
                {tab === "design" ? "관심디자인" : null}
                {tab === "group" ? "관심그룹" : null}
                {tab === "designer" ? "관심디자이너" : null}
            </div>
            <div className="order">
                <a className={`${order === "like" ? "active" : ""}`} onClick={() => onClickedOrder("like")}>
                    <span>인기순 보기</span>
                </a>
                <a className={`${order === "update" ? "active" : ""}`} onClick={() => onClickedOrder("update")}>
                    <span>최신순 보기</span>
                </a>
            </div>
        </div>
        <div className="grid">
            <ScrollList
                {...designmargin}
                // {...opendesign_style.design_margin}
                // {...opendesign_style.group_margin}
                type={tab}
                dataList={itemList}
                dataListAdded={itemListAdded}
                getListRequest={getList} />
        </div>
    </FavoriteItemListWrapper>

class MypageBody extends Component {
    constructor(props) {
        super(props);
        this.state = { tab: "design", order: "update"/* or like */ };
    }
    componentDidMount() {
        this.getInitData();
    }
    getInitData() {
        this.getLikeDesignList(0);
        // this.getLikeGroupList(0);
        // this.getLikeDesignerList(0);
        // this.getMyDesignListRequest(0);
        // this.getMyGroupListRequest(0);
        // this.getRelatedGroupInDesignerRequest(0);
    };
    getLikeDesignList = async (page) => {
        const { order } = this.state;
        const { id } = this.props;
        id && this.props.GetLikeInDesignerRequest(id, page, order);
    };
    getLikeGroupList = async (page) => {
        const { order } = this.state;
        const { id } = this.props;
        id && this.props.GetLikeGroupInDesignerRequest(id, page, order);
    };
    getLikeDesignerList = async (page) => {
        const { order } = this.state;
        const { id } = this.props;
        id && this.props.GetLikeDesignerInDesignerRequest(id, page, order);
    };
    // getMyGroupListRequest = async (page) => { this.props.id && this.props.GetGroupInDesignerRequest(this.props.id, page, this.state.this_order.keyword); };
    getMyDesignListRequest = async (page) => {
        const { id } = this.props;
        id && this.props.GetMyDesignInDesignerRequest(id, page, "update");
    };
    // getRelatedGroupInDesignerRequest = async (page) => { this.props.id && this.props.GetRelatedGroupInDesignerRequest(this.props.id, page, this.state.this_order.keyword); };

    getDataList = tab => {
        if (tab === "design") {
            this.getLikeDesignList(0);
        }
        else if (tab === "group") {
            this.getLikeGroupList(0);
        }
        else if (tab === "designer") {
            this.getLikeDesignerList(0);
        } else if (tab === "manage") {
        }
    };

    changedOrder = async (order) => {
        await this.setState({ order: order });
        const { tab } = this.state;
        this.getDataList(tab);
    };
    changeTab = async (tab) => {
        await this.setState({ tab: tab });
        this.getDataList(tab);
    };
    render() {
        const { MyLikeDesign, MyLikeDesigner, MyLikeDesignAdded, MyLikeDesignerAdded, MyGroup, MyGroupAdded, MyDesign, MyDesignAdded, MyLikeGroup, MyLikeGroupAdded, RelatedGroup, RelatedGroupAdded } = this.props;
        console.log({ MyLikeDesign, MyLikeDesigner, MyLikeDesignAdded, MyLikeDesignerAdded, MyGroup, MyGroupAdded, MyDesign, MyDesignAdded, MyLikeGroup, MyLikeGroupAdded, RelatedGroup, RelatedGroupAdded });

        const { userInfo, Count, MyDetail } = this.props;
        const { tab, order } = this.state;

        return (<MyPageWrapper>
            <div className="spacer-1">&nbsp;</div>
            {/* menu */}
            <MyMenu
                Count={Count}
                nickName={(userInfo && userInfo.nickName) || "회원"} />

            <div className="spacer-2">&nbsp;</div>

            {tab === "manage"

                ? <React.Fragment>
                    {/* best design */}
                    <BestDesign>
                        <div className="title"></div>


                    </BestDesign>

                    {/* itemlist */}
                    <ItemList />

                </React.Fragment>


                : <React.Fragment>
                    {/* profile */}
                    <MyProfile
                        tab={tab}
                        userInfo={userInfo}
                        MyDetail={MyDetail}
                        Count={Count}
                        changeTab={this.changeTab}
                    />

                    <div className="spacer-3">&nbsp;</div>

                    {/* favorite-item */}
                    {tab === "design" ?
                        <ItemList
                            tab="design"
                            order={order}
                            onClickedOrder={this.changedOrder}
                            itemList={MyLikeDesign}
                            itemListAdded={MyLikeDesignAdded}
                            getList={this.getLikeDesignList}
                        />
                        : tab === "group" ?
                            <ItemList
                                tab="group"
                                order={order}
                                onClickedOrder={this.changedOrder}
                                itemList={MyLikeGroup}
                                itemListAdded={MyLikeGroupAdded}
                                getList={this.getLikeGroupList}
                            />
                            : tab === "designer" ?
                                <ItemList
                                    tab="designer"
                                    order={order}
                                    onClickedOrder={this.changedOrder}
                                    itemList={MyLikeDesigner}
                                    itemListAdded={MyLikeDesignerAdded}
                                    getList={this.getLikeDesignerList}
                                />
                                : null
                    }

                </React.Fragment>
            }
        </MyPageWrapper>);
    }
}

export default MypageBody;

