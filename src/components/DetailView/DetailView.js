import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row, Columns } from "../Grid";
import eximg from "../../source/eximg.jpeg";
import { Link } from "react-router-dom";
import CreateView from "../CreateView";

// css styling

const ViewWrapper = styled.div`
  padding: 20px 40px 50px;
  font-size: 16px;
  & .date {
    color: #a4a4a4;
    font-weight: 400;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: right;
  }
  & .content {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  & h4 {
    font-size: 16px;
  }
  & > .noData {
    text-align: center;
    font-size: 16px;
    padding-top: 30px;
  }
  & > .noData .red {
    margin-left: 10px;
    margin-right: 10px;
  }
  & > .upload .gokBiS {
    font-size: 14px;
    box-shadow: none;
  }
  & > .upload button{
    position: absolute;
    left: 50%;
    margin-left: -35px;
  }
`;

const ImageWrapper = styled.div`
  border: 1px solid #999;
  width: 90%;
  margin: auto;
  margin-bottom: 10px;
  text-align: center;
  & img {
    width: 100%;
    height: auto;
  }
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

const CommentBox = styled.div`
  display: inline-block;
  min-width: 200px;
  max-width: 80%;
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
    display: block;
    width: 70px;
    float: left;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  & textarea {
    margin-right: 25px;
    width: 80%;
    min-width: 200px;
    height: 60px;
    border-radius: 3px;
    border: 1px solid #a4a4a4;
  }
  & button {
    position: absolute;
    top: 50%;
    margin-top: -16px;
    background-color: #a4a4a4;
  }
`;

const GoStepBtn = styled.button`
  position: absolute;
  top: -30px;
  right: 2rem;
  padding: 5px 10px;
  border-radius: 3px;   
`;


class DetailView extends Component {
  componentDidMount() {
    this.props.GetDesignDetailViewRequest(this.props.id);
  }

  render(){
    let view = this.props.DesignDetailView;
    let len = Object.keys(view).length;   
    return(
      <div>
        {len !== 0 &&
          <ViewWrapper>
            <div className="date">최근 업데이트 {(view.create_time).split("T")[0]}</div>
            <ImageWrapper>
              <img src={eximg} alt=""/>
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
                    <CommentBox>
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
        <GoStepBtn onClick={this.props.goStep}>프로젝트형으로 변경</GoStepBtn>
      </div>
    );
  }
}

export default DetailView;