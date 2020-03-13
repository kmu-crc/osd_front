import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/noimg.png";
import Item from "components/Items/Item/Item"
import Expert from "components/Experts/Expert";
import { LikeItem } from "components/Users/MyDetail/MyDetailTab/likeItem";
import LikeInDesignerContainer from "containers/Designer/LikeInDesignerContainer/LikeInDesignerContainer"
import LikeInMakerContainer from "containers/Maker/LikeInMakerContainer/LikeInMakerContainer"
import LikeInItemContainer from "containers/Products/LikeInItemContainer/LikeInItemContainer"
import MyPaymentContainer from "containers/Payment/MyPaymentContainer"
import MyRequestItemContainer from "containers/Payment/MyRequestItemContainer"
import UploadItemContainer from "containers/Items/UploadItemContainer/UploadItemContainer"
import MyUploadDesignReqBoardContainer from "components/Request/MyUploadDesignReqBoardContainer/MyUploadDesignReqBoardContainer"
import MyUploadMakerReqBoardContainer from "components/Request/MyUploadMakerReqBoardContainer/MyUploadMakerReqBoardContainer"


const MainBox = styled.div`
  width: 1790px;
  height: 1959px;
  margin-top: 10px;
  .header {
    width: 100%;
    height: 372px;
    margin-bottom: 94px;
    display: flex;
  }
  .contents {
    width: 100%;
    height: 1493px;
    display: flex;
  }
`;
const ProfileBox = styled.div`
  width: 285px;
  height: 372px;
  border-radius: 20px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 5px 5px 10px #00000029;

  .fontBig{font-size:19px;}
  .fontSmall{font-size:13px;}
  .fontStyleNormal{font-family:Noto Sans KR; font-weight:500;}
  .fontStyleLight{font-family:Noto Sans KR; font-weight:200;}
  .red{color:red;}
  .normal{color:#060000;}

  .imageBox {
    width: 100%;
    height: 236px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .LabelBox {
    width: 100%;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const InformationBox = styled.div`
    *{}
    .fontBig{font-size:20px;}
    .fontStyleNormal{font-family:Noto Sans KR; font-weight:500;}
    .red{color:red;}

    width:1388px;
    height:372px;
    border-radius:20px;
    background: #E9E9E9 0% 0% no-repeat padding-box;
    margin-left:117px;
    display:flex;
    padding-left:50px; 
    .grayBox{
      width:411px;
      height:328px;
      background: #FFFFFF;
      border-radius: 20px;
      opacity: 0.7;
      margin-top:24px;
      margin-right:28px;
      display:flex;
      justify-content:center;
      .wrap{
        width:max-content;
        height:100%t;
        display:flex;
        justify-content:space-between;
        flex-direction:column;
        padding-top:47px;
        padding-bottom:54px;
      }
      .title{
        width:251px;
        height:max-content;
        text-align:center;
        line-height:29px;
      }

    }
`
const MenuBox = styled.div`
    *{
      color:#060000;
    }
    width:285px;
    height:max-content;
    border-radius:20px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 5px 5px 10px #00000029;
    padding-top:35px;
    padding-left:25px;
    padding-bottom:30px;
    .title_Label{
      width:100%;
      height:20px;
      font-size:20px;
      font-family:Noto Sans KR,Medium;
      margin-left:15px;
      margin-top:35px;
      margin-bottom:30px;
      font-weight:700;
    }
    .hrLine{
      width:230px;
      border:0.5px solid #707070;
      opacity:0.2;
      margin-bottom:25px;
    }
`
const MenuButton = styled.div`
  width:100%;
  height:20px;
  font-size:20px;
  font-family:Noto Sans KR;
  font-weight:200;
  margin-left:15px;
  margin-bottom:30px;
  cursor:pointer;
  color:${props => props.fontColor == null ? "#060000" : props.fontColor};
`
const BoardBox = styled.div`
    width:1388px;
    border-radius: 20px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 5px 5px 10px #00000029;
    margin-left:117px;
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
        font-size: 19px;
        font-weight: 500;
        line-height: 28px;
        text-align: left;
      };
    
      .list {
        margin-top: 72px;
        font-weight: 300;
        font-size: 19px;
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
`
const Thumbnail = styled.div`
    width:190px;
    height:190px;
    border-radius:50%;
    background-image:url(${props => props.URL == null ? noimg : props.URL});
    background-repeat:norepeat;
    background-position:center;
    background-size:cover;
    cursor:pointer
`
const EmptyBox = styled.div`
    width:${props => props.width}px;
    height:${props => props.height}px;
`

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
    this.state = { selectMenu: -1 }
    this.onClickMenu = this.onClickMenu.bind(this);
    this.onClickCreateDesigner = this.onClickCreateDesigner.bind(this);
    this.onClickCreateMaker = this.onClickCreateMaker.bind(this);
    this.onClickThumbnail = this.onClickThumbnail.bind(this);
  }
  onClickCreateDesigner(event) {
    if (this.props.MyDetail.isDesigner == true) {
      window.location.href = "/modifyDesigner/" + this.props.MyDetail.uid;
    } else {
      window.location.href = "/createDesigner";
    }
  }
  onClickCreateMaker(event) {
    if (this.props.MyDetail.isMaker == true) {
      window.location.href = "/modifyMaker/" + this.props.MyDetail.uid;
    }
    else {
      window.location.href = "/createMaker";
    }
  }
  onClickMenu(event) {
    let selectMenu = -1;

    switch (event.target.id) {
      case "orderlist": selectMenu = 0; break;
      case "interest_Item": selectMenu = 1; break;
      case "interest_Designer": selectMenu = 2; break;
      case "interest_Maker": selectMenu = 3; break;
      case "join_project": selectMenu = 4; break;
      case "request_designer": selectMenu = 5; break;
      case "request_maker": selectMenu = 6; break;
      case "upload_item": selectMenu = 7; break;
      case "request_item": selectMenu = 8; break;
    }
    console.log(selectMenu);
    this.setState({ selectMenu: selectMenu });
  }

  async onClickThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = async () => {
      // await this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
      await this.props.ModifyUserDetailRequest(this.props.userInfo.uid, { files: [{ value: reader.result, name: file.name, key: 0 }] }, this.props.token)
        .then(this.props.GetMyDetailRequest(this.props.token))
        .then(window.location.reload())
    }
    if (event.target.files[0]) {
      await reader.readAsDataURL(file);
    }

  }

  
  render() {

    
    console.log("myDetail", this.props);
    const { MyDetail } = this.props;
    const { selectMenu } = this.state;


    // let categoryName = this.props.category1&& this.props.category2 &&
    // this.state.category_level2<1?
    // this.props.category1[parseInt(this.state.category_level1,10)]
    // &&this.props.category1[parseInt(this.state.category_level1,10)].text
    // :null;

    // this.props.category2&&this.props.category2.map((item,index)=>{
    //   if(item.parent == this.state.category_level1&&item.value == this.state.category_level2){
    //     categoryName=item.text;
    //   }
    // })

    return (
      <React.Fragment>
        <MainBox>
          <div className="header">
            <ProfileBox>
              <div className="imageBox">
                <input hidden onChange={this.onClickThumbnail} id="file" type="file" />
                <label htmlFor="file">
                  <Thumbnail URL={MyDetail.thumbnail == null ? noimg : MyDetail.thumbnail} />
                </label>
              </div>
              <div className="LabelBox fontBig fontStyleNormal">{MyDetail.nick_name}</div>
              {/* <div className="LabelBox fontSmall fontStyleLight red">카테고리</div> */}
              <EmptyBox height={32} />
              <div className="LabelBox">
                <span className="fontSmall normal fontStyleLight">{(MyDetail && MyDetail.count) || 0}개의 아이템 |</span>&nbsp;
                  <span className="red">♥</span>
                <span className="fontSmall normal fontStyleNormal">{(MyDetail && MyDetail.like) || 0}</span>
              </div>
            </ProfileBox>
            <InformationBox>
              <div className="grayBox">
                <div className="wrap">
                  <div className="title fontBig fontStyleNormal red">다양한 아이디어를 판매하세요!</div>
                  <RoundButton onClick={this.onClickCreateDesigner} width={251} height={43} borderColor={"red"}><div className="fontBig fontStyleNormal red">디자이너 등록 / 관리</div></RoundButton>
                </div>
              </div>
              <div className="grayBox">
                <div className="wrap">
                  <div className="title fontBig fontStyleNormal red">제작 기술을 공유하고 장소를 <br /> 쉐어해보세요!</div>
                  <RoundButton onClick={this.onClickCreateMaker} width={251} height={43} borderColor={"red"}><div className="fontBig fontStyleNormal red">메이커 등록 / 관리</div></RoundButton>
                </div>
              </div>
              <div className="grayBox">
                <div className="wrap">
                  <div className="title fontBig fontStyleNormal red">본인인증을 통해 더욱 다양한 <br /> 혜택을 누려보세요!</div>
                  <RoundButton width={251} height={43} borderColor={"red"}><div className="fontBig fontStyleNormal red">본인 인증</div></RoundButton>
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
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 0 ? "red" : null} id="orderlist">구입아이템</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 8 ? "red" : null} id="request_item">의뢰아이템</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 7 ? "red" : null} id="upload_item">등록 아이템</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 1 ? "red" : null} id="interest_Item">관심 아이템</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 2 ? "red" : null} id="interest_Designer">관심 디자이너</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 3 ? "red" : null} id="interest_Maker">관심 메이커</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 4 ? "red" : null} id="join_project">참여 프로젝트</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 5 ? "red" : null} id="request_designer">디자인 의뢰</MenuButton>
              <div className="hrLine" />
              <MenuButton onClick={this.onClickMenu} fontColor={selectMenu === 6 ? "red" : null} id="request_maker">제작 의뢰</MenuButton>
            </MenuBox>
            <BoardBox>
              {selectMenu === 0 ?
                <MyPaymentContainer id={this.props.userInfo.uid} /> : null}
              {selectMenu === 8 ?
                <MyRequestItemContainer id={this.props.userInfo.uid} /> : null}
              {selectMenu === 7 ?
                <UploadItemContainer id={this.props.userInfo.uid} /> : null}
              {selectMenu === 1 &&
                <LikeInItemContainer id={this.props.userInfo.uid} />}
              {selectMenu === 2 &&
                <LikeInDesignerContainer id={this.props.userInfo.uid} />}
              {selectMenu === 3 &&
                <LikeInMakerContainer id={this.props.userInfo.uid} />}
              {selectMenu === 5 &&
                <MyUploadDesignReqBoardContainer id={this.props.userInfo.uid} />
              }
              {selectMenu === 6 &&
                <MyUploadMakerReqBoardContainer id={this.props.userInfo.uid} />
              }
            </BoardBox>
          </div>
        </MainBox>
      </React.Fragment>
    );
  }
} export default MyDetail;