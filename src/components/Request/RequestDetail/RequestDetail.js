import React, { Component } from "react";
import styled from "styled-components";
import Loading from "components/Commons/Loading";
// import { Link } from "react-router-dom";
// import ContentBox from "components/Commons/ContentBox";
// import { RedButton, } from "components/Commons/CustomButton"
// import FileIcon from "components/Commons/FileIcon";
import category_icon from "source/category_icon.svg";
import market_style from "market_style";

const LocationList = [
  { value: 0, text: "서울특별시" },
  { value: 1, text: "부산광역시" },
  { value: 2, text: "대구광역시" },
  { value: 3, text: "인천광역시" },
  { value: 4, text: "광주광역시" },
  { value: 5, text: "대전광역시" },
  { value: 6, text: "울산광역시" },
  { value: 7, text: "경기도" },
  { value: 8, text: "강원도" },
  { value: 9, text: "충청북도" },
  { value: 10, text: "충청남도" },
  { value: 11, text: "전라북도" },
  { value: 12, text: "경상북도" },
  { value: 13, text: "경상남도" },
  { value: 14, text: "제주도" },
  { value: 15, text: "제한없음" },
];
const CustomIcon = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-image: url(${props => props.imgURL});
  background-repeat: no-repeat;
  background-size: contain;
  padding: ${props => props.padding}px;
  margin-right: ${props => props.marginRight == null ? "13" : props.marginRight}px;
  margin-left: ${props => props.marginLeft == null ? "13" : props.marginLeft}px;
  display: ${props => props.isNon == true ? "none" : "block"}
