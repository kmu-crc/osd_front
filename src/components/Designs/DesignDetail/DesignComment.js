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
    render: true, 
    reply: null, 
    toWhom: null,
  };

  onClickedReply = (comment_uid, comment_toWhom) => (e) => {
    if(this.props.userInfo === undefined){alert("로그인 해주세요");return}
    this.setState({reply:comment_uid,toWhom:comment_toWhom});
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
    const toWhom = FormDataToJson(data).toWhom
    const comment = FormDataToJson(data).comment
    const d_flag = FormDataToJson(data).d_flag || null;

    let packet = {
      comment: toWhom + " " + comment,
      d_flag: d_flag,
    } 
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    }
    if(!this.state.reply && (packet.comment.length === 0 || packet.comment.trim() === ""))
    {
      alert("내용을 입력해 주세요.");
      return;
    }
    if(this.state.reply && packet.comment.replace(toWhom,"").trim() === "" )
    {
        alert("내용을 입력해 주세요.");
        return;
    }

    this.createCommentRequest(packet);
    this.setState({reply:null});
  }
  commentFormBlur = () => {
    this.setState({reply:null,toWhom:null})
  }
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
  onModalClose = ()=> {
    if(this.state.reply) {
      this.commentFormBlur();
      this.setState({reply:null});
      return;
    }
    this.setState({reply:null,toWhom:null});
    //this.props
    this.props.onClose();
  };
  checkBlur = (e) => {
    const target = e.target;
    console.log(target.name != "commentForm" ? target.name:"nodagi");
  };
  render() {
    const { open, comment } = this.props;
    let parentcomments = comment.filter( item => item.d_flag == null);
    let comments = parentcomments.map ( parent => {
      let replies = comment.filter( item => item.d_flag === parent.uid);
      return {...parent, replies};
    });
    console.log(comments);
    const CommentForm = (value) => {
      return (
        <ValidateForm onSubmit={this.onSubmitCmtForm} style={{display:"block",padding:"0px 0px 0px 0px",margin:"0px 0px 0px 0px"}}>
          <FormField name="comment" handleOnBlur={this.commentFormBlur} value={value.toWhom} RenderComponent={FormTextAreaRed} maxLength="1000" />
          <FormInput name="d_flag" type="hidden" value={value.parent} />
          <FormInput name="toWhom" type="hidden" value={value.toWhom} />
        </ValidateForm>
      );
    };
    return (
      <CustomModal open={open} onClose={this.onModalClose}>
        <Modal.Content>
          <Icon name="close" size="big" onClick={this.onModalClose} />
          <CommentContainer onClick={this.checkBlur}>
            <h4> 댓글 </h4>
              {comments.length>0 && (
              <ul style={{marginTop:"25px", position:"relative"}}>
              {comments.map(comm => (
                <li key={comm.uid} style={{marginTop:"25px"}}>
                  <div style={{width:"35px",verticalAlign:"top",display:"inline-block"}}>
                    <div style={{borderRadius:"50%",transform:"translateY(15%)",minWidth:"35px",minHeight:"35px",width:"35px",height:"35px",
                      backgroundImage:`url(${comm.s_img}), url(${logo})`,backgroundPosition:"center",backgroundSize:"cover"}}/> 
                  </div>
                  <div style={{borderRadius:"10px 10px 10px 10px",marginLeft:"5px",padding:"5px 10px 5px 10px",backgroundColor:"#FFF6F9",minWidth:"15%",maxWidth:"75%",width:"max-content",display:"inline-block"}}>
                    <a style={{fontWeight:"bold"}} onClick={this.onClickedReply(comm.uid,comm.nick_name)}>{comm.nick_name}</a>
                    <div style={{overflowWrap:"break-word"}}>
                      {comm.comment.split("\n").map((line)=>{
                        return(
                          <span>
                            {line}{line.id<comm.comment.split("\n").length-1?<br/>:null}
                          </span>)})}
                    </div>
                  </div>
                  <div style={{zIndex:"100", width:"35px", display:"inline-block"}}>&nbsp;
                    {this.props.userInfo&&this.props.userInfo.uid === comm.user_id && <a onClick={()=>this.onDeleteComment(comm)} style={{verticalAlign:"bottom"}}>삭제</a>}
                  </div>
                  <div style={{position:"relative"}}>
                    <div style={{left:"50px", position:"absolute", display:"inline-block"}}>
                      {DateFormat(comm.create_time)},{}&nbsp;
                      <div style={{display:"inline-block",cursor:"pointer"}} onClick={this.onClickedReply(comm.uid,comm.nick_name)}>답글</div>
                    </div>
                  </div>
                  {this.state.reply === comm.uid &&
                    <div style={{position:"relative", paddingTop:"10px", width:"80%",left:"35px"}}>
                    <CommentForm name="commentForm" toWhom={"@"+this.state.toWhom+" "} parent={comm.uid}/>
                    </div>
                  }
              {comm.replies.length>0 && (
              <ul style={{left:"35px", marginTop:"25px", position:"relative"}}>
              {comm.replies.map(reply => (
                <li key={reply.uid} style={{marginTop:"25px"}}>
                  <div style={{width:"35px",verticalAlign:"top",display:"inline-block"}}>
                    <div style={{borderRadius:"50%",transform:"translateY(15%)",minWidth:"35px",minHeight:"35px",width:"35px",height:"35px",
                      backgroundImage:`url(${reply.s_img}), url(${logo})`,backgroundPosition:"center",backgroundSize:"cover"}}/> 
                  </div>
                  <div style={{borderRadius:"10px 10px 10px 10px",marginLeft:"5px",padding:"5px 5px 5px 7px",backgroundColor:"#FFF6F9",minWidth:"15%",maxWidth:"75%",width:"max-content",display:"inline-block"}}>
                    <a style={{fontWeight:"bold"}}onClick={this.onClickedReply(comm.uid,reply.nick_name)}>{reply.nick_name}</a>
                     <div style={{overflowWrap:"break-word"}}>
                      {reply.comment.split("\n").map((line)=>{
                        return(
                          <span>
                            {line}{line.id<reply.comment.split("\n").length-1?<br/>:null}
                          </span>)})}
                    </div>                  
                  </div>
                    <div style={{zIndex:"100", width:"35px", display:"inline-block"}}>&nbsp;
                    {this.props.userInfo&&this.props.userInfo.uid === reply.user_id && <a onClick={()=>this.deleteComment(reply.uid)} style={{verticalAlign:"bottom"}}>삭제</a>}
                  </div>
                  <div style={{position:"relative"}}>
                    <div style={{left:"50px", position:"absolute", display:"inline-block"}}>
                      {DateFormat(reply.create_time)}
                    </div>
                  </div>
                </li>
              ))
            }
            </ul>
            )}
                </li>
              ))
            }
            </ul>
            )}
            {this.state.render ? <div><br/><CommentForm parent={null} toWhom={null}/></div>:null}
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
