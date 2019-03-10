import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Icon } from "semantic-ui-react";
import DateFormat from "modules/DateFormat";
import Button from "components/Commons/Button";
import logo from "source/logo.png";
import ValidateForm from "components/Commons/ValidateForm";
import { FormField } from "components/Commons/FormField";
import { FormTextArea, FormTextAreaRed, FormInput} from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";
import StyleGuide from "StyleGuide";
import styled from "styled-components";
import host from "config";
import {GetDesignCommentRequest, CreateDesignCommentRequest, DeleteDesignCommentRequest} from "actions/Designs/DesignComment";

const CustomModal = styled(Modal)`
  padding: 20px;
  & .icon.close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${StyleGuide.color.geyScale.scale9};
    cursor: pointer;
  }
  & .ui.form textarea:not([rows]) {
    min-height: 2rem;
  }
`;

const CommentContainer = styled.div`
  &.ui.comments {
    max-width: 100%;
    width: 100%;
    margin-top:0px;
    margin-bottom: 2.5rem;
    & .delBtn {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }& .reply.comments{margin-left:45px;}
    & .userIcon{ 
    display: inline-block;
    width: 45px;
    height: 45px;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    border: 0;
    }
    & .content {
      margin-left: 5px;
      display:inline-block;
      width: max-content;
      padding: 5px 15px 5px 5px;
      border-radius: 10px;
      background-color: ${StyleGuide.color.main.brightness};
    }
    & .author {
    align-items: center;
      cursor:arrow;
    }
    & .text{
    align-items: center;
      display: inline-block;
    }
    & .text_btn{
    align-items: center;
      display: inline-block;
    }
  }
  & h4 {
    font-size: ${StyleGuide.font.size.heading4};
  }
  & .ui.button.primary {
    background: ${StyleGuide.color.main.basic};
    font-size: 12px;
    &:hover {
      border: 0;
      background: ${StyleGuide.color.main.light};
    }
    & .cancel {
    }
  }
  & p {
    text-align: center;
  }
  & .ui.form .field {
    margin-bottom: 1rem;
  }  

`;

class DesignComment extends React.Component {
  state = {
    render: true, reply: null
  };

