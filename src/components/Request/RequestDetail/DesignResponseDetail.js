import React from 'react';
import styled from "styled-components";

import category_icon from "source/category_icon.svg";

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
const DesignResponseDetailWrapper = styled.div`
  width: 100%;
  padding: 0px 30px;
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
  
  .form-list {
    width:102%;
    display: flex;
    flex-direction: row;
    justify-content:center;
    flex-wrap:wrap;
  }

  .form {
    width: 643px;
    max-width:100%;
    min-height: 582px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 3px 3px 5px #0000001A;
    border: 0.25px solid #eaeaea;
    border-radius: 20px;
    padding: 30px 50px;
    margin-right:20px;
    margin-bottom:20px;

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
    .attach-link {
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      width: 100%;
     }  
    .attach-arrow {
      width: 10px;
      height: 10px;
      // background-color: #FF0000;
      margin-right: 16px;
      margin-left: 4px;
      
      border-left: 1px solid red;
      border-bottom: 1px solid red;
      
      // .addfilebox{
      //   .addfile{
      //     width:10px;
      //     height:10px;
      //     border-left: 1px solid red;
      //     border-bottom: 1px solid red;
      //   }
      //   .black_addfile{
      //     width: 10px;
      //     height: 10px;
      //     border-left: 1px solid black;
      //     border-bottom: 1px solid black;
      //   }
      // }
    }
  }
  
  .bottom {
    width: 100%;
    height: 30px;
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
      display: flex;
      flex-direction: row;

      text-align: left;
      font: normal normal medium 13px/19px Noto Sans KR;
      letter-spacing: 0px;
      color: #707070;
    }
  }
  @media only screen and (min-width: 500px) and (max-width:1000px){

    .form{
      padding: 30px 10%;
      .row{
        .label{
          margin-right: 30px;
        }
      }
    }
  }
`;

export const DesignResponseDetail = (props) => {
  console.log(props);
  const { request, client_name, nick_name, content, filename, file_url, price, category_level1, category_level2, start_date, end_date } = props;
  // amount: null, category_level1: 2, category_level2: 1, category_level3: null, client_id: 22, completed: 0, content: "<p style="color:red">의뢰내용입니다.<br/> 이 사이트의 버그를<br/> 
  // 찾아서 고쳐주실 수 있을까요???<br/>버<br/>그<br/>버<br/>그<br/>버<br/>그<br/>버<br/>그<br/><br/></p>", create_time: "2021-03-17T03:23:51.000Z", end_date: "2021-03-17", expert_id: null, 
  // file_url: "", filename: "", group_id: 57, location: "15", offline_consultation: "0", ownership: "1", personal: null, price: 0, resale: null, sort_in_group: 0, start_date: "2021-03-17", 
  // status: "request", tag: "abc,cde,efg", title: "1", type: "designer", uid: 57, update_time: "2021-03-17T03:23:51.000Z"

  return (<DesignResponseDetailWrapper>
    <div className="title">
      {props.type === "designer" ? <p className="text"> 디자인 의뢰 응답</p> : null}
      {props.type === "maker" ? <p className="text"> 제작 의뢰 응답</p> : null}
    </div>

    <div className="form-list">
      {/* 의뢰 */}
      <div className="form">
        <div className="row">
          <div className="label">의뢰자</div>
          <div className="content">{client_name || "이름없음"}</div>
        </div>
        <div className="row">
          <div className="label">제목</div>
          <div className="content">{request.title || "제목없음"}</div>
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
          <div className="content taglist">{request.tag ? request.tag.split(",").map((t, index) => <p key={t + index} className="tag">{t}</p>) : "없음"}</div>
        </div>
        <div className="row">
          <div className="label">의뢰 내용</div>
          <div className="content">
            <div dangerouslySetInnerHTML={{ __html: `${request.content || ""}` }} />
            <div className="attach-file">
              <div className="attach-arrow" />
              <div className="attach-link">
                첨부파일: {request.filename ? <a href={request.file_url}>{request.filename}</a> : "없음"}</div> {/* &#10145; */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="label">희망 비용</div>
          <div className="content">{parseInt(request.price, 10) / (request.price > 9999 ? 10000 : 1) + (request.price > 9999 ? "만" : "") + " point"}</div>
        </div>
        <div className="row">
          <div className="label">기간</div>
          <div className="content">{request.start_date}~{request.end_date}</div>
        </div>
        <div className="row">
          <div className="label">디자인 위치</div>
          <div className="content">{LocationList[parseInt(request.location, 10) || 15].text}</div>
        </div>
        <div className="row">
          {
            props.type === "designer" ?
            <div className="label">디자인 소유권</div>
            :<div className="label">제작 소유권</div>
          }
          <div className="content">{request.ownership <= 0 ? "의뢰자" : "디자이너"}</div>
        </div>
      </div>
      {/* 응답 */}
      <div className="form">
        <div className="row">
          <div className="label">응답자</div>
          <div className="content">{nick_name || "이름없음"}</div>
        </div>
        <div className="row">
          <div className="label">설명</div>
          <div className="content">
            <div dangerouslySetInnerHTML={{ __html: `${content || ""}` }} />
            <div className="attach-file">
              <div className="attach-arrow" />
              첨부파일: {filename ? <a href={file_url}>{filename}</a> : "없음"}</div> {/* &#10145; */}
          </div>
        </div>
        <div className="row">
          <div className="label">희망비용</div>
          <div className="content">{parseInt(price, 10) / (price > 9999 ? 10000 : 1) + (price > 9999 ? "만" : "") + " point"}</div>
        </div>
        <div className="row">
          <div className="label">기간</div>
          <div className="content">{start_date}~{end_date}</div>
        </div>
      </div>
    </div>

    {/*  */}
    <div className="bottom">
      {
        props.userInfo &&
          props.userInfo && props.userInfo.uid == props.expert_id ?
          <button onClick={() => {
            window.location.href = `${props.type == "designer" ? "/modifyResponseToDesignerReq" : "/modifyResponseToMakerReq"}/${props.uid}`
          }
          } className="reply">응답수정</button> : null

      }
      {props.userInfo && props.isPurchased === false && props.userInfo.uid === props.client_id ?
        <button onClick={props.purchase} className="reply">의뢰구입</button> : null}

      <button onClick={() => props.returnToList()} className="back"> <CustomIcon style={{ transform: "rotate(180deg)", opacity: ".9" }} width="5" height="10" marginRight="12" marginLeft="0" imgURL={category_icon} /> 목록으로</button>
    </div>

  </DesignResponseDetailWrapper>)
}