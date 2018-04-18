import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row, Columns } from "../Grid";

// css styling

const ViewWrapper = styled.div`
  padding: 40px;
  font-size: 16px;
  & .date {
    color: #a4a4a4;
    font-weight: 400;
    font-size: 14px;
  }
  & .content {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  & h4 {
    font-size: 16px;
  }
`;

const Header = Columns.extend`
  font-size: 20px;
`;

const ImageWrapper = styled.div`
  border: 1px solid #999;
  width: 90%;
  height: 300px;
  margin: auto;
  margin-bottom: 10px;
  text-align: center;
`;

const Source = Columns.extend`
  height: 100%;
`;

const Comment = Columns.extend`
  height: 100%;
  & ul {
    padding: 0 30px;
  }
  & li {
    padding: 15px 60px 15px 0;
    min-height: 60px;
  }
  & .cmtPic {
    width: 40px;
    height: 40px;
    background-color: #999;
    border-radius: 50% 50%;
    float: left;
    margin-right: 30px;
  }
`;

const CommentBox = Columns.extend`
  border: 1px solid #d1d5da;
  border-radius: 3px;
  & .cmtInfo {
    padding: 10px 15px;
    background-color: #f6f8fa;
  }
  & .cmtUser {
    min-width: 200px;
    float: left;
    margin-right: 10px;
  }
  & .cmtDate {
    font-size: 14px;
    color: #a4a4a4;
  }
  & .cmtText {
    min-height: 60px;
    color: dimgray;
    font-size: 15px;
    border-top: 1px solid #d1d5da;
    padding: 10px 15px;
  }
`;

const Form = styled.form`
  margin-top: 20px;
  padding: 0 30px;
  position: relative;
  & label {
    margin-right: 30px;
    display: block;
    width: 40px;
    float: left;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  & textarea {
    margin-right: 20px;
    width: 70%;
    height: 60px;
    border-radius: 3px;
    border: 1px solid #a4a4a4;
  }
  & button {
    position: absolute;
    top: 50%;
    margin-top: -16px;
  }
`;


class DetailView extends Component {
  render(){
    let view = this.props.DesignDetailView;
    return(
      <div>
        {view.length !== 0 && 
          <ViewWrapper>
            <Header width={10}>{view.title}</Header>
            <div className="date">최근 업데이트 {(view.create_time).split("T")[0]}</div>
            <div className="content">{view.content}</div>
            <ImageWrapper>
              {view.imageInfo.link}
            </ImageWrapper>
            <Source width={12}>
              <h4>첨부파일</h4>
            </Source>
            <Comment width={12}>
              <h4>댓글</h4>
              <ul>
                {view.commentInfo.map(cmt => 
                  <li key={cmt.uid}>
                    <div className="cmtPic"></div>
                    <CommentBox width={10}>
                      <div className="cmtInfo">
                        <div className="cmtUser">user id</div>
                        <span className="cmtDate">commented on {(cmt.update_time).split("T")[0]}</span>
                      </div>
                      <div className="cmtText">{cmt.comment}</div>
                    </CommentBox>
                    <Row/>
                  </li>
                )}
              </ul>
              <Form>
                <label>댓글</label>
                <textarea></textarea>
                <button className="red">등록</button>
              </Form>
            </Comment>
            <Row/>
          </ViewWrapper>
        }
      </div>
    );
  }
}

export default DetailView;