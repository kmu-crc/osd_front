import React, { Component } from "react";
import Loading from "components/Commons/Loading";
import { DesignRequestDetail } from "./DesignRequestDetail";
import { DesignResponseDetail } from "./DesignResponseDetail";
import styled from "styled-components"
import ArticleModal from "components/Commons/ArticleModal/ArticleModal";
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import market_style from "market_style";

const NormalWrapper = styled.div`
  padding:0px 30px;
  margin-bottom:30px;
  .title {
    margin-top: 20px;
    margin-bottom: 15px;
    .text {
      width: max-content;
      margin: auto;
      font: normal normal bold 20px/29px Noto Sans KR;
      letter-spacing: 0px;
      color: #000000;
      text-align: center;
    }
  }
  .buttonBox{
    display:flex;
    justify-content:center;
    margin-top:20px;
  }
  .form {
    width: 100%;
    height:max-content;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 3px 3px 5px #0000001A;
    border: 0.25px solid #eaeaea;
    border-radius: 20px;
    padding: 40px 100px;

    .row {
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;
      
      .label {
        height: 22px;
        min-width: 140px;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        border-right: 1px solid #707070;

        text-align: left;
        font: normal normal medium 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #707070;

        margin-right: 94px;
        margin-bottom:5px;
      }

      .content {
        width: 100%;
        max-width: max-content;
        margin-bottom: 31px;
        
        text-align: left;
        font: normal normal normal 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #000000;
      }
    }
  }
}
@media only screen and (min-width: 500px) and (max-width:1000px){

  .form{
    padding:40px 10%;
    .row{
      .label{
        margin-right: 30px;
      }
    }
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
        ? <DesignRequestDetail
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
        ? <DesignResponseDetail
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
        ? <React.Fragment>
          <NormalWrapper>
            <div className="title">
              <p className="text">게시글</p>
            </div>

            <div className="form">
              <div className="row">
                <div className="label">제목</div>
                <div className="content">{Detail && Detail.title}</div>
              </div>
              <div className="row">
                <div className="label">작성자</div>
                <div className="content">{Detail && Detail.nick_name}</div>
              </div>
              <div className="row">
                <div className="label">내용</div>
                <div className="content" dangerouslySetInnerHTML={{ __html: Detail && Detail.content }} />
              </div>
            </div>
            <div className="buttonBox">
              {(Detail.user_id === userInfo.uid)
                ? <React.Fragment>
                  <RedButton width={150} height={30} fontSize={market_style.font.size.small1} okText="확인" cancelText="취소" value={"수정하기"} onClick={() => this.setState({ write: true })} isConfirm={false} />
                  <GrayButton width={150} height={30} fontSize={market_style.font.size.small1} text={"삭제하시겠습니까?"} value={"삭제하기"} onClick={() => { this.props.DeleteRequestRequest(this.props.id, this.props.token); window.location.href = "/request/designer" }} isConfirm={true}></GrayButton>
                </React.Fragment>
                : null
              }
            </div>
          </NormalWrapper>
        </React.Fragment>
        : null}

    </React.Fragment>);
  }
}