`;
const DesignRequestDetailWrapper = styled.div`
*{border:1px solid #AEAEAE;}
  width: 100%;
  padding: 0px 30px;

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
    width: 1306px;
    min-height: 554px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 3px 3px 5px #0000001A;
    border: 0.25px solid #B7B7B7;
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
  .flex-and-middle {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .taglist {
    display: flex;
    flex-direction: row;
    .tag {
      height: 31px;
      background: #E9E9E96A 0% 0% no-repeat padding-box;
      border-radius: 10px;
      padding: 5px 12px 4px 13px; 
      /* top | right | bottom | left */
      text-align: left;
      font: normal normal normal 15px/22px Noto Sans KR;
      letter-spacing: 0px;
      color: #707070;
      margin-right: 10px;
    }

  }
  .attach-file {
    display: flex;
    align-items: center;

    height: 19px;
    text-align: left;
    font: normal normal normal 13px/19px Noto Sans KR;
    letter-spacing: 0px;
    color: #FF0000;

    .attach-arrow {
      width: 10px;
      height: 10px;
      background-color: #FF0000;
      margin-right: 16px;
      margin-left: 4px;
    }
  }

  .bottom {
    width: 100%;
    height: 30px;
    margin-top: 20px;
    position: relative;
    display: flex;

    .reply {
      margin: auto;
      width: 150px;
      height: 30px;
      background: #FF0000 0% 0% no-repeat padding-box; /* Green - #4CAF50; */
      border: none;
      text-align: center;
      text-decoration: none;
      text-align: center;
      font: normal normal bold 15px/22px Noto Sans KR;
      letter-spacing: 0px;
      color: #FFFFFF;
    }

    .back {
      position: absolute;
      width: max-content;
      right: 20px;
      height: 19px;
      background: #FFFFFF;
      border: none;

      text-align: left;
      font: normal normal medium 13px/19px Noto Sans KR;
      letter-spacing: 0px;
      color: #707070;
    }
  }
`;

const DesignRequestDetail = (props) => {
  const {
    nick_name, title,
    category_level1, category_level2, categoryName,
    tag, content, price, file_url, filename,
    start_date, end_date,
    location, ownership, } = props;

  console.log(props);

  return (<DesignRequestDetailWrapper>

    <div className="title">
      <p className="text">
        디자인 의뢰 상세
      </p>
    </div>
    {/*
amount: null, categoryName: "커뮤니케이션", category_level1: 2, category_level2: null, category_level3: null,
client_id: 22, completed: 0, content: "<p>1</p>", create_time: "2021-03-17T03:23:51.000Z", end_date: "2021-03-17",
expert_id: null, file_url: "", filename: "", group_id: 57, location: "15",
nick_name: "Vowood", offline_consultation: "0", ownership: "1", personal: null, price: 0, resale: null, sort_in_group: 0, start_date: "2021-03-17", status: "request",
tag: "", thumbnailUrl: {s_img: "https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/dev/thumbnails/1593145861774-x50.png", m_img: "https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/dev/thumbnails/1593145861774-x200.png", l_img: "https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/dev/thumbnails/1593145861774-x600.png"},
title: "1", type: "designer", uid: 57, update_time: "2021-03-17T03:23:51.000Z"
*/}
    <div className="form">
      <div className="row">
        <div className="label">의뢰자</div>
        <div className="content">{nick_name || "이름없음"}</div>
      </div>
      <div className="row">
        <div className="label">제목</div>
        <div className="content">{title || "제목없음"}</div>
      </div>
      <div className="row">
        <div className="label">카테고리</div>
        <div className="content flex-and-middle">
          {category_level1}
          {category_level2 ? <CustomIcon width="5" height="10" marginRight="20" marginLeft="20" imgURL={category_icon} /> : null}
          {category_level2 ? category_level2 : null}
        </div>
      </div>
      <div className="row">
        <div className="label">태그</div>
        <div className="content taglist">{tag && tag.split(",").map((t, index) => <p key={t + index} className="tag">{t}</p>)}</div>
      </div>
      <div className="row">
        <div className="label">의뢰 내용</div>
        <div className="content">
          <div dangerouslySetInnerHTML={{ __html: `${content || ""}` }} />
          <div className="attach-file"> <div className="attach-arrow" /> 첨부파일: {filename ? <a href={file_url}>{filename}</a> : "없음"}</div> {/* &#10145; */}
        </div>
      </div>
      <div className="row">
        <div className="label">희망 비용</div>
        <div className="content">{parseInt(price, 10) / (price > 9999 ? 10000 : 1) + (price > 9999 ? "만" : "") + " point"}</div>
      </div>
      <div className="row">
        <div className="label">기간</div>
        <div className="content">{start_date}~{end_date}</div>
      </div>
      <div className="row">
        <div className="label">디자인 위치</div>
        <div className="content">{LocationList[location || 15].text}</div>
      </div>
      <div className="row">
        <div className="label">디자인 소유권</div>
        <div className="content">{ownership <= 0 ? "의뢰자" : "디자이너"}</div>
      </div>
    </div>

    <div className="bottom">
      <button className="reply">의뢰응답</button>
      <button className="back"> {"<"} 목록으로</button>
    </div>

  </DesignRequestDetailWrapper>)
}


class Detail extends Component {
  constructor(props) {
    super(props);
    this.onClickResponse = this.onClickResponse.bind(this);
  }
  onClickResponse() {
    console.log(this.props);
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

    }
  }

  render() {
    const { Detail, MyDetail, } = this.props;
    if (Detail == null || Detail.length === 0) return (<Loading />);

    // const TypeText = Detail.type === "maker" ? "제작" : "디자인";
    const level1 = Detail.status === "response" ? Detail.request.category_level1 : Detail.category_level1;
    const level2 = Detail.status === "response" ? Detail.request.category_level2 : Detail.category_level2;
    const category_level1 = this.props.category1 && this.props.category1[level1 - 1] && this.props.category1[level1 - 1].text;
    const category_level2 = (level2 && this.props.category2 && this.props.category2.filter(cate => cate.value === level2)[0].text) || "";

    return (<React.Fragment>

      {/* DESIGN REQUEST DETAIL */}
      {Detail.type === "designer" && Detail.status === "request"
        ? <DesignRequestDetail {...Detail} category_level1={category_level1} category_level2={category_level2} />
        : null}

      {/* DESIGN RESPONSE DETAIL */}

      {/* MAKER REQUEST DETAIL */}

    </React.Fragment>);
  }
}

export default Detail;
