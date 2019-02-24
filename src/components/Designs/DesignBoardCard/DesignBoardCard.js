import React, { Component } from "react";
import styled from "styled-components";
import { Modal, Icon } from "semantic-ui-react";
import Button from "components/Commons/Button";
import eximg from "source/topDesign.png";
import ValidateForm from "components/Commons/ValidateForm";
import { FormField } from "components/Commons/FormField";
import { FormTextArea } from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";
import StyleGuide from "StyleGuide";
import CardSourceDetailContainer from "containers/Designs/CardSourceDetailContainer";
import CardSourceModifyContainer from "containers/Designs/CardSourceModifyContainer";
import DateFormat from "modules/DateFormat";

const BoardCard = styled.li`
  background-color: white;
  border-radius: 3px;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  img {
    width: 100%;
    border-radius: 3px 3px 0 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  }
  .content {
    padding: 10px;
  }
  & .cardTitle {
    width: 100%;
    font-size: ${StyleGuide.font.size.paragraph};
    color: ${StyleGuide.color.geyScale.scale8};
    margin-bottom: 5px;
  }
  & .cardInfo {
    font-size: ${StyleGuide.font.size.small};
    color: ${StyleGuide.color.geyScale.scale8};
    width: 100%;
    & .cardAuthor{
      color: ${StyleGuide.color.geyScale.scale7};
      text-align: left;
      display: inline-block;
      width: 55%;
    }
    & .cardCmt {
      display: inline-block;
      text-align: left;
      width: 20%;
    }
    & .cardUpdateDate{
      padding-right: 5px;
      text-align: right;
      display: inline-block;
      width: 25%;
    }
  }
`;

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

const DeleteBtn = styled.button`
  position: absolute;
  right: 0;
  background-color: transparent;
  border: 0;
  padding: 7px;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  i.icon {
    margin: 0;
  }
`;

const CardUpdateDate = styled.span`
  font-size: ${StyleGuide.font.size.small};
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

class DesignBoardCard extends Component {
  state = {
    open: false,
    active: "INIT",
    render: true,
    closeOnDimmerClick: true,
    edit: false,
    modify: false
  };

  componentDidMount() {
    console.log(this.props.card);
  }
  shouldComponentUpdate(nextProps) {
    return true;
  }

  onClose = () => {
    let confirm = true;
    if (this.state.modify && this.state.edit) {
      confirm = window.confirm(
        "수정중인 내용이 저장되지 않습니다. 그래도 닫으시겠습니까?"
      );
    }
    // confirm = window.confirm("수정중인 내용이 저장되지 않습니다. 그래도 닫으시겠습니까?");
    if (confirm) {
      this.setState({
        open: false,
        active: "INIT",
        edit: false,
        modify: false
      });
      this.props.GetDesignBoardRequest(this.props.match.params.id);
    }
  };

  changeActive = async value => {
    this.props
      .GetCardDetailRequest(this.props.card.uid)
      .then(this.setState({ active: value }));
  };

  changeModify = () => {
    this.setState({ modify: true });
  };

  openModalHandler = async e => {
    this.props
      .GetCardDetailRequest(this.props.card.uid)
      .then(
        this.props.GetCardCommentRequest(
          this.props.match.params.id,
          this.props.card.uid
        )
      )
      .then(this.setState({ open: true }));
  };

  handleSubmit = data => {
    console.log(data);
  };

  onDelete = e => {
    e.stopPropagation();
    const confirm = window.confirm("컨텐츠를 삭제하시겠습니까?");
    if (confirm) {
      this.props
        .DeleteDesignCardRequest(
          this.props.boardId,
          this.props.card.uid,
          this.props.token
        )
        .then(async () => {
          await this.setState({ edit: false });
          this.props.GetDesignBoardRequest(this.props.match.params.id);
        });
    } else {
      return;
    }
  };

  onSubmitCmtForm = async data => {
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    }
    if (FormDataToJson(data) && FormDataToJson(data).comment === "") {
      alert("내용을 입력해 주세요.");
      return;
    }
    this.props
      .CreateCardCommentRequest(
        FormDataToJson(data),
        this.props.match.params.id,
        this.props.card.uid,
        this.props.token
      )
      .then(async res => {
        if (res.data && res.data.success === true) {
          this.props.GetCardCommentRequest(
            this.props.match.params.id,
            this.props.card.uid
          );
        }
        await this.setState({
          render: false
        });
        this.setState({
          render: true
        });
      });
  };

  deleteComment = id => {
    this.props
      .DeleteCardCommentRequest(
        this.props.match.params.id,
        this.props.card.uid,
        id,
        this.props.token
      )
      .then(res => {
        if (res.data && res.data.success === true) {
          this.props.GetCardCommentRequest(
            this.props.match.params.id,
            this.props.card.uid
          );
        }
      });
  };

  onChangeEditMode = () => {
    this.setState({ edit: true, modify: true });
  };
  onCloseEditMode = () => {
    this.setState({ edit: false });
  };

  render() {
    const { card, detail } = this.props;
    const comment = this.props.Comment;
    const { open, closeOnDimmerClick } = this.state;
    const CommentForm = () => {
      return (
        <ValidateForm onSubmit={this.onSubmitCmtForm} className="ui reply form">
          <FormField name="comment" RenderComponent={FormTextArea} />
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
      <div>
        <BoardCard onClick={this.openModalHandler}>
          {card.first_img ? (
            <img src={card.first_img.m_img} alt="thumbnail" />
          ) : null}
          <div className="content">
          {/*  <div className="cardTitle">{card.title}</div>
            <CardUpdateDate>{DateFormat(card.update_time)}</CardUpdateDate>
            <div className="cardInfo">
              {card.nick_name}
              <span className="cardCmt">
                <Icon name="comment outline" />
                {card.comment_count ? card.comment_count : 0}
              </span>
          </div>*/}
            <div className="cardTitle">{card.title}</div>
            <div className="cardInfo">
              <div className="cardCmt">
                <Icon name="comment outline"/>{card.comment_count ? card.comment_count:0}
              </div>
              <div className="cardAuthor">{card.nick_name}</div>
              <div className="cardUpdateDate">{DateFormat(card.update_time)}</div>
            </div>
          </div>
        </BoardCard>
        {this.props.card.uid === this.props.detail.uid ? (
          <CustomModal
            open={open}
            closeOnDimmerClick={closeOnDimmerClick}
            dimmer={true}
            onClose={this.onClose}
          >
            <Modal.Content>
              <Icon name="close" size="big" onClick={this.onClose} />
              {this.state.edit ? (
                <div>
                  <CardSourceModifyContainer
                    uid={card.uid}
                    isTeam={this.props.isTeam}
                    detail={detail}
                    card={card}
                    onClose={this.close}
                    closeEdit={this.onCloseEditMode}
                    openEdit={this.onChangeEditMode}
                  />
                </div>
              ) : (
                <div>
                  {this.props.userInfo &&
                  this.props.userInfo.uid === this.props.card.user_id &&
                  !this.state.edit ? (
                    <div>
                      <Button
                        type="button"
                        size="small"
                        onClick={this.onChangeEditMode}
                      >
                        수정
                      </Button>
                      <Button
                        type="button"
                        color="Solid"
                        size="small"
                        onClick={this.onDelete}
                      >
                        삭제
                      </Button>
                    </div>
                  ) : null}
                  <h2>{detail.title}<CardUpdateDate> {DateFormat(card.update_time)}</CardUpdateDate></h2>
                  <p>{detail.content ? detail.content : "설명이 없습니다."}</p>
                  <CardSourceDetailContainer
                    uid={card.uid}
                    isTeam={this.props.isTeam}
                    edit={this.state.edit}
                    closeEdit={this.onCloseEditMode}
                    openEdit={this.onChangeEditMode}
                  />
                </div>
              )}

              {/* --------------------- 댓글 섹션 ---------------------- */}
              <CommentContainer className="ui comments">
                <h4>댓글</h4>
                {comment.length > 0 ? (
                  comment.map(comm => (
                    <div className="comment" key={comm.uid}>
                      <div className="avatar">
                        <img
                          src={comm.s_img ? comm.s_img : eximg}
                          alt="profile"
                        />
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
        ) : null}
      </div>
    );
  }
}

export default DesignBoardCard;
