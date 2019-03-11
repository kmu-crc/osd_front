import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Icon } from "semantic-ui-react";
import StyleGuide from "StyleGuide";
import styled from "styled-components";
import Button from "components/Commons/Button";
import ValidateForm from "components/Commons/ValidateForm";
import { FormField } from "components/Commons/FormField";
import { FormTextArea, FormTextAreaRed, FormInput} from "components/Commons/FormItem";
import {GetDesignCommentRequest, CreateDesignCommentRequest, DeleteDesignCommentRequest} from "actions/Designs/DesignComment";
import DateFormat from "modules/DateFormat";
import FormDataToJson from "modules/FormDataToJson";
import logo from "source/thumbnail.png";
import { relative } from "path";

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
  max-width:"100%";
  &.ui.comment{

  }
  $ h4 {
    font-size: ${StyleGuide.font.size.heading4};
  }
`;
class DesignComment extends React.Component {
  state = {
    render: true, reply: null
  };

  onClickedReply = (comment_uid) => (e) => {
    if(this.props.userInfo === undefined){alert("로그인 해주세요");return}
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
        <ValidateForm onSubmit={this.onSubmitCmtForm} style={{padding:"0px 0px 0px 0px",margin:"0px 0px 0px 0px"}}>
          <FormField name="comment" RenderComponent={FormTextAreaRed} maxLength="1000"/>
          <FormInput name="d_flag" type="hidden" value={value.value} />
          <Button type="submit" size="small"> 게시 </Button>
          <button type="reset" size="small"> 취소 </button>
        </ValidateForm>
      );
    };
    return (
      <CustomModal open={open} onClose={onClose}>
        <Modal.Content>
          <Icon name="close" size="big" onClick={onClose} />
          <CommentContainer>
            <h4> 댓글 </h4>
              {comments.length && (
              <ul style={{position:"relative"}}>
              {comments.map(comm => (
                <li key={comm.uid}>
                  <div style={{width:"45px",verticalAlign:"top",display:"inline-block"}}>
                    <div style={{borderRadius:"50%",transform:"translateY(15%)",minWidth:"45px",minHeight:"45px",width:"45px",height:"45px",
                      backgroundImage:`url(${comm.s_img}), url(${logo})`}}/> 
                  </div>
                  <div style={{borderRadius:"10px 10px 10px 10px",marginLeft:"5px",padding:"5px 5px 5px 7px",backgroundColor:"#FFF6F9",width:"80%", display:"inline-block"}}>
                    <div>{comm.nick_name}</div>
                    <div style={{width:"100%"}}>
                      <span style={{overflowWrap:"break-word",fontWeight:"bold"}}>{comm.comment}</span></div>
                  </div>
                  <div style={{zIndex:"100", width:"45px", display:"inline-block"}}>&nbsp;
                    {this.props.userInfo&&this.props.userInfo.uid === comm.user_id && <a onClick={()=>this.onDeleteComment(comm)} style={{verticalAlign:"bottom"}}>삭제</a>}
                  </div>
                  <div style={{position:"relative"}}>
                    <div style={{left:"45px", position:"absolute", display:"inline-block"}}>
                      {DateFormat(comm.create_time.split("T")[0])},{}&nbsp;
                      <a onClick={this.onClickedReply(comm.uid)}>답글</a>
                    </div>
                  </div>
                  <div style={{paddingTop:"10px", width:"100%",left:"45px"}}><CommentForm/></div>
                </li>
              ))
            }
            </ul>
            )}
            <div><br/>
              <CommentForm/>
            </div>
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
