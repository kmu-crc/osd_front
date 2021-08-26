import React, { Component } from 'react';
import styled from 'styled-components';

// //component
import { MyMenu, MyProfile } from 'components/MyDetail';

import ScrollList from "components/Commons/ScrollList"
import Design from 'components/Designs/Design';
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
    .spacer-4 { 
        margin-left: 39px;
        // margin-top: 62px;
        width: 0px;
        height: 871px;
        border-left: 2px solid #CCCCCC;
        opacity: 1;
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

const ItemList = ({ getList, itemList, itemListAdded, tab, order = "like", onClickedOrder = () => alert('함수를 넘겨주세요.') }) =>
    <FavoriteItemListWrapper>
        <div className="top">
            {/* <div className="title">
                {tab === "manage" ? "내 디자인" : null}
                {tab === "design" ? "참여/내 디자인" : null}
                {tab === "group" ? "관심 그룹" : null}
                {tab === "designer" ? "관심 디자이너" : null}
            </div> */}
            {tab !== "manage" ?
                <div className="order">
                    <a className={`${order === "like" ? "active" : ""}`} onClick={() => onClickedOrder("like")}>
                        <span>인기순 보기</span>
                    </a>
                    <a className={`${order === "update" ? "active" : ""}`} onClick={() => onClickedOrder("update")}>
                        <span>최신순 보기</span>
                    </a>
                </div>
                : null}
        </div>
        <div className="grid">
            <ScrollList
                {...designmargin}
                // {...opendesign_style.design_margin}
                // {...opendesign_style.group_margin}
                type={tab === "manage" ? "design" : tab}
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
        // this.getLikeDesignList(0);
        // this.getLikeGroupList(0);
        // this.getLikeDesignerList(0);
        this.getMyDesignList(0);
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
    getMyDesignList = async (page) => {
        const { order } = this.state;
        const { id } = this.props;
        id && this.props.GetMyDesignInDesignerRequest(id, page, order);
    };
    // getRelatedGroupInDesignerRequest = async (page) => { this.props.id && this.props.GetRelatedGroupInDesignerRequest(this.props.id, page, this.state.this_order.keyword); };

    getDataList = async tab => {
        if (tab === "design") {
            await this.getLikeDesignList(0);
        }
        else if (tab === "group") {
            await this.getLikeGroupList(0);
        }
        else if (tab === "designer") {
            await this.getLikeDesignerList(0);
        } else if (tab === "manage") {
            await this.props.GetTheBestDesignDesignerRequest(this.props.id);
            await this.getMyDesignList(0);
        }
    };
    gotoCreateDesign = () => {
        window.location.href = "/createdesign";
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
        const {
            MyLikeDesign, MyLikeDesigner, MyLikeDesignAdded, MyLikeDesignerAdded,
            MyGroup, MyGroupAdded, MyDesign, MyDesignAdded, TheBestDesign,
            MyLikeGroup, MyLikeGroupAdded, RelatedGroup, RelatedGroupAdded } = this.props;
        console.log({ MyLikeDesign, MyLikeDesigner, MyLikeDesignAdded, MyLikeDesignerAdded, MyGroup, MyGroupAdded, MyDesign, MyDesignAdded, TheBestDesign, MyLikeGroup, MyLikeGroupAdded, RelatedGroup, RelatedGroupAdded });

        const { userInfo, Count, MyDetail } = this.props;
        const { tab, order } = this.state;
        // console.log("====", MyDesignAdded && MyDesignAdded.filter(design => design.uid !== TheBestDesign.uid), TheBestDesign);
        return (<MyPageWrapper>

            <div className="spacer-1">&nbsp;</div>

            {/* menu */}
            <MyMenu
                tab={tab}
                Count={Count}
                changeTab={this.changeTab}
                nickName={(userInfo && userInfo.nickName) || "회원"} />

            <div className="spacer-2">&nbsp;</div>

            {tab === "manage"

                ? <React.Fragment>
                    {/* best design */}
                    <BestDesign className="row">

                        <div>
                            <div className="title">베스트 디자인</div>

                            <div>
                                {/* {TheBestDesign ? TheBestDesign.user_id : null} */}
                                {TheBestDesign
                                    ? <Design data={TheBestDesign} />
                                    : null}

                                <div className="create-design">
                                    <a onClick={this.gotoCreateDesign} className="button">내 디자인 등록하기</a>
                                </div>
                            </div>

                        </div>

                        <div className="spacer-4">&nbsp;</div>

                        <div>
                            <ItemList
                                tab={tab}
                                itemList={MyDesign
                                    && MyDesign.filter(design => design.uid !== TheBestDesign.uid)}
                                itemListAdded={MyDesignAdded
                                    && MyDesignAdded.filter(design => design.uid !== TheBestDesign.uid)}
                                getList={this.getLikeGroupList}
                            />
                        </div>

                    </BestDesign>

                </React.Fragment>


                : <React.Fragment>
                    <MyProfile
                        tab={tab}
                        userInfo={userInfo}
                        MyDetail={MyDetail}
                        Count={Count}
                        changeTab={this.changeTab}
                    />

                    <div className="spacer-3">&nbsp;</div>

                    {tab === "design" ?
                        <ItemList
                            tab="design"
                            order={order}
                            onClickedOrder={this.changedOrder}
                            itemList={MyDesign}
                            itemListAdded={MyDesignAdded}
                            getList={this.getMyDesignList}
                        /> : null}
                    {tab === "group" ?
                        <ItemList
                            tab="group"
                            order={order}
                            onClickedOrder={this.changedOrder}
                            itemList={MyLikeGroup}
                            itemListAdded={MyLikeGroupAdded}
                            getList={this.getLikeGroupList}
                        /> : null}
                    {tab === "designer" ?
                        <ItemList
                            tab="designer"
                            order={order}
                            onClickedOrder={this.changedOrder}
                            itemList={MyLikeDesigner}
                            itemListAdded={MyLikeDesignerAdded}
                            getList={this.getLikeDesignerList}
                        /> : null}

                </React.Fragment>
            }
        </MyPageWrapper>);
    }
}

export default MypageBody;

