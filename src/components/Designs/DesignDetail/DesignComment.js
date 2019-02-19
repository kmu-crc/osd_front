import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Icon } from "semantic-ui-react";
import DateFormat from "modules/DateFormat";
import Button from "components/Commons/Button";
import eximg from "source/topDesign.png";
import ValidateForm from "components/Commons/ValidateForm";
import { FormField } from "components/Commons/FormField";
import { FormTextArea } from "components/Commons/FormItem";
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
    margin-bottom: 2.5rem;
    & .delBtn {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
  & h4 {
    font-size: ${StyleGuide.font.size.heading4};
  }
  & .ui.button.primary {
    background: ${StyleGuide.color.sub.bule.basic};
    font-size: 12px;
    &:hover {
      border: 0;
      background: ${StyleGuide.color.sub.bule.dark};
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
    render: true
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
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    }
    if (FormDataToJson(data) && FormDataToJson(data).comment === "") {
      alert("내용을 입력해 주세요.");
      return;
    }
    this.createCommentRequest(FormDataToJson(data));
  };

  deleteComment = id => {
    this.props
      .DeleteDesignCommentRequest(
        this.props.id,
        id,
        this.props.token
      )
      .then(res => {
        if (res.data && res.data.success === true) {
          this.getComment();
        }
      });
  };
  render() {
    const { open, onClose, comment } = this.props;
    const CommentForm = () => {
      return (
        <ValidateForm onSubmit={this.onSubmitCmtForm} className="ui reply form">
          <FormField name="comment" RenderComponent={FormTextArea} maxLength="1000"/>
          <Button
            type="submit"
            size="small"
            className="ui icon primary left labeled button"
          >
            <i aria-hidden="true" className="edit icon" />
            댓글쓰기
          </Button>
        </ValidateForm>
      );
    };
    return (
      <CustomModal open={open} onClose={onClose}>
        <Modal.Content>
          <Icon name="close" size="big" onClick={onClose} />
          <CommentContainer className="ui comments">
            <h4>댓글</h4>
            {comment.length > 0 ? (
              comment.map(comm => (
                <div className="comment" key={comm.uid}>
                  <div className="avatar">
                    <img src={comm.s_img ? comm.s_img : eximg} alt="profile" />
                  </div>
                  <div className="content">
                    <a className="author">{comm.nick_name}</a>
                    <div className="metadata">
                      <div>{comm.create_time.split("T")[0]}</div>
                    </div>
                    <div className="text">
                      {comm.comment.split("\n").map((line, i) => {
                        return (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  {this.props.userInfo &&
                    this.props.userInfo.uid === comm.user_id && (
                      <i
                        size="small"
                        className="delBtn trash alternate outline icon"
                        onClick={() => this.deleteComment(comm.uid)}
                      />
                    )}
                </div>
              ))
            ) : (
              <p>등록된 코멘트가 없습니다.</p>
            )}
            {this.state.render ? <CommentForm /> : null}
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
