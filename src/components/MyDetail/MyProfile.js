import React from 'react';
import styled from 'styled-components';
import noface from "source/thumbnail.png";
import Icon from '@material-ui/core/Icon';
import NumberFormat from 'modules/NumberFormat';
import DateFormat from 'modules/DateFormat';


const Wrapper = styled.div`
`;
const Title = styled.div`
    // margin-top: 24px;

    width: 110px;
    height: 40px;
    text-align: center;
    font-weight: medium;
    font-size: 28px;
    line-height: 40px;
    font-family: Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
`;
const Profile = styled.div`
    margin-top: 20px;

    width: 350px;
    height: 539px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 8px 8px 8px #0000002B;
    opacity: 1;

    .thumbnail {
        margin-top: 28px;
        margin-left: 30px;
        width: 290px;
        height: 290px;
        background-color: transparent;
        background-image: url(${prop => prop.face});
        background-position: 0% 0%;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 100%;
        opacity: 1;
    };

    .nick-cate { 
        margin-top: 28px;
        margin-left: 19px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: middle;

        .nick {
            width: 200px;
            height: 41px;
            text-align: left;
            font-weight: bold;
            font-size: 28px;
            line-height: 41px;
            font-family: Spoqa Han Sans;
            letter-spacing: 0px;
            color: #000000;
            opacity: 1;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .cate {

            margin: auto;
            margin-right: 27px;
            width: 66px;
            height: 27px;
            text-align: left;
            font-weight: normal;
            font-size: 18px;
            line-height: 27px;
            font-family: Spoqa Han Sans;
            letter-spacing: 0px;
            color: #454545;
            opacity: 1;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
 
        }
    }
    .update-intro { 
        margin-top: 3px;
        padding:0px 17px 0px 17px;
        .update {
            height: 27px;
            text-align: left;
            font-weight: normal;
            font-size: 18px;
            line-height: 27px;
            font-family: spoqa han sans;
            letter-spacing: 0px;
            color: #777777;
            opacity: 1;
        }
        .intro {
            padding: 2px;
            height: 54px;
            font-weight: normal;
            font-size: 18px;
            line-height: 27px;
            font-family: spoqa han sans;
            text-align: left;
            letter-spacing: 0px;
            color: #777777;
            opacity: 1;
            overflow: hidden auto;
            ::-webkit-scrollbar {
                width: 8px;
              }
            ::-webkit-scrollbar-track {
                background: white;
            }
              ::-webkit-scrollbar-thumb {
                background: red;
                border-right: 4px white solid;
                border-radius:0px;
                background-clip: padding-box;
              }
        }
    };
    .counter { margin-top: 30px; };
`;
const TabMenu = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;

    .border {
        width: 118px;
        height: 0px;
        border-bottom: 2px solid #707070;
        opacity: 1;
    }
    .menu {
        margin: auto;
        height: 100%; 
        width: 118px; 
        padding-top: 22px; 
        padding-bottom: 22px;
        cursor: pointer;
        :hover {
            background-color: rgba(112, 112, 112, .01);
        }
    }
    .group {
        margin: auto;
        width: 58px;
        height: 40px;
        text-align: center;
        font-weight: medium;
        font-size: 28px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        &.active { color: red;}
        :hover { color: #FF0000; }
    }
    .join-group {
        margin: auto;
        width: 104px;
        height: 40px;
        text-align: center;
        font-weight: medium;
        font-size: 28px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        &.active { color: red;}
        :hover { color: #FF0000; }
    }
    .design {
        margin: auto;
        width: 78px;
        height: 40px;
        text-align: center;
        font-weight: medium;
        font-size: 28px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        &.active { color: red;}
        :hover { color: #FF0000; }
    }
    .like {
        margin: auto;
        width: 104px;
        height: 40px;
        text-align: center;
        font-weight: medium;
        font-size: 28px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        &.active { color: red;}
        :hover { color: #FF0000; }
    }
`;

const CountDiv = styled.div`
    display: flex;
    flex-direction: row;
    height: 38px;
    margin-left: 19px;

    .icon {
        width: 38px;
        margin-right: 9px;
    }
    .num {
        margin-right: 9px;
        :last-child{margin-right:0px;}
        width: max-content; //46px;
        height: 38px;
        text-align: left;
        font-weight: normal;
        font-size: 26px;
        line-height: 38px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
    }
`;

const Counter = ({ view, like, my }) => {
    return (<CountDiv>
        <div className="icon">
            <Icon style={{ fontSize: "38px" }}>visibility</Icon>
        </div>
        <div className="num">{view}</div>

        <div className="icon">
            <Icon style={{ fontSize: "38px", color: "red" }}>favorite_outline</Icon>
        </div>
        <div className="num">{like}</div>

        <div className="icon">
            <Icon style={{ fontSize: "38px" }}>article</Icon>
        </div>
        <div className="num">{my}</div>

    </CountDiv>)
}

export class MyProfile extends React.Component {

    gotoGroup = () => {
        this.props.changeTab("group");
    };
    gotoJoinGroup = () => {
        this.props.changeTab("join-group");
    };
    gotoDesign = () => {
        this.props.changeTab("design");
    };
    gotoLikePage = () => {
        this.props.changeTab("like");
    };

    render() {
        const { userInfo, MyDetail, Count, tab } = this.props;
        console.log("tab:::::",tab);
        return (<Wrapper>
            <Title>내 프로필</Title>

            <Profile face={(userInfo && userInfo.thumbnail && userInfo.thumbnail.l_img) || noface} >
                {/* thumbnail */}
                <div className="thumbnail" />

                {/* nick and cate */}
                <div className="nick-cate">
                    <div className="nick" title={userInfo && userInfo.nickName}>
                        {userInfo && userInfo.nickName}
                    </div>
                    <div className="cate" title={MyDetail && MyDetail.categoryName}>
                        {MyDetail && MyDetail.categoryName}
                    </div>
                </div>

                {/* update and intro */}
                <div className="update-intro">
                    <div className="update">{MyDetail && DateFormat(MyDetail.update_time)}</div>
                    <div className="intro">{MyDetail && MyDetail.about_me}</div>
                </div>

                {/* counter */}
                <div className="counter">
                    <Counter
                        view={(Count && NumberFormat(Count.total_view)) || 0}
                        like={(Count && NumberFormat(Count.total_like)) || 0}
                        my={(Count && NumberFormat((Count.total_design + Count.total_group))) || 0}
                    />
                </div>

            </Profile>

            <TabMenu>
                <a onClick={this.gotoGroup}>
                    <div className="menu border">
                        <div className={`group ${tab=="group"&&"active"}`}>그룹</div>
                    </div>
                </a>
                <a onClick={this.gotoJoinGroup}>
                    <div className="menu border">
                        <div className={`join-group ${tab=="join-group"&&"active"}`}>참여그룹</div>
                    </div>
                </a>
                <a onClick={this.gotoDesign}>
                    <div className="menu border">
                        <div className={`design ${tab=="design"&&"active"}`}>디자인</div>
                    </div>
                </a>
                <a onClick={this.gotoLikePage}>
                    <div className="menu ">
                        <div className={`like ${tab=="like"&&"active"}`}>관심항목</div>
                    </div>
                </a>
            </TabMenu>

        </Wrapper>);
    };
};
