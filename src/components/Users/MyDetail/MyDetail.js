import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/noimg.png";
import designimg from "source/design.jpg";
import adddesigner from "source/adddesigner.svg";
import addmaker from "source/addmaker.svg";
import confirmMe from "source/confirmMe.svg";

import LikeInDesignerContainer from "containers/Designer/LikeInDesignerContainer/LikeInDesignerContainer";
import LikeInMakerContainer from "containers/Maker/LikeInMakerContainer/LikeInMakerContainer";
import LikeInItemContainer from "containers/Products/LikeInItemContainer/LikeInItemContainer";
import MyPaymentContainer from "containers/Payment/MyPaymentContainer";
import MySalesContainer from "containers/Payment/MySalesContainer";
import MyRequestItemContainer from "containers/Payment/MyRequestItemContainer";
import UploadItemContainer from "containers/Items/UploadItemContainer/UploadItemContainer";
import MyProjectItemContainer from "containers/Items/MyProjectItemContainer/MyProjectItemContainer";
import MyUploadDesignReqBoardContainer from "components/Request/MyUploadDesignReqBoardContainer/MyUploadDesignReqBoardContainer";
import MyUploadMakerReqBoardContainer from "components/Request/MyUploadMakerReqBoardContainer/MyUploadMakerReqBoardContainer";
import ModifyMyDetailContainer from "containers/MyPage/ModifyMyDetailContainer/ModifyMyDetailContainer";
import MyPointStatusContainer from "containers/Point/PointContainer";

import category_icon from "source/category_icon.svg";
import market_style from "market_style";
import { Dropdown } from "semantic-ui-react";
const CustomIcon = styled.div`
  width:${props => props.width}px;
  height:${props => props.height}px;
  background-image:url(${props => props.imgURL});
  background-repeat: no-repeat;
  background-size: contain;
  padding:${props => props.padding}px;
  display:${props => props.isNon == true ? "none" : "block"}
  margin-left:15px;
  `