  onClickedReply = (comment_uid) => (e) => {
    if(this.props.userInfo === undefined)
    {alert("로그인 해주세요");return}
    console.log("clicked", comment_uid);
    comment_uid == this.state.reply ? this.setState({reply:null}):this.setState({reply:comment_uid});
    return;
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.open !== nextProps.open && nextProps.open === true) {
      this.getComment();
    }
    return true;
  }

  getComment = () => {
    this.props.GetDesignCommentRequest(this.props.id)
  };

  createCommentRequest = async (data) => {
    this.props.CreateDesignCommentRequest(data, this.props.id, this.props.token)
      .then(res => {
        this.getComment();
      })
      .catch(err => console.log("error", err));
      await this.setState({
        render: false
      });
      this.setState({
        render: true
      });
  }

  onSubmitCmtForm = async data => {
    let packet = {
      comment: FormDataToJson(data).comment,
      d_flag: FormDataToJson(data).d_flag == "" ? null :FormDataToJson(data).d_flag,
    } 
    console.log(FormDataToJson(data).d_flag);
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    }
    if (packet.comment.length === 0 || packet.comment === "") {
      alert("내용을 입력해 주세요.");
      return;
    }
    this.createCommentRequest(packet);
    this.setState({reply:null});
  };

  onDeleteComment = data =>{
    if(data.replies.length>0){
      alert("이 댓글에 답변글이 있어 지우실 수 없습니다.");
      return;
    }
    this.props.DeleteDesignCommentRequest(this.props.id, data.uid, this.props.token)
      .then(res => {
        if (res.data && res.data.success === true) {
          this.getComment();
        }
      });
  }
  deleteComment = id => {
    this.props.DeleteDesignCommentRequest(this.props.id, id, this.props.token)
      .then(res => {
        if (res.data && res.data.success === true) {
          this.getComment();
        }
      });
  };
  render() {
    const { open, onClose, comment } = this.props;
    let parentcomments = comment.filter( item => item.d_flag == null);
    let comments = parentcomments.map ( parent => {
      let replies = comment.filter( item => item.d_flag === parent.uid);
      return {...parent, replies};
    });
    console.log(comments);
    const CommentForm = (value) => {
      return (
        <ValidateForm onSubmit={this.onSubmitCmtForm} className="ui comment form">
          <FormField name="comment" RenderComponent={FormTextAreaRed} maxLength="1000"/>
          <FormInput name="d_flag" type="hidden" value={value.value}/>
          <Button  type="submit" size="small"
            className="ui icon primary labeled button">
            게시
          </Button>
        </ValidateForm>
      );
    };
    return (
      <CustomModal open={open} onClose={onClose}>
        <Modal.Content>
          <Icon name="close" size="big" onClick={onClose} />
          <CommentContainer className="ui comments">
            <h3>댓글</h3>
            {comments.length > 0 && (
              comments.map(comm => (
                <div className="comment" key={comm.uid}>
                  <div className="userIcon" style={{backgroundImage: `url(${comm.s_img}), url(${logo})`}} onError={this.noneImage} />
                  <div className="content">
                    <div className="author">{comm.nick_name}</div>
                    <div className="text">
                       { 
                         comm.comment.split("\n").map((line, i) => {
                        return (
                          <span key={i}>
                            {line}
                            {(comm.comment.split("\n")).length != i + 1 ?
                            <br/>:null}
                          </span>
                        );
                      })}
                      </div>
                  </div>
                  <div className="metadata">
                    <a onClick={()=>this.onDeleteComment(comm)}> {this.props.userInfo && this.props.userInfo.uid === comm.user_id && <b>삭제</b>}</a>
                  </div>
                  <div>
                    <div className="metadata">
                      <div>{DateFormat(comm.create_time.split("T")[0])}</div>&nbsp;&nbsp;&nbsp;
                      <a onClick={this.onClickedReply(comm.uid)}><b>답글</b></a>
                    </div>
                      {this.state.reply == comm.uid && <CommentForm value={comm.uid}/>}
                    {comm.replies.length > 0 && 
                    <div>
                    <div className="ui reply comments">
                      {comm.replies.map(reply => (
                  <div className="comment" key={reply.uid}>
                  <div className="userIcon" style={{backgroundImage: `url(${reply.s_img}), url(${logo})`}}/>
                  <div className="content">
                    <div className="author">{reply.nick_name}</div>
                    <div className="text">
                       { 
                         reply.comment.split("\n").map((line, i) => {
                        return (
                          <span key={i}>
                            {line}
                            {(reply.comment.split("\n")).length != i + 1 ?
                            <br/>:null}
                          </span>
                        );
                      })}
                      </div>
                  </div>
                  <div className="metadata">
                    <a onClick={() => this.deleteComment(reply.uid)} >{this.props.userInfo&& this.props.userInfo.uid === comm.user_id && <b>삭제</b>}</a>
                  </div>
                  <div>
                    <div className="metadata">
                      <div>{DateFormat(reply.create_time.split("T")[0])}</div>
                    </div>
                  </div>
                  </div>
                      ))}
                    </div>
                    </div>
                    }
                  </div>
                </div>
              ))
            )}
            {this.state.render ? <CommentForm value={null}/> : null}
          </CommentContainer>
        </Modal.Content>
      </CustomModal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comment: state.DesignDetailComment.status.Comment,
    userInfo: state.Authentication.status.userInfo
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignCommentRequest: (id) => {
      return dispatch(GetDesignCommentRequest(id))
    },
    CreateDesignCommentRequest: (data, design_id, token) => {
      return dispatch(CreateDesignCommentRequest(data, design_id, token))
    },
    DeleteDesignCommentRequest: (data, design_id, token) => {
      return dispatch(DeleteDesignCommentRequest(data, design_id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignComment);
