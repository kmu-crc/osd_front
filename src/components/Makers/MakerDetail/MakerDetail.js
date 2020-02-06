import React, { Component } from "react";
import styled from "styled-components";
import profile from "source/thumbnail.png";
import NumberFormat from "modules/NumberFormat";
import TextFormat from "modules/TextFormat";
import { Icon } from "semantic-ui-react";
import Item from "components/Items/Item/Item"

// CSS STYLING
const Expert = styled.div`
  margin-right: ${prop => prop.mRight}px;
  border: 1px solid transparent;
  width: 468px;
  height: 491px;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
`;
const Profile = styled.div`
  width: 227px;
  height: 228px;
  margin-top: 18px;
  margin-left: 122px;
  background: transparent;
  background-image: url(${props => props.face});
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
`;
const TextWrapper = styled.div`
  margin-top: 27px;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  font-family: Noto Sans KR;
  text-align: center;
  letter-spacing: 0;
  .nick {
    font-weight: 500;
    font-size: 22px;
    color: #000000;
    line-height: 33px;
  }
  .category {
    margin-top: 12px;
    font-weight: 300;
    font-size: 15px;
    line-height: 22px;
    color: #FF0000;
  }
`;
const Counter = styled.div`
  margin-top: 106px;
  display: flex;
  flex-direction: row;
  width: max-content;
  margin-left: auto;
  margin-right: auto;
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #000000;

  .items {
    text-align: center;
    font-size: 12px;
    font-weight: 300;
    line-height: 18px;
  }
  .v-line {
    margin-left: 10.5px;
    margin-right: 10.5px;
    width: 0px;
    height: 16px;
    border: 0.5px solid #707070;
  }
  .likes {
    text-align: left;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
  }
`;
const empty = {
  nick_name: "Loading", categoryName: "카테고리",
  items: 300, likes: 5000000,
  create_time: "2020-01-01T00:00:01.000Z",
  update_time: "2020-01-01T00:00:01.000Z",
};
const Introduction = styled.div`
      margin-right: ${prop => prop.mRight}px;
      position:relative;
      width: 468px;
      height: 491px;
      background: #FFFFFF;
      box-shadow: 5px 5px 10px #00000029;
      border-radius: 20px;
      opacity: 1;
      padding: 62px 59px 61px 60px;
      font-family: Noto Sans KR;
      .title {
        font-size: 19px;
        font-weight: 500;
        line-height: 28px;
        text-align: left;
      }
      .text {
        height: 311px;
        width: 349px;
        margin-top: 29px;
        font-size: 15px;
        font-weight: 300;
        line-weight: 27px;
        text-align: left;
        overflow: hidden;
      }
      .gradient_box{
        position:absolute;
        left:0px;
        top:0px;
        width:100%;
        height:100%;
        display:flex;
        justify-content:center;
        align-items:flex-end;
        padding:10px;
        border-radius: 20px;
        background:linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255,01.0));
      }

      &:hover{
        .gradient_box{
          display:none;
        }
        .text {
          overflow: auto;
        }
      }
`;
const RequestBoard = styled.div`
  margin-right: ${prop => prop.mRight}px;
  width: ${prop => prop.large ? 1094 : 566}px;
  height: ${prop => prop.large ? 1168 : 491}px;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  padding: 62px 65px 35px 60px;
  font-family: Noto Sans KR;
  .line {
    display: flex;
    flex-direction: row;
    .title {
      font-weight: 500;
      font-size: 19px;
      text-align: left;
      line-height: 27px;
      letter-spacing: 0;
      color: #000000;
      opacity: 1;
    }
    .button {
      margin-left: auto;
      font-weight: 500;
      font-size: 19px;
      text-align: left;
      line-height: 27px;
      letter-spacing: 0;
      color: #FF0000;
      opacity: 1;
      cursor: default;
    }
  }
  .board {
    margin-top: 42px;
    width: 441px;
    .lement {
      font-size: 15px;
      text-align: left;
      line-height: 20px;
      color: #707070;
      letter-spacing: 0;
      opacity: 1;
      margin-top: 12px;
    }
  }
`;
const AdditionalInfo = styled.div`
      margin-right: ${prop => prop.mRight}px;
      margin-top: ${props=>props.mTop==null?"0px":props.mTop+"px"};
      width: ${props=>props.width==null?"468px":props.width+"px"};
      height: ${props=>props.height==null?"491px":props.height+"px"};
      background: #FFFFFF;
      box-shadow: 5px 5px 10px #00000029;
      border-radius: 20px;
      opacity: 1;
      // padding: 90px 43px 161px 54px;
      padding: 62px 59px 61px 60px;
      font-family: Noto Sans KR;
      position:relative;
      .title {
        font-size: 19px;
        font-weight: 500;
        line-height: 28px;
        text-align: left;
      }
      .text {
        width: 100%;
        height: max-content;
        margin-top: 20px;
        margin-bottom: 34px;
        font-size: 15px;
        font-weight: 300;
        line-weight: 27px;
        text-align: left;
        word-wrap:break-word;

        
      }
      .wrapText{
        width:100%;
        height:100%;
        overflow:hidden;
      }
      .wrapItem{
        margin-top:30px;
        width:100%;
        height:max-content;
        overflow:hidden;
        display:flex;
      }
      .gradient_box{
        position:absolute;
        left:0px;
        top:0px;
        width:100%;
        height:100%;
        display:flex;
        justify-content:center;
        align-items:flex-end;
        padding:10px;
        border-radius: 20px;
        background:linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255,01.0));
      }
      &:hover{
        .gradient_box{
          display:none;
        }
        .wrapItem{
          overflow:auto;
        }
        .wrapText{
          overflow:auto;
        }
      }
`;
const MakerBoard = styled.div`
      width: 1523px;
      height: max-content;
      background: #FFFFFF;
      box-shadow: 5px 5px 10px #00000029;
      border-radius: 20px;
      opacity: 1;
      font-family: Noto Sans KR;
      padding: 90px 60px 30px 60px;
      margin-bottom:100px;
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
        }
        .circle {
          width: 50px;
          height: 20px;
          margin-right: 13px;
          border-radius: 16px;
          &.red1 { background: #FF0000; };
          &.red2 { background: #FFC0C0; };
          &.red3 { background: #FF6868; };
          &.red4 { background: #FFD6D6; };
        };
      };
      .page {
        width: max-content;
        margin-top: 87px;
        margin-left: auto;
        margin-right: auto;
        font-size: 20px;
        font-weight: 500;
        text-aglin: left;
        display: flex;
        flex-direction: row;
        line-height: 27px;
        color: #707070;
        .number{
          margin-right: 10px;
        }
        .this{
          color: red;
        }
        
        .another {}
        .more {}
      };
`;
const Wrapper = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    margin-top: 138px;
    // *{border:1px solid red;};
    .contents_box{
      width:max-content;
      height:max-content;
    }
