import React, { Component } from "react";
import Loading from "components/Commons/Loading";
import { DesignRequestDetail_mobile } from "./DesignRequestDetail_mobile";
import { DesignResponseDetail_mobile } from "./DesignResponseDetail_mobile";
import styled from "styled-components"
import ArticleModal from "components/Commons/ArticleModal/ArticleModal";
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import market_style from "market_style";
const Wrapper = styled.div`
  width:100%;
  padding:10px;
  .buttonBox{
    margin-top:10px;
  }
`
const Button = styled.div`
  width:100%;
  height:35px;
  border-radius:10px;
  background-color:${props=>props.background==null?"#FF3838":props.background};
  color:${props=>props.color==null?"white":props.color};
  box-shadow: 2px 2px 3px #00000019;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:${market_style.font.size.small1};
  font-weight:500;
  margin-top:10px;
`
const ShadowBox = styled.div`
  width:100%;
  height:max-content;
  border-radius:10px;
  box-shadow: 2px 2px 5px #00000029;
  border:1px solid #eaeaea;
  padding:10px 20px;
  .title{
    width:100%;
    text-align:center;
    font-size:${market_style.font.size.small1};
    font-weight:800;
    color:#c1c1c1;
    margin-bottom:10px;
  }
  .row{
    width:100%;
  }
  .label_{
    min-width:85px;
    height:22px;
    border-right:1px solid #707070;
    margin-right:20px;
    font-family:${market_style.font.size.small1};
    font-weight:700;
    color:#707070;
  }
  .padding{padding-left:10px;padding-right:10px;}
  .paddingNormal{padding:5px 10px;}
  .marginTop1{margin-top:5px;}
  .marginTop2{margin-top:10px;}
  .marginTop3{margin-top:20px;}
  .fontBig{font-size:${market_style.font.size.small1};font-weight:800;}
  .fontNormal{font-size:${market_style.font.size.small1};font-weight:400;}
  .fontSmall{font-size:${market_style.font.size.mini2};font-weight:400;}
  .black{color:black;}
  .flex{display:flex;}
  .flexWrap{flex-wrap:wrap;}
  .justifyCenter{justify-content:center;}
  .alignCenter{align-items:center;}
  .spaceBetween{justify-content:space-between;}
  .flexEnd{justify-content:flex-end;}
  .column{flex-direction:column;}
  .textRight{text-align:right;}
  .ellipsis{width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}

  .attach-file {
    width:100%;
    height: 19px;
    display: flex;
    align-items: center;
    text-align: left;
    font: normal normal normal 13px/19px Noto Sans KR;
    letter-spacing: 0px;
    color: #FF0000;

  .attach-link {
    width: 150px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
   } 

  .attach-arrow {
    width: 10px;
    height: 10px;
    border-left:1px solid #FF3838;
    border-bottom:1px solid #FF3838;
    margin-right: 15px;
    margin-left: 4px;
  }
}
`
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      write: false,
    }
    this.updateNoneRequest = this.updateNoneRequest.bind(this);
  }
  returnToList = () => {
    window.location.href = "/request/" + this.props.Detail.type;
  }
  updateNoneRequest = (title, content) => {
    const data = {
      type: this.props.type,
      status: "normal",
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      // content: this.state.content,
      // title: this.state.title,
      title: title,
      content: content,
      expert_id: this.props.id || null,
      personal: this.props.id || null,
    };
    this.props.UpdateRequestRequest(this.props.id, data, this.props.token)
      .then(res => {
        if (res.success) {
          this.props.GetRequestDetailRequest(this.props.id);
        }
        this.setState({ write: false, title: "", comment: "" });
      })
      .catch(err => console.log("에러발생" + err));
  }
  render() {
    const { Detail, MyDetail, userInfo, category1, category2,
      isPurchased, purchase, confirm,
    } = this.props;
    if (Detail == null || Detail.length === 0) return (<Loading />);

    const level1 = Detail.status === "response" ? Detail.request.category_level1 : Detail.category_level1;
    const level2 = Detail.status === "response" ? Detail.request.category_level2 : Detail.category_level2;
    const category_level1 = category1 && category1[level1 - 1] && category1[level1 - 1].text;
    const category_level2 = (level2 && category2 && category2.filter(cate => cate.value === level2)[0].text) || "";

    console.log(this.props);

    return (<React.Fragment>
      {this.state.write ?
        <ArticleModal
          title={Detail && Detail.title}
          content={Detail && Detail.content}
          write={this.state.write}
          handlerModal={(write) => { this.setState({ write: write }) }}
          isModify={true}
          updateNoneRequest={(title, content) => this.updateNoneRequest(title, content)}
        />
        : null
      }
      {/* REQUEST DETAIL */}
      {Detail.status === "request"
        ? <DesignRequestDetail_mobile
          Detail={Detail}
          userInfo={userInfo}
          MyDetail={MyDetail}
          returnToList={() => this.returnToList()}
          onClick={() => this.onClickResponse()}
          category_level1={category_level1}
          category_level2={category_level2}
        /> : null}

      {/* RESPONSE DETAIL */}
      {Detail.status === "response"
        ? <DesignResponseDetail_mobile
          {...Detail}
          returnToList={() => this.returnToList()}
          onClick={() => this.onClickResponse()}
          userInfo={userInfo}
          isPurchased={isPurchased}
          purchase={purchase}
          confirm={confirm}
          category_level1={category_level1}
          category_level2={category_level2}
        /> : null}

      {/* NORMAL DETAIL */}
      {Detail.status === "normal"
        ? <Wrapper>
          <ShadowBox>
            <div className="title black">게시글</div>
              <div className="row flex marginTop3">
                <div className="label_">제목</div>
                <div className="content">{Detail && Detail.title}</div>
              </div>
              <div className="row flex marginTop3">
                <div className="label_">작성자</div>
                <div className="content">{Detail && Detail.nick_name}</div>
              </div>
              <div className="row flex marginTop3">
                <div className="label_">내용</div>
                <div className="content" dangerouslySetInnerHTML={{ __html: Detail && Detail.content }} />
              </div>
          </ShadowBox>
          <div className="buttonBox">
              {userInfo&&(Detail.user_id === userInfo.uid)
                ? <React.Fragment>
                          <Button onClick={() => this.setState({ write: true })}  background="#FF3838" color="white">수정하기</Button>
                          <Button onClick={() => { this.props.DeleteRequestRequest(this.props.id, this.props.token); window.location.href = "/request/designer" }}  background="#707070" color="white">삭제하기</Button>
                </React.Fragment>
                : null
              }
          </div>
        </Wrapper>
        : null}

    </React.Fragment>);
  }
}
