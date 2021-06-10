import React from 'react';
import styled from "styled-components";
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
const Wrapper =styled.div`
  width:100%;
  min-height:700px;
  overflow-x:hidden;
  padding:0px 10px;
  .header{
    width:100%;
    text-align:center;
    font-size:${market_style.font.size.normal2};
    font-weight:800;
    color:#c1c1c1;
    margin-top:3px;
    margin-bottom:10px;
  }
  .marginTop{margin-top:15px;}
  .buttonBox{
    width:100%;
    margin-top:20px;
  }
  .redButton{
    width:100%;
    height:35px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:500;
    color:white;
    box-shadow: 2px 2px 3px #00000019;
    margin-top:15px;
    background-color:red;
    border-radius:10px;
    font-size:${market_style.font.size.small1};
  }
  .greyButton{
    width:100%;
    height:35px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:500;
    color:white;
    box-shadow: 2px 2px 3px #00000019;
    margin-top:10px;
    background-color:#707070;
    border-radius:10px;
    font-size:${market_style.font.size.small1};
  }
`

const ShadowBox = styled.div`
  width:100%;
  height:max-content;
  border-radius:10px;
  box-shadow: 2px 2px 5px #00000029;
  border:1px solid #eaeaea;
  padding:20px;
  .row{
    width:100%;
  }
  .label{
    min-width:106px;
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
    border-left:1px solid red;
    border-bottom:1px solid red;
    margin-right: 15px;
    margin-left: 4px;
  }
}
`
const RedButton = styled.div`
  width:${props=>props.width==null?"100%":props.width+"%"};
  height:35px;
  display:flex;
  border-radius:10px;
  border:${props=>props.isLike==true?null:"2px solid red"};
  box-shadow: 2px 2px 3px #00000019;
  justify-content:center;
  align-items:center;
  background-color:${props=>props.isLike==true?"red":"white"};
  color:${props=>props.isLike==true?"white":"red"};
  font-size:${market_style.font.size.small1};
  font-weight:800;
  margin-top:10px;
  margin-right:${props=>props.marginRight==null?"0px":props.marginRight+"%"};
`
const TagPiece = styled.div`
    width: max-content;
    min-width: max-content;
    background-color:#E9E9E96A;
    margin-right: 8px;
    margin-bottom: 5px;
    color: #707070;
    padding:5px 12px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    font-size:${market_style.font.size.small1};
    .close {
        margin-left: 10px;
        width: max-content;
        height: max-content;
        padding: 0px 2px;
    }
`;
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
// const LocationList = [
//   { value: 0, text: "서울특별시" },
//   { value: 1, text: "부산광역시" },
//   { value: 2, text: "대구광역시" },
//   { value: 3, text: "인천광역시" },
//   { value: 4, text: "광주광역시" },
//   { value: 5, text: "대전광역시" },
//   { value: 6, text: "울산광역시" },
//   { value: 7, text: "경기도" },
//   { value: 8, text: "강원도" },
//   { value: 9, text: "충청북도" },
//   { value: 10, text: "충청남도" },
//   { value: 11, text: "전라북도" },
//   { value: 12, text: "경상북도" },
//   { value: 13, text: "경상남도" },
//   { value: 14, text: "제주도" },
//   { value: 15, text: "제한없음" },
// ];
// const CustomIcon = styled.div`
//   width: ${props => props.width}px;
//   height: ${props => props.height}px;
//   background-image: url(${props => props.imgURL});
//   background-repeat: no-repeat;
//   background-size: contain;
//   padding: ${props => props.padding}px;
//   margin-right: ${props => props.marginRight == null ? "13" : props.marginRight}px;
//   margin-left: ${props => props.marginLeft == null ? "13" : props.marginLeft}px;
//   display: ${props => props.isNon == true ? "none" : "block"}
// `;
// const DesignResponseDetailWrapper = styled.div`
//   width: 100%;
//   padding: 0px 30px;
//   margin-bottom:30px;
//   .title {
//     margin-top: 20px;
//     margin-bottom: 15px;
//     .text {
//       width: max-content;
//       margin: auto;
//       font: normal normal bold 20px/29px Noto Sans KR;
//       letter-spacing: 0px;
//       color: #000000;
//       text-align: center;
//     }
//   }
  