`;

const ExpTable = styled.div`
    *{
      font-family:Noto Sans KR;
      font-size:16px;
    }
    width: ${props=>props.width==null?"100%":props.width+"px"};
    height: ${props=>props.height==null?"max-content":props.height+"px"};
    margin-left: ${props => props.mLeft==null?"0px":props.mLeft+"px"}px;
    margin-top: ${props=>props.mTop==null?"0px":props.mTop+"px"};
    .row{
      width:100%;
      height:29px;
      display:flex;
      margin-bottom:10px;
    }
    .header{
      width:100%;
      height:29px;
      display:flex;
      margin-bottom:5px;
    }
    .th{
      width:33%;
      height:100%;
      font-weight:500;
    }
    .td{
      width:33%;
      height:100%;
      font-weight:300;
    }
`
class MakerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: true };
  }
  componentWillMount() {
    this.props.GetMakerDetailRequest(this.props.id);
    // if (this.props.token) {
    // this.props.GetLikeMakerRequest(this.props.id, this.props.token);
    // }
  }
  render() {
    const expert = this.props.MakerDetail || empty;
    console.log("detail:", expert);
    const { tab } = this.state;

    return (<Wrapper>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* Designer */}
        <Expert mRight={60}>
          {/* Profile */}
          <Profile face={(expert && expert.imgURL) || profile} />
          {/* Text */}
          <TextWrapper>
            <div className="nick"><TextFormat txt={expert.nick_name} chars={32} /></div>
            <div className="category"><TextFormat txt={expert.categoryName || "전체"} chars={32} /></div>
          </TextWrapper>
          {/* Counter */}
          <Counter>
            <div className="items">
              {NumberFormat(expert.items) || 0}개의 아이템</div>
            <div className="v-line" />
            <div className="likes">{/*♥*/}
              <Icon className="heart" size="small" color="red" />{NumberFormat(expert.likes) || 0}</div>
          </Counter>
        </Expert>

        {/* Introduction */}
        <Introduction mRight={60}>
          <div className="title">소개</div>
          <div className="text">{expert.description || "천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를 인간의 생명을 이상, 불어 바로 것이다. 대고, 방황하였으며, 가치를 봄날의 인간이 가진 설산에서 운다. 있는 착목한는 그들의 노래하며 원질이 대한 아름다우냐? 같은 찬미를 붙잡아 청춘 힘차게 두기 갑 속잎나고, 소담스러운 것이다. 몸이 원질이 가슴이 피가 반짝이는 소리다.이것은 이상의 예가 피다. 그들을 할지니, 품었기 가치를 보배를 남는 지혜는 약동하다. 목숨이 일월과 동력은 가는 청춘의 사라지지 더운지라 가는 있음으로써 것이다. 가치를 웅대한 대한 새 피가 품에 소담스러운 그들에게 오직 듣는다. 찾아다녀도, 들어 그들은 피어나기 것이다. 착목한는 되려니와, 그와 타오르고 커다란 가는 위하여서. 물방아 얼마나 것이다.보라, 바로 얼마나 남는 위하여서, 봄바람이다. 얼마나 그림자는 얼음에 보이는 새가 보내는 것이다. 가슴에 인간의 두기 끝까지 무엇이 것은 그리하였는가? 보이는 천지는 주며, 듣는다. 이상, 몸이 곧 두기 커다란 이것을 그들에게 위하여서, 가슴에 보라. 무한한 돋고, 많이 가슴에 있는 사막이다. 힘차게 무엇을 능히 되는 가치를 이 거선의 남는 부패뿐이다. 소금이라 얼음 긴지라 품었기 과실이 굳세게 끓는 봄바람이다. 인간의 갑 별과 사라지지 품에 같지 사막이다. 소금이라 듣기만 설레는 심장은 있으며, 것은 위하여서, 그리하였는가? 그들을 그러므로 물방아 우리의 있을 얼음과 청춘의 장식하는 보라. 이것은 끝까지 기관과 가진 인류의 그들은 힘있다. 붙잡아 뛰노는 실로 피고 피에 그것을 황금시대다. 그들의 위하여, 그것을 힘있다. 봄바람을 구하기 가슴이 풍부하게 주며, 무엇을 인도하겠다는 없으면, 봄바람이다. 청춘 방황하여도, 산야에 영원히 그들은 간에 하는 위하여서, 아니다. 사는가 얼마나 그들은 부패를 못할 하여도 무엇을 것이다. 찾아다녀도, 피는 위하여 약동하다."}</div>
          <div className="gradient_box"><div>▾</div></div>
        </Introduction>
        {/** 상세소개*/}
        <AdditionalInfo>
          <div className="wrapText">
          <div className="title">거주지역</div>
          <div className="text">천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를</div>
          <div className="title">전문분야</div>
          <div className="text">천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를</div>
          <div className="title">보유 장비</div>
          <div className="text">천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를</div>
        </div>
        <div className="gradient_box"><div>▾</div></div>

        </AdditionalInfo>
      </div>
      <AdditionalInfo width={1523} height={280} mTop={60}>
            <ExpTable>
              <div className="header">
                <div className="th">경험</div>
                <div className="th">기간</div>
                <div className="th">업무내용</div>
              </div>
              <div className="row">
                <div className="th">경험경험경험경험경험</div>
                <div className="td">1999.99.99~1999.99.99</div>
                <div className="td">업무내용업무내용업무내용업무내용</div>
              </div>
              <div className="row">
                <div className="th">경험경험경험경험경험</div>
                <div className="td">1999.99.99~1999.99.99</div>
                <div className="td">업무내용업무내용업무내용업무내용</div>
              </div>
              <div className="row">
                <div className="th">경험경험경험경험경험</div>
                <div className="td">1999.99.99~1999.99.99</div>
                <div className="td">업무내용업무내용업무내용업무내용</div>
              </div>
            </ExpTable>

        </AdditionalInfo>

        {/**보유아이템 */}
        <AdditionalInfo width={1523} height={491} mTop={60}>
        <div className="title">아이템</div>
        <div className="wrapItem">
          <div style={{marginRight:"50px"}}><Item/></div>
          <div style={{marginRight:"50px"}}><Item/></div>
          <div style={{marginRight:"50px"}}><Item/></div>
          <div style={{marginRight:"50px"}}><Item/></div>
          <div style={{marginRight:"50px"}}><Item/></div>
          <div style={{marginRight:"50px"}}><Item/></div>
        </div>
        </AdditionalInfo>
      <div style={{ marginTop: "61px", display: "flex", flexDirection: "row" }}>
        
        <MakerBoard>
          <div className="title">메이커 게시판</div>
          <div className="list">
            <div className="line"><div className="circle red1" /><div className="text">천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를</div></div>
            <div className="line"><div className="circle red2" /><div className="text">천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를</div></div>
            <div className="line"><div className="circle red4" /><div className="text">천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를</div></div>
            <div className="line"><div className="circle red2" /><div className="text">천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를</div></div>
            <div className="line"><div className="circle red3" /><div className="text">천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를</div></div>
            <div className="line"><div className="circle red2" /><div className="text">천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를</div></div>
            <div className="line"><div className="circle red1" /><div className="text">천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를</div></div>
            <div className="line"><div className="circle red2" /><div className="text">천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를</div></div>
          </div>
          <div className="page">
            <div className="this number">1</div>
            <div className="another number">2</div>
            <div className="another number">3</div>
            <div className="another number">4</div>
            <div className="more">...</div>
          </div>
        </MakerBoard>
      </div>
    </Wrapper>);
  }
}

export default MakerDetail;
