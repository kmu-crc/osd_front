import React, { Component } from "react";
import Loading from "components/Commons/Loading";
import { DesignRequestDetail } from "./DesignRequestDetail";
import { DesignResponseDetail } from "./DesignResponseDetail";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.onClickResponse = this.onClickResponse.bind(this);
  }
  onClickResponse() {
    if (this.props.Detail.status === "request") {
      // console.log(this.props.Detail.type == "designer_req");
      if (this.props.Detail.type === "designer_req" || this.props.Detail.type === "designer") {
        window.location.href = "/ModifyrequestToDesigner/" + this.props.id;
      }
      else if (this.props.Detail.type === "maker" || this.props.Detail.type === "maker_req") {
        window.location.href = "/ModifyrequestToMaker/" + this.props.id;
      }
    }
    else if (this.props.Detail.status === "response") {
      alert("미구현");
    }
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
      {this.props.Detail.status}

      {/* REQUEST DETAIL */}
      {Detail.status === "request"
        ? <DesignRequestDetail
          {...Detail}
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
          category_level1={category_level1}
          category_level2={category_level2}
        /> : null}

      {/* NORMAL DETAIL */}
      {Detail.status === "normal"
        ? <div>{Detail.status}</div>
        : null}

    </React.Fragment>);
  }
}