//   .form-list {
//     width:102%;
//     display: flex;
//     flex-direction: row;
//     justify-content:center;
//     flex-wrap:wrap;
//   }

//   .form {
//     width: 643px;
//     max-width:100%;
//     min-height: 582px;
//     background: #FFFFFF 0% 0% no-repeat padding-box;
//     box-shadow: 3px 3px 5px #0000001A;
//     border: 0.25px solid #eaeaea;
//     border-radius: 20px;
//     padding: 30px 50px;
//     margin-right:20px;
//     margin-bottom:20px;

//     .row {
//       display: flex;
//       flex-direction: row;
//       flex-wrap:wrap;

//       .label {
//         height: 22px;
//         min-width: 140px;
//         text-align: left;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//         overflow: hidden;
//         border-right: 1px solid #707070;

//         text-align: left;
//         font: normal normal medium 15px/22px Noto Sans KR;
//         letter-spacing: 0px;
//         color: #707070;

//         margin-right: 94px;
//         margin-bottom:5px;
//       }

//       .content {
//         width: 100%;
//         max-width: max-content;
//         margin-bottom: 31px;
        
//         text-align: left;
//         font: normal normal normal 15px/22px Noto Sans KR;
//         letter-spacing: 0px;
//         color: #000000;
//       }
//     }
//   }
//   .flex-and-middle {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//   }
//   .taglist {
//     display: flex;
//     flex-direction: row;
//     .tag {
//       height: 31px;
//       background: #E9E9E96A 0% 0% no-repeat padding-box;
//       border-radius: 10px;
//       padding: 5px 12px 4px 13px; 
//       /* top | right | bottom | left */
//       text-align: left;
//       font: normal normal normal 15px/22px Noto Sans KR;
//       letter-spacing: 0px;
//       color: #707070;
//       margin-right: 10px;
//     }
  
//   }
//   .attach-file {
//     display: flex;
//     align-items: center;
  
//     height: 19px;
//     text-align: left;
//     font: normal normal normal 13px/19px Noto Sans KR;
//     letter-spacing: 0px;
//     color: #FF0000;
//     .attach-link {
//       overflow:hidden;
//       text-overflow:ellipsis;
//       white-space:nowrap;
//       width: 100%;
//      }  
//     .attach-arrow {
//       width: 10px;
//       height: 10px;
//       // background-color: #FF0000;
//       margin-right: 16px;
//       margin-left: 4px;
      
//       border-left: 1px solid red;
//       border-bottom: 1px solid red;
      
//       // .addfilebox{
//       //   .addfile{
//       //     width:10px;
//       //     height:10px;
//       //     border-left: 1px solid red;
//       //     border-bottom: 1px solid red;
//       //   }
//       //   .black_addfile{
//       //     width: 10px;
//       //     height: 10px;
//       //     border-left: 1px solid black;
//       //     border-bottom: 1px solid black;
//       //   }
//       // }
//     }
//   }
  
//   .bottom {
//     width: 100%;
//     height: 30px;
//     position: relative;
//     display: flex;

//     .reply {
//       margin: auto;
//       width: 150px;
//       height: 30px;
//       background: #FF0000 0% 0% no-repeat padding-box; /* Green - #4CAF50; */
//       border: none;
//       text-align: center;
//       text-decoration: none;
//       text-align: center;
//       font: normal normal bold 15px/22px Noto Sans KR;
//       letter-spacing: 0px;
//       color: #FFFFFF;
//     }
  
//     .back {
//       position: absolute;
//       width: max-content;
//       right: 20px;
//       height: 19px;
//       background: #FFFFFF;
//       border: none;
//       display: flex;
//       flex-direction: row;

//       text-align: left;
//       font: normal normal medium 13px/19px Noto Sans KR;
//       letter-spacing: 0px;
//       color: #707070;
//     }
//   }
//   @media only screen and (min-width: 500px) and (max-width:1000px){

//     .form{
//       padding: 30px 10%;
//       .row{
//         .label{
//           margin-right: 30px;
//         }
//       }
//     }
//   }
// `;

