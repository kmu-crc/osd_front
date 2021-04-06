import React, { Component } from "react";
import Loading from "components/Commons/Loading";
import { DesignRequestDetail } from "./DesignRequestDetail";
import { DesignResponseDetail } from "./DesignResponseDetail";
import styled from "styled-components"

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
  .form {
    width: 100%;
    height:max-content;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 3px 3px 5px #0000001A;
    border: 0.25px solid #eaeaea;
    border-radius: 20px;
    padding: 40px 150px;

    .row {
      display: flex;
      flex-direction: row;

      .label {
        height: 22px;
        width: 140px;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        border-right: 1px solid #707070;

        text-align: left;
        font: normal normal medium 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #707070;
      }

      .content {
        width: max-content;
        height: 100%;
        margin-bottom: 31px;
        margin-left: 94px;

        text-align: left;
        font: normal normal normal 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #000000;
      }
    }
  }
}
`

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.onClickResponse = this.onClickResponse.bind(this);
  }
  onClickResponse() {
    // switch(type){
    //   case "designer":
    //     if(status == "request"){
    //       if(isOwner==true){ // 수정
    //         window.location.href = "/ModifyrequestToDesigner/"+this.props.id;
    //       }else{ // 응답
    //         window.location.href = "/responseToDesignerReq/"+this.props.id;
    //       }
    //     }else if(status == "response"){
    //       if(isOwner == true){//수정
    //         window.location.href = "/modifyResponseToDesignerReq/"+this.props.id;
    //       }else{//구매
    //         window.location.href = "/modifyResponseToDesignerReq/"+this.props.id;
    //       }
    //     }
    //     break;
    //   case "maker":
    //     if(status == "request"){
    //       if(isOwner==true){ // 수정
    //         window.location.href = "/ModifyrequestToDesigner/"+this.props.id;
    //       }else{ // 응답
    //         window.location.href = "/responseToDesignerReq/"+this.props.id;
    //       }
    //     }else if(status == "response"){
    //       if(isOwner == true){//수정
    //         window.location.href = "/modifyResponseToDesignerReq/"+this.props.id;
    //       }else{//구매
    //         window.location.href = "/modifyResponseToDesignerReq/"+this.props.id;
    //       }
    //     }
    //     break;
    // }

    // if (this.props.Detail.status === "request") {
    //   if (this.props.Detail.type === "designer_req" || this.props.Detail.type === "designer") {
    //     window.location.href = "/ModifyrequestToDesigner/" + this.props.id;
    //   }
    //   else if (this.props.Detail.type === "maker" || this.props.Detail.type === "maker_req") {
    //     window.location.href = "/ModifyrequestToMaker/" + this.props.id;
    //   }
    // }
    // else if (this.props.Detail.status === "response") {
    //   alert("미구현");
    // }
  }
  returnToList = () => {
    window.location.href = "/request/" + this.props.Detail.type;
  }

  render() {
    const { Detail, MyDetail, userInfo } = this.props;
    if (Detail == null || Detail.length === 0) return (<Loading />);

    const level1 = Detail.status === "response" ? Detail.request.category_level1 : Detail.category_level1;
    const level2 = Detail.status === "response" ? Detail.request.category_level2 : Detail.category_level2;
    const category_level1 = this.props.category1 && this.props.category1[level1 - 1] && this.props.category1[level1 - 1].text;
    const category_level2 = (level2 && this.props.category2 && this.props.category2.filter(cate => cate.value === level2)[0].text) || "";

    return (<React.Fragment>

      {/* REQUEST DETAIL */}
      {Detail.status === "request"
        ? <DesignRequestDetail
          Detail = {Detail}
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
          isPurchased={this.props.isPurchased}
          purchase={this.props.purchase}
          confirm={this.props.confirm}
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

            <div className="form-list">
              <div className="form">
                <div className="row">
                  <div className="label">제목</div>
                  <div className="content">{this.props.Detail&&this.props.Detail.title}</div>
                </div>
                <div className="row">
                  <div className="label">작성자</div>
                  <div className="content">{this.props.Detail&&this.props.Detail.nick_name}</div>
                </div>
                <div className="row">
                  <div className="label">내용</div>
                  <div className="content" dangerouslySetInnerHTML={{ __html: this.props.Detail&&this.props.Detail.content }}/>
                </div>
              </div>
            </div>
          </NormalWrapper>
        </React.Fragment>
        : null}

    </React.Fragment>);
  }
}