const MainBox = styled.div`
  width: 100%;
  padding:0px 30px 0px 30px;
  margin-top: 37px;
  .header {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
  }
  .contents {
    width: 100%;
    height: max-content;
    display: flex;
    .dropBox{
      display:none;
    }
    .menuBox{
      display:block;
    }
  }
  @media only screen and (min-width: 500px) and (max-width: 1000px) {
    .contents{
      flex-direction:column;
      .dropBox{
        display:flex;
        margin-bottom:20px;
      }
      .menuBox{
        display:none;
      }
    }
  }
`;
const ProfileBox = styled.div`
*{
  // border:1px solid black;
}
    border: 1px solid transparent;
    width: 240px;
    height: 335px;
    background: #FFFFFF;
    box-shadow: 3px 3px 5px #4141411A;
    border: 0.5px solid #EAEAEA;
    border-radius: 20px;
    padding:10px;
    display:flex;
    flex-direction:column;
    align-items:center;
    .fontNormal{font-size:${market_style.font.size.normal1};}
    .fontSmall{font-size:${market_style.font.size.small1};}
    .fontMini{font-size:${market_style.font.size.mini2};}
    .fontStyleNormal{font-family:Noto Sans KR; font-weight:500;}
    .fontStyleLight{font-family:Noto Sans KR; font-weight:200;}
    .red{color:#FF3838;}
    .normal{color:#060000;}
    .nickName{
      text-align:center;
      width:80%;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      height:27px;
      font-weight: 500;
      font-weight: 500;
      font-size:${market_style.font.size.normal1};
      color: #060000;
    }

  .imageBox {
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom:7px;
  }
  .LabelBox {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .marginTop1{
    margin-top:10px;
  }
  .marginTop2{
    margin-top:6px;
  }
`;
const InformationBox = styled.div` 
width:100%;
height:335px;
border:0.5px solid #eaeaea;
box-shadow: 3px 3px 5px #0000001A;
border-radius: 20px;
padding:55px 0px 55px 0px;
display:flex;
margin-left:20px;

.innerBox{
  width:100%;
  max-width:360px;
  height:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  .text{
    width:max-content;
    height:54px;
    font-size:${market_style.font.size.normal1};
    margin-bottom:34px;
    text-align:center;
  }
  .imgBox{
    height:70px;
    margin-bottom:34px;
    .img{
      width:100%;
      height:100%;
    }
  }
  .button{
    width:max-content;
    height:15px;
    font-size:${market_style.font.size.small3};
    display:flex;
    cursor:pointer;
  }
}
.largeWidth{
  max-width:341px;
}
.hrLine{
  width:2px;
  height:100%;
  background-color:#E9E9E9;
}
@media only screen and (min-width: 500px) and (max-width: 1000px) {
  flex-direction:column;
  padding:15px;
  .innerBox{
    .text{
      display:none;
    }
    .imgBox{
      height:50px;
      margin-bottom:10px;
      margin-right:10px;
    }
    .button{
      font-size:${market_style.font.size.small3};
    }
    max-width:100%;
    display:flex;
    flex-direction:column;
  }
  .hrLine{
    width:100%;
    height:2px;
    margin-top:5px;
    margin-bottom:5px;
  }
}
`;
const MenuBox = styled.div`
    *{
      color:#060000;
    }
    min-width:240px;
    height:max-content;
    box-shadow: 3px 3px 5px #0000001A;
    border: 0.5px solid #EAEAEA;
    border-radius: 20px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    padding:30px 33px 30px 33px;
    padding-bottom:30px;
    margin-bottom:50px;
    .hrLine{
      border:0.5px solid #707070;
      opacity:0.2;
      margin-bottom:17.5px;
    }
    @media only screen and (min-width: 500px) and (max-width: 1000px) {

    }
`;
const MenuButton = styled.div`
  width:100%;
  height:20px;
  font-size:${market_style.font.size.small1};
  font-family:Noto Sans KR;
  font-weight:300;
  cursor:pointer;
  margin-bottom:17.5px;
  text-align:center;
  color:${props => props.fontColor == null ? "#060000" : props.fontColor};
  @media only screen and (min-width: 500px) and (max-width: 1000px) {
    margin-bottom:0px;
    height:max-content;
  }
`;
const BoardBox = styled.div`
    max-width:1046px;
    width:100%;
    height:max-content;
    box-shadow: 3px 3px 5px #00000029;
    border: 0.5px solid #EAEAEA;
    border-radius: 20px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    margin-left:20px;
    margin-bottom:50px;
    padding:50px;
    .flex{
      display:flex;
    }
    .wrap{
      margin-bottom:50px;
      .wrapItem{
        margin-right:50px;
      }
      .alignRight{
        text-align:right;
      }
      .redText{
        color:#FF3838;
        cursor:pointer;
      }
      .title {
        color: #000000;
        font-size:${market_style.font.size.normal1};
        font-weight: 500;
        line-height: 28px;
        text-align: left;
      };
    
      .list {
        margin-top: 72px;
        font-weight: 300;
        font-size:${market_style.font.size.normal1};
        text-align: left;
        line-height: 27px;
        color: #000000;
    
        display:flex;
        flex-direction:column;
        align-items:center;
        .line {
          width:1300px;
          display: flex;
          flex-direction: row;
          margin-bottom: 37px;
          .title_text{
            width:750px;
            height:29px;
            overflow:hidden;
            margin-right:130px;
          }
          .sub_text{
            margin-left:70px;
          }
        }
      }
    }
      @media only screen and (min-width: 500px) and (max-width: 1000px) {
        margin-left:0px;
        height:max-content;
        padding:30px;
      }
`;
const Thumbnail = styled.div`
    width:220px;
    height:220px;
    border-radius:50%;
    background-image:url(${props => props.URL == null ? noimg : props.URL});
    background-repeat:norepeat;
    background-position:center;
    background-size:cover;
    cursor:pointer
`;

class MyDetail extends Component {