export const DesignResponseDetail_mobile = (props) => {
  console.log(props);
  const { request, client_name, nick_name, content, filename, file_url, price, category_level1, category_level2, start_date, end_date } = props;


  return (
    <React.Fragment>
            <Wrapper>
        <div className="header">
          {props.type === "designer" ? <p className="text"> 디자인 의뢰 응답</p> : null}
          {props.type === "maker" ? <p className="text"> 제작 의뢰 응답</p> : null}
        </div>
        <ShadowBox>
           <div className="fontBig flex justifyCenter">의뢰 내용</div>
           <div className="row flex marginTop3">
              <div className="label">의뢰자</div>
              <div className="fontNomal">{client_name || "이름없음"}</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">제목</div>
              <div className="fontNomal">{request.title || "제목없음"}</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">카테고리</div>
              <div className="fontNomal flex alignCenter">
                {category_level1}
                {category_level2 ? <CustomIcon width="5" height="10" marginRight="20" marginLeft="20" imgURL={category_icon} /> : null}
                {category_level2 ? category_level2 : null}
              </div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">태그</div>
              <div className="flex flexWrap">
              {request.tag ? request.tag.split(",").map((t, index) => <p key={t + index} className="tag">{t}</p>) : "없음"}
              </div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">의뢰 내용</div>
              <div>
                 <div dangerouslySetInnerHTML={{ __html: `${request.content || ""}` }} />
                 <div className="attach-file">
                    <div className="attach-arrow" />
                    <div className="attach-link">
                      첨부파일: {request.filename ? <a href={request.file_url}>{request.filename}</a> : "없음"}
                    </div>
                 </div>
              </div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">희망 비용</div>
              <div className="fontNomal">{parseInt(request.price, 10) / (request.price > 9999 ? 10000 : 1) + (request.price > 9999 ? "만" : "") + " point"}</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">기간</div>
              <div className="fontNomal">{request.start_date}~{request.end_date}</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">
                {props.type === "designer" ?"디자이너 위치": null}
                {props.type === "maker" ? "메이커 위치" : null}
              </div>
              <div className="fontNomal">{LocationList[parseInt(request.location, 10) || 15].text}</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">
                {props.type === "designer" ?"디자인 소유권": null}
                {props.type === "maker" ? "제작 소유권" : null}
              </div>
              <div className="fontNomal">{request.ownership <= 0 ? "의뢰자" : "디자이너"}</div>
           </div>
        </ShadowBox>
        <ShadowBox className="marginTop">
          <div className="fontBig flex justifyCenter">응답 내용</div>
           <div className="row flex marginTop3">
              <div className="label">응답자</div>
              <div className="fontNomal">{nick_name || "이름없음"}</div>
           </div>
          <div className="row flex marginTop3">
                <div className="label">응답 내용</div>
                <div>
                  <div dangerouslySetInnerHTML={{ __html: `${content || ""}` }} />
                  <div className="attach-file">
                      <div className="attach-arrow" />
                      <div className="attach-link">첨부파일: {filename ? <a href={file_url}>{filename}</a> : "없음"}</div>
                  </div>
                </div>
          </div>
          <div className="row flex marginTop3">
                <div className="label">희망 비용</div>
                <div className="fontNomal">{parseInt(price, 10) / (price > 9999 ? 10000 : 1) + (price > 9999 ? "만" : "") + " point"}</div>
          </div>
          <div className="row flex marginTop3">
                <div className="label">기간</div>
                <div className="fontNomal">{start_date}~{end_date}</div>
          </div>
        </ShadowBox>
        <div className="buttonBox">
        {props.userInfo && props.isPurchased === false && props.userInfo.uid === props.client_id ?
            <div className="redButton" onClick={props.purchase} >의뢰구입</div> : null}
            <div className="greyButton" onClick={() => props.returnToList()} >목록으로</div>    
        </div>
      </Wrapper>
    </React.Fragment>
  )
}


{/* <DesignResponseDetailWrapper>
<div className="title">
  {props.type === "designer" ? <p className="text"> 디자인 의뢰 응답</p> : null}
  {props.type === "maker" ? <p className="text"> 제작 의뢰 응답</p> : null}
</div>

<div className="form-list">
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
            첨부파일: {request.filename ? <a href={request.file_url}>{request.filename}</a> : "없음"}</div>
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
          첨부파일: {filename ? <a href={file_url}>{filename}</a> : "없음"}</div> 
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

</DesignResponseDetailWrapper> */}