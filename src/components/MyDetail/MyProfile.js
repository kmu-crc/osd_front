import React from 'react';
import styled from 'styled-components';
import noface from "source/thumbnail.png";
import Icon from '@material-ui/core/Icon';
import NumberFormat from 'modules/NumberFormat';

const Wrapper = styled.div`
    width: 374px;
    
    .title {
        margin-bottom: 44px;

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
    .thumbnail {
        margin-left: 42px;
        margin-bottom: 11px;

        width: 290px;
        height: 290px;
        border-radius: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
        background-image: url(${prop => prop.face});
    }
    .nick-and-mygroup {
        margin-bottom: 18px;

        display: flex;
        justify-content: space-between;

      .nick {
        width: max-content;
        max-width: 300px;
        height: 41px;
        text-align: center;
        font-weight: bold;
        font-size: 28px;
        line-height: 41px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1; 
        text-overflow: ellipsis;
      } 
      .mygroup {
        width: 70px;
        height: 27px;
        text-align: center;
        font-weight: normal;
        font-size: 18px;
        line-height: 27px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: #777777;
        opacity: 1;
      }
    }
    .introduce {
        margin-bottom: 34.39px;

        // width: 54px;
        // height: 27px;
        text-align: center;
        font-weight: normal;
        font-size: 18px;
        line-height: 27px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: #777777;
        opacity: 1;
    }

    .counter { 
        margin-bottom: 16px;
    }

    .create-design {
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
    .like-menu {
        height: 40px;
        text-align: center;
        font-weight: medium;
        font-size: 28px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        align-items: cetner;
        cursor: default;
        
        .like-design {
            margin-top: 45px;
            margin-bottom: 22px;
            :hover { background: #FAFAFA;}
        }
        .like-group {
            margin-top: 22px;
            margin-bottom: 15px;
            :hover { background: #FAFAFA;}
        }
        .like-designer {
            margin-top: 22px;
            margin-bottom: 15px;
            :hover { background: #FAFAFA;}
        }
        a{
            cursor: pointer;
        } 
        .border {
            border-bottom: 2px solid #707070;
        }
        .active {
            color: red;
        }
    }
`;

const CounterWrapper = styled.div`
    display: flex;
    ;
    width: 207px;
    height: 30px;
    ;
    .row {
        margin-right: 15px;
        :last-child {
            margin-right: 0px;
        }
        display: flex;
        justify-content: space-between;
    }
    .number {
        margin-left: 7px;

        width: max-content;
        height: 25px;
        text-align: left;
        font-weight: normal;
        font-size: 17px;
        line-height: 25px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
    }

`;
const Counter = ({ view, like, my }) =>
    <CounterWrapper>
        <div className="row">
            <Icon>visibility</Icon>
            <div className="number">{view}</div>
        </div>
        <div className="row">
            <Icon>favorite_border</Icon>
            <div className="number">{like}</div>
        </div>
        <div className="row">
            <Icon>article</Icon>
            <div className="number">{my}</div>
        </div>
    </CounterWrapper>;

export class MyProfile extends React.Component {

    gotoCreateDesign = () => {
        window.location.href = "/createDesign";
    };
    gotoLikeDesign = () => {
        this.props.changeTab("design");
    };
    gotoLikeGroup = () => {
        this.props.changeTab("group");
    };
    gotoLikeDesigner = () => {
        this.props.changeTab("designer");
    };
    gotoJoinGroup = () => { };

    render() {
        const { userInfo, MyDetail, Count, tab } = this.props;

        return (<Wrapper face={(userInfo && userInfo.thumbnail && userInfo.thumbnail.l_img) || noface}>

            {/* title */}
            <div className="title">내 프로필</div>

            {/* thumbnail */}
            <div className="thumbnail" />

            {/* nick & mygroup */}
            <div className="nick-and-mygroup">
                <div className="nick">
                    {userInfo && userInfo.nickName}</div>
                <div className="mygroup">
                    <a onClick={this.gotoJoinGroup}>참여그룹</a></div>
            </div>

            {/* 내 소개 */}
            <div className="introduce">
                {MyDetail && MyDetail.about_me}
            </div>

            {/* counter */}
            <div className="counter">
                <Counter
                    view={(Count && NumberFormat(Count.total_view)) || 0}
                    like={(Count && NumberFormat(Count.total_like)) || 0}
                    my={(Count && NumberFormat((Count.total_design + Count.total_group))) || 0}
                />
            </div>

            {/* create design */}
            <div className="create-design">
                <a onClick={this.gotoCreateDesign} className="button">내 디자인 등록하기</a>
            </div>

            <div className="like-menu">
                {/* interest design */}
                <div className={`border like-design ${tab === "design" ? "active" : ""}`}>
                    <a onClick={this.gotoLikeDesign}>관심 디자인</a>
                </div>
                {/* interest group */}
                <div className={`border like-group ${tab === "group" ? "active" : ""}`}>
                    <a onClick={this.gotoLikeGroup}>관심 그룹</a>
                </div>
                {/* interest designer */}
                <div className={`like-designer ${tab === "designer" ? "active" : ""}`}>
                    <a onClick={this.gotoLikeDesigner} >관심 디자이너</a>
                </div>
            </div>

        </Wrapper>);
    };
};