  constructor(props) {
    super(props);
    this.state = { selectMenu: parseInt(this.props.index, 10) }
    this.onClickMenu = this.onClickMenu.bind(this);
    this.onClickCreateDesigner = this.onClickCreateDesigner.bind(this);
    this.onClickCreateMaker = this.onClickCreateMaker.bind(this);
    this.onClickThumbnail = this.onClickThumbnail.bind(this);
    this.onChangeDropMenu = this.onChangeDropMenu.bind(this);
  }
  onClickCreateDesigner(event) {
    if (this.props.MyDetail.isDesigner === 1) {
      window.location.href = "/modifyDesigner/" + this.props.MyDetail.uid;
    } else {
      window.location.href = "/createDesigner";
    }
  }
  onClickCreateMaker(event) {
    if (this.props.MyDetail.isMaker === 1) {
      window.location.href = "/modifyMaker/" + this.props.MyDetail.uid;
    }
    else {
      window.location.href = "/createMaker";
    }
  }
  onClickMenu(event) {
    const menuNames = [
      "orderlist",
      "interest_Item",
      "interest_Designer",
      "interest_Maker",
      "join_project",
      "request_designer",
      "request_maker",
      "upload_item",
      "request_item",
      "modify_myinfo",
      "my_point_status",
      "sell_item",
    ]
    this.setState({ selectMenu: menuNames.indexOf(event.target.id) });
  }
  async onChangeDropMenu(event, { value }) {
    console.log({ value }.value);
    const indexNumber = [10, 9, 0, 11, 8, 7, 1, 2, 3, 4, 5, 6];
    let number = indexNumber[{ value }.value];
    this.setState({ selectMenu: number });
  }

  async onClickThumbnail(event) {
    //event.preventDefault();
    //const reader = new FileReader();
    //const file = event.target.files[0];
    //reader.onloadend = async () => {
    //  // await this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
    //  await this.props.ModifyUserDetailRequest(this.props.userInfo.uid, { files: [{ value: reader.result, name: file.name, key: 0 }] }, this.props.token)
    //    .then(this.props.GetMyDetailRequest(this.props.token))
    //    .then(window.location.reload())
    //}
    //if (event.target.files[0]) {
    //  await reader.readAsDataURL(file);
    //}
  }


  render() {

    console.log("myDetail", this.props);
    const { MyDetail } = this.props;
    const { selectMenu } = this.state;

    return (
      <React.Fragment>
        <MainBox>
          <div className="header">
            <ProfileBox>
              <div className="imageBox">
                {/* <input hidden onChange={this.onClickThumbnail} id="file" type="file" /> */}
                {/* <label htmlFor="file"> */}
                <Thumbnail URL={MyDetail.thumbnail == null ? noimg : MyDetail.thumbnail} />
                {/* </label> */}
              </div>
              <div className=" nickName">{MyDetail.nick_name}</div>
              <div className="LabelBox fontSmall fontStyleNormal red marginTop1">
                {/* 카테고리 */}
                &nbsp;
              </div>
              <div className="LabelBox marginTop2">
                <span className="fontMini normal fontStyleLight">{(MyDetail && MyDetail.count) || 0}개의 아이템 |</span>&nbsp;
                  <span className="red">♥</span>
                <span className="fontMini normal fontStyleNormal">{(MyDetail && MyDetail.like) || 0}</span>
              </div>
            </ProfileBox>
            <InformationBox>
              <div className="innerBox">
                <div className="text">다양한 아이디어를 판매하세요!</div>
                <div className="imgBox"><img className="img" src={adddesigner} /></div>
                <div onClick={this.onClickCreateDesigner} className="button">디자이너 등록 / 관리&nbsp;&nbsp;<CustomIcon width="15" height="15" imgURL={category_icon} /></div>
              </div>
              <div className="hrLine" />
              <div className="innerBox largeWidth">
                <div className="text">제작 기술을 공유하고<br />장소를 쉐어해보세요!</div>
                <div className="imgBox"><img className="img" src={addmaker} /></div>
                <div onClick={this.onClickCreateMaker} className="button">메이커 등록 / 관리&nbsp;&nbsp;<CustomIcon width="15" height="15" imgURL={category_icon} /></div>
              </div>
              <div className="hrLine" />
              <div className="innerBox">
                <div className="text">본인 인증을 통해 더욱 다양한<br />혜택을 누려보세요!</div>
                <div className="imgBox"><img className="img" src={confirmMe} /></div>
                <div className="button">본인 인증 하기&nbsp;&nbsp;<CustomIcon width="15" height="15" imgURL={category_icon} /></div>
              </div>
            </InformationBox>
          </div>
          <div className="contents">
            <MenuBox className="menuBox">
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 10 ? "red" : null} id="my_point_status">내 포인트 관리</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 9 ? "red" : null} id="modify_myinfo">내 정보 수정</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 0 ? "red" : null} id="orderlist">구입 아이템({MyDetail && MyDetail.allCount && MyDetail.allCount.payment_count})</MenuButton>
              <div className="hrLine" />
              {(MyDetail.isDesigner == 1 || MyDetail.isMaker == 1) ?
                <React.Fragment>
                  <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 11 ? "red" : null} id="sell_item">판매 아이템({MyDetail && MyDetail.allCount && MyDetail.allCount.saleItem_count})</MenuButton>
                  <div className="hrLine" />
                </React.Fragment>
                :
                null
              }
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 8 ? "red" : null} id="request_item">의뢰 아이템({MyDetail && MyDetail.allCount && MyDetail.allCount.itemRequest_count})</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 7 ? "red" : null} id="upload_item">등록 아이템({MyDetail && MyDetail.allCount && MyDetail.allCount.registerItem_count})</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 1 ? "red" : null} id="interest_Item">관심 아이템({MyDetail && MyDetail.allCount && MyDetail.allCount.likeItem_count})</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 2 ? "red" : null} id="interest_Designer">관심 디자이너({MyDetail && MyDetail.allCount && MyDetail.allCount.likeDesigner_count})</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 3 ? "red" : null} id="interest_Maker">관심 메이커({MyDetail && MyDetail.allCount && MyDetail.allCount.likeMaker_count})</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 4 ? "red" : null} id="join_project">참여 프로젝트({MyDetail && MyDetail.allCount && MyDetail.allCount.joinProject_count})</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 5 ? "red" : null} id="request_designer">디자인 의뢰({MyDetail && MyDetail.allCount && MyDetail.allCount.requestDesigner_count})</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 6 ? "red" : null} id="request_maker">제작 의뢰({MyDetail && MyDetail.allCount && MyDetail.allCount.requestMaker_count})</MenuButton>
            </MenuBox>
            <Dropdown
              className="dropBox"
              selection
              defaultValue={1}
              options={[
                { key: 10, value: 0, text: `내 포인트 관리` },
                { key: 9, value: 1, text: `내 정보 수정` },
                { key: 0, value: 2, text: `구입 아이템(${MyDetail && MyDetail.allCount && MyDetail.allCount.payment_count})` },
                { key: 11, value: 3, text: `판매 아이템(${MyDetail && MyDetail.allCount && MyDetail.allCount.saleItem_count})` },
                { key: 8, value: 4, text: `의뢰 아이템(${MyDetail && MyDetail.allCount && MyDetail.allCount.itemRequest_count})` },
                { key: 7, value: 5, text: `등록 아이템(${MyDetail && MyDetail.allCount && MyDetail.allCount.registerItem_count})` },
                { key: 1, value: 6, text: `관심 아이템(${MyDetail && MyDetail.allCount && MyDetail.allCount.likeItem_count})` },
                { key: 2, value: 7, text: `관심 디자이너(${MyDetail && MyDetail.allCount && MyDetail.allCount.likeDesigner_count})` },
                { key: 3, value: 8, text: `관심 메이커(${MyDetail && MyDetail.allCount && MyDetail.allCount.likeMaker_count})` },
                { key: 4, value: 9, text: `참여 프로젝트(${MyDetail && MyDetail.allCount && MyDetail.allCount.joinProject_count})` },
                { key: 5, value: 10, text: `디자인 의뢰(${MyDetail && MyDetail.allCount && MyDetail.allCount.requestDesigner_count})` },
                { key: 6, value: 11, text: `제작 의뢰(${MyDetail && MyDetail.allCount && MyDetail.allCount.requestMaker_count})` }
              ]}
              onChange={this.onChangeDropMenu} />
            {/* <select id="menu" size={12}>
              <option onClick={this.onClickMenu} fontColor={selectMenu === 10 ? "red" : null} id="my_point_status">내 포인트 관리</option>
              <option onClick={this.onClickMenu} fontColor={selectMenu === 9 ? "red" : null} id="modify_myinfo">내 정보 수정</option>
              <option onClick={this.onClickMenu} fontColor={selectMenu === 0 ? "red" : null} id="orderlist">구입 아이템({MyDetail&&MyDetail.allCount&&MyDetail.allCount.payment_count})</option>
              <option onClick={this.onClickMenu} fontColor={selectMenu === 11? "red" : null} id="sell_item">판매 아이템({MyDetail&&MyDetail.allCount&&MyDetail.allCount.saleItem_count})</option>
              <option onClick={this.onClickMenu} fontColor={selectMenu === 8 ? "red" : null} id="request_item">의뢰 아이템({MyDetail&&MyDetail.allCount&&MyDetail.allCount.itemRequest_count})</option>
              <option onClick={this.onClickMenu} fontColor={selectMenu === 7 ? "red" : null} id="upload_item">등록 아이템({MyDetail&&MyDetail.allCount&&MyDetail.allCount.registerItem_count})</option>
              <option onClick={this.onClickMenu} fontColor={selectMenu === 1 ? "red" : null} id="interest_Item">관심 아이템({MyDetail&&MyDetail.allCount&&MyDetail.allCount.likeItem_count})</option>
              <option onClick={this.onClickMenu} fontColor={selectMenu === 2 ? "red" : null} id="interest_Designer">관심 디자이너({MyDetail&&MyDetail.allCount&&MyDetail.allCount.likeDesigner_count})</option>
              <option onClick={this.onClickMenu} fontColor={selectMenu === 3 ? "red" : null} id="interest_Maker">관심 메이커({MyDetail&&MyDetail.allCount&&MyDetail.allCount.likeMaker_count})</option>
              <option onClick={this.onClickMenu} fontColor={selectMenu === 4 ? "red" : null} id="join_project">참여 프로젝트</option>
              <option onClick={this.onClickMenu} fontColor={selectMenu === 5 ? "red" : null} id="request_designer">디자인 의뢰({MyDetail&&MyDetail.allCount&&MyDetail.allCount.requestDesigner_count})</option>
              <option onClick={this.onClickMenu} fontColor={selectMenu === 6 ? "red" : null} id="request_maker">제작 의뢰({MyDetail&&MyDetail.allCount&&MyDetail.allCount.requestMaker_count})</option>
            </select> */}
            <BoardBox>
              {selectMenu === 10 ? <MyPointStatusContainer /> : null}
              {selectMenu === 9 ? <ModifyMyDetailContainer /> : null}
              {selectMenu === 0 ?
                <MyPaymentContainer allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.payment_count} id={this.props.userInfo.uid} /> : null}
              {selectMenu === 8 ?
                <MyRequestItemContainer allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.itemRequest_count} id={this.props.userInfo.uid} /> : null}
              {selectMenu === 7 ?
                <UploadItemContainer allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.registerItem_count} id={this.props.userInfo.uid} /> : null}
              {selectMenu === 1 &&
                <LikeInItemContainer allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.likeItem_count} id={this.props.userInfo.uid} />}
              {selectMenu === 2 &&
                <LikeInDesignerContainer allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.likeDesigner_count} id={this.props.userInfo.uid} />}
              {selectMenu === 3 &&
                <LikeInMakerContainer allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.likeMaker_count} id={this.props.userInfo.uid} />}
              {selectMenu === 4 &&
                <MyProjectItemContainer id={this.props.userInfo.uid} />}
              {selectMenu === 5 &&
                <MyUploadDesignReqBoardContainer allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.requestDesigner_count} id={this.props.userInfo.uid} />}
              {selectMenu === 6 &&
                <MyUploadMakerReqBoardContainer allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.requestDesigner_count} id={this.props.userInfo.uid} />
              }
              {selectMenu === 11 &&
                <MySalesContainer allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.saleItem_count} id={this.props.userInfo.uid} />
              }
            </BoardBox>
          </div>
        </MainBox>
      </React.Fragment >
    );
  }
} export default MyDetail;