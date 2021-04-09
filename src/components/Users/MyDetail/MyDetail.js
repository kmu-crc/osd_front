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

const CustomIcon=styled.div`
  width:${props => props.width}px;
  height:${props => props.height}px;
  background-image:url(${props=>props.imgURL});
  background-repeat: no-repeat;
  background-size: contain;
  padding:${props => props.padding}px;
  display:${props=>props.isNon==true?"none":"block"}
  margin-left:10px;
  `

const MainBox = styled.div`
// *{
//   border:1px solid black;
// }
  width: 1366px;
  padding:0px 30px 0px 30px;
  // height: 1959px;
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
    .red{color:red;}
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
    width: 1046px;
    height: 335px;
    box-shadow: 3px 3px 5px #0000001A;
    border: 0.5px solid #EAEAEA;
    border-radius: 20px;
    margin-left:20px;
    display:flex;
    justify-content:space-around;
    align-items:center;
    padding:45px 65px 45px 65px;
    color:black;
    .fontDefault{
      font-size:${market_style.font.size.normal3};
    }
    .fontNormal{font-size:${market_style.font.size.normal1}}
    .fontSmall{font-size:${market_style.font.size.small1};}
    .fontStyleNormal{font-family:Noto Sans KR; font-weight:400;line-height:25px;}
    .alignCenter{text-align:center;}
    .red{color:red;}
    .cursorPointer{cursor:pointer;}
    .displayFlex{display:flex;align-items:center;justify-content:center;}
    .alignEnd{align-items:flex-end;}
    .marginRight{margin-right:10px;}
    .marginBottom{margin-bottom:7px;}
    .design-clipart {
      width: 88px;
      height: 70px;
      margin-left: auto;
      margin-right: auto;
      background-image: url(${adddesigner});
      background-size: contain;
      background-position: center center;
      background-repeat:no-repeat;
      margin-bottom:34px;

    }
    .toolbox-clipart {
      width: 50px;
      height: 70px;
      margin-left: auto;
      margin-right: auto;
      background-image: url(${addmaker});
      background-size: contain;
      background-position: center center;
      background-repeat:no-repeat;
      margin-bottom:34px;
    }
    .verify-clipart {
      width: 60px;
      height: 70px;
      margin-left: auto;
      margin-right: auto;
      background-image: url(${confirmMe});
      background-size: contain;
      background-position: center center;
      background-repeat:no-repeat;
      margin-bottom:34px;
    }

    .borderRight{
      border-right:2px solid #d6d6d6;
    }
    .hline_left{justify-content:flex-start;}
    .hline_center{justify-content:center;}
    .hline_right{justify-content:flex-end;}
    .wrap{
      width:max-content;
      display:flex;
      justify-content:space-between;
      flex-direction:column;
    }
    .title{
      width:251px;
      height:54px;
      display:flex;
      justify-content:center;
      align-items:center;
      margin-bottom:34px;
      text-align:center;
      color:black;
    }
    .grayBox{
      width:30%;
      height:230px;
      display:flex;

    }
    .centerBox{
      width:40%;
      height:230px;
      display:flex;
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
    .title_Label{
      width:100%;
      height:20px;
      font-size:${market_style.font.size.normal3};
      font-family:Noto Sans KR,Medium;
      margin-left:15px;
      margin-top:35px;
      margin-bottom:30px;
      font-weight:700;
    }
    .hrLine{
      border:0.5px solid #707070;
      opacity:0.2;
      margin-bottom:17.5px;
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
`;
const BoardBox = styled.div`
    width:1046px;
    height:max-content;
    // min-height:900px;
    box-shadow: 3px 3px 5px #00000029;
    border: 0.5px solid #EAEAEA;
    border-radius: 20px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    margin-left:20px ;
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
        color:red;
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
        .circle {
          width: 80px;
          height: 29px;
          margin-right: 13px;
          border-radius: 16px;
          font-size:6px;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:5px;
          &.red1 { background: #FF0000; };
          &.red2 { background: #FFC0C0; };
          &.red3 { background: #FF6868; };
          &.red4 { background: #FFD6D6; };
        };
      }

    
      
      .another {}
      .more {}
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
const EmptyBox = styled.div`
    width:${props => props.width}px;
    height:${props => props.height}px;
`;
const RoundButton = styled.div`
  width:${props => props.width}px;
  height:${props => props.height}px;
  color:${props => props.color};
  border:1px solid ${props => props.borderColor};
  border-radius:21px;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
`;

class MyDetail extends Component {

  constructor(props) {
    super(props);
    this.state = { selectMenu: parseInt(this.props.index,10) }
    this.onClickMenu = this.onClickMenu.bind(this);
    this.onClickCreateDesigner = this.onClickCreateDesigner.bind(this);
    this.onClickCreateMaker = this.onClickCreateMaker.bind(this);
    this.onClickThumbnail = this.onClickThumbnail.bind(this);
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
              <div className="grayBox borderRight hline_left">
                <div className="wrap cursorPointer" onClick={this.onClickCreateDesigner} >
                  <div className="title fontNormal fontStyleNormal"><div>다양한 아이디어를 판매하세요!</div></div>
                  <div className="design-clipart">&nbsp;</div>
                  <div onClick={this.onClickCreateDesigner} ><div className="marginBottom fontNormal alignCenter cursorPointer fontStyleNormal displayFlex alignEnd">
                    <div className="fontSmall marginRight">디자이너 등록 / 관리</div>
                  <CustomIcon width="15" height="15" imgURL={category_icon}/>
                  </div></div>
                </div>
              </div>
              <div className="centerBox borderRight hline_center">
                <div className="wrap cursorPointer" onClick={this.onClickCreateMaker}>
                  <div className="title fontNormal fontStyleNormal"><div>제작 기술을 공유하고 장소를<br /> 쉐어해보세요!</div></div>
                  <div className="toolbox-clipart">&nbsp;</div>
                  <div onClick={this.onClickCreateMaker}><div className="marginBottom fontNormal alignCenter cursorPointer fontStyleNormal displayFlex">
                    <div className="fontSmall marginRight">메이커 등록 / 관리</div>                    
                    <CustomIcon width="15" height="15" imgURL={category_icon}/>
                  </div></div>
                </div>
              </div>
              <div className="grayBox hline_right">
                <div className="wrap cursorPointer">
                  <div className="title fontNormal fontStyleNormal"><div>본인인증을 통해 더욱 다양한 <br /> 혜택을 누려보세요!</div></div>
                  <div className="verify-clipart"></div>
                  <div><div className="marginBottom fontNormal alignCenter cursorPointer fontStyleNormal displayFlex">
                    <div className="fontSmall marginRight">본인 인증</div>
                    <CustomIcon width="15" height="15" imgURL={category_icon}/>
                  </div></div>
                </div>
              </div>
            </InformationBox>
          </div>
          <div className="contents">
            <MenuBox>
              {/* <div className="title_Label">아이템</div> */}
              {/* <div className="title_Label">관심</div> */}
              {/* <div className="title_Label">참여</div> */}
              {/* <div className="title_Label">의뢰</div> */}
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 10 ? "red" : null} id="my_point_status">내 포인트 관리</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 9 ? "red" : null} id="modify_myinfo">내 정보 수정</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 0 ? "red" : null} id="orderlist">구입 아이템({MyDetail&&MyDetail.allCount&&MyDetail.allCount.payment_count})</MenuButton>
              <div className="hrLine" />
              {(MyDetail.isDesigner==1||MyDetail.isMaker==1)?
              <React.Fragment>
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 11? "red" : null} id="sell_item">판매 아이템({MyDetail&&MyDetail.allCount&&MyDetail.allCount.saleItem_count})</MenuButton>
              <div className="hrLine" />
              </React.Fragment>
              :
              null  
              }
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 8 ? "red" : null} id="request_item">의뢰 아이템({MyDetail&&MyDetail.allCount&&MyDetail.allCount.itemRequest_count})</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 7 ? "red" : null} id="upload_item">등록 아이템({MyDetail&&MyDetail.allCount&&MyDetail.allCount.registerItem_count})</MenuButton>
              <div className="hrLine" /> 
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 1 ? "red" : null} id="interest_Item">관심 아이템({MyDetail&&MyDetail.allCount&&MyDetail.allCount.likeItem_count})</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 2 ? "red" : null} id="interest_Designer">관심 디자이너({MyDetail&&MyDetail.allCount&&MyDetail.allCount.likeDesigner_count})</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 3 ? "red" : null} id="interest_Maker">관심 메이커({MyDetail&&MyDetail.allCount&&MyDetail.allCount.likeMaker_count})</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 4 ? "red" : null} id="join_project">참여 프로젝트</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 5 ? "red" : null} id="request_designer">디자인 의뢰({MyDetail&&MyDetail.allCount&&MyDetail.allCount.requestDesigner_count})</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 6 ? "red" : null} id="request_maker">제작 의뢰({MyDetail&&MyDetail.allCount&&MyDetail.allCount.requestMaker_count})</MenuButton>
            </MenuBox>
            <BoardBox>
              {selectMenu === 10 ? <MyPointStatusContainer /> : null}
              {selectMenu === 9 ? <ModifyMyDetailContainer /> : null}
              {selectMenu === 0 ?
                <MyPaymentContainer allPage={MyDetail&&MyDetail.allCount&&MyDetail.allCount.payment_count}  id={this.props.userInfo.uid} /> : null}
              {selectMenu === 8 ?
                <MyRequestItemContainer allPage={MyDetail&&MyDetail.allCount&&MyDetail.allCount.itemRequest_count} id={this.props.userInfo.uid} /> : null}
              {selectMenu === 7 ?
                <UploadItemContainer allPage={MyDetail&&MyDetail.allCount&&MyDetail.allCount.registerItem_count} id={this.props.userInfo.uid} /> : null}
              {selectMenu === 1 &&
                <LikeInItemContainer allPage={MyDetail&&MyDetail.allCount&&MyDetail.allCount.likeItem_count} id={this.props.userInfo.uid} />}
              {selectMenu === 2 &&
                <LikeInDesignerContainer allPage={MyDetail&&MyDetail.allCount&&MyDetail.allCount.likeDesigner_count} id={this.props.userInfo.uid} />}
              {selectMenu === 3 &&
                <LikeInMakerContainer allPage={MyDetail&&MyDetail.allCount&&MyDetail.allCount.likeMaker_count} id={this.props.userInfo.uid} />}
              {selectMenu === 4 &&
                <MyProjectItemContainer id={this.props.userInfo.uid} />}
              {selectMenu === 5 &&
                <MyUploadDesignReqBoardContainer allPage={MyDetail&&MyDetail.allCount&&MyDetail.allCount.requestDesigner_count} id={this.props.userInfo.uid} />}
              {selectMenu === 6 &&
                <MyUploadMakerReqBoardContainer allPage={MyDetail&&MyDetail.allCount&&MyDetail.allCount.requestDesigner_count} id={this.props.userInfo.uid} />
              }
              {selectMenu === 11 &&
                <MySalesContainer allPage = {MyDetail&&MyDetail.allCount&&MyDetail.allCount.saleItem_count} id={this.props.userInfo.uid} />
              }
            </BoardBox>
          </div>
        </MainBox>
      </React.Fragment >
    );
  }
} export default MyDetail;