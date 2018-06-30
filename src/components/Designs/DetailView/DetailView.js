import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Comment } from "semantic-ui-react";
import Button from "components/Commons/Button";

// css styling

const ViewWrapper = styled.div`
  width: 100%;
  & .date {
    color: #a4a4a4;
    font-weight: 400;
    font-size: 14px;
    text-align: right;
  }
  & h4 {
    font-size: 16px;
  }
  & > .noData {
    text-align: center;
    font-size: 16px;
    padding-top: 30px;
  }
  & .imageInfo {
    width: 100%;
    overflow: hidden;
  }
  & .sourceInfo {
    margin: 2rem 1rem;
  }
  & .imageInfo img {
    width: 100%;
  }
`;

const CommentContainer = styled(Comment)`
  max-width: 100%;
  width: 100%;
  margin-top: 3rem;
  text-align: center;
  & .reply.form .field {
    margin-bottom: 1rem;
  }
  & .reply.form > .button {
    float: right;
  }
`;

const GoStepBtn = styled(Button)`
  position: absolute;
  top: -30px;
  right: 2rem;
`;


class DetailView extends Component {
  componentWillMount() {
    this.props.GetDesignDetailViewRequest(this.props.match.params.id);
  }

  onActiveStep = () => {
    alert("스텝 기능을 사용하시겠습니까? 템플릿을 변경한 후에는 이전으로 돌아갈 수 없습니다. (현재 등록된 디자인은 저장됩니다)");
    this.props.ChangeToProjectRequest(this.props.match.params.id, this.props.token)
    .then(data => {
      if (data.success === true) {
        this.props.history.go(`/designDetail/${this.props.match.params.id}`);
      }
    });
  }

  render(){
    let view = this.props.DesignDetailView;
    let len = Object.keys(view).length;

    return(
      <Grid>
        {len > 0 ?
          <ViewWrapper>
            <div className="date">최근 업데이트 {(view.update_time).split("T")[0]}</div>
            {view.images &&
              <div className="imageInfo">
                {view.images.map(img =>
                  <img key={img.uid} src={img.link} alt={img.name} />
                )}
              </div>
            }
            {view.sources &&
              <div className="sourceInfo">
                <h4>첨부파일</h4>
                {view.sources.map(src =>
                  <div key={src.uid}>{src.name}</div>
                )}
              </div>
            }
            <CommentContainer>
              {view.commentInfo != null?
              view.commentInfo.map(comm=>(
                <div className="comment" key={comm.uid}>
                  <div className="avatar">
                    <img src="" alt="profile" />
                  </div>
                  <div className="content">
                    <a className="author">{comm.user_id}</a>
                    <div className="metadata">
                      <div>{comm.create_time.split("T")[0]}}</div>
                    </div>
                    <div className="text">{comm.comment}</div>
                  </div>
                </div>
                ))
              :
              <p>등록된 코멘트가 없습니다.</p>
              }
              <form className="ui reply form">
                <div className="field">
                  <textarea rows="3"></textarea>
                </div>
                <button className="ui icon primary left labeled button">
                  <i aria-hidden="true" className="edit icon"></i>
                  댓글쓰기
                </button>
              </form>
            </CommentContainer>
          </ViewWrapper>
        :
        <ViewWrapper>
          <p>내용이 없습니다.</p>
        </ViewWrapper>
        }
        {this.props.token && this.props.userInfo.uid === view.user_id && 
          <GoStepBtn onClick={this.onActiveStep}>프로젝트형으로 변경</GoStepBtn>
        }
      </Grid>
    );
  }
}

export default DetailView;
