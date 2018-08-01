import React, { Component } from "react";
import styled from "styled-components";
import { Modal, Icon } from "semantic-ui-react";
import Button from "components/Commons/Button";
import {
  CardTitleUpdate,
  CardContentUpdate,
  CardImageUpdate,
  CardSourcUpdate
} from "components/Designs/DesignBoardCard";
import eximg from "source/topDesign.png";
import ValidateForm from "components/Commons/ValidateForm";
import { FormField } from "components/Commons/FormField";
import { FormTextArea } from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";
import StyleGuide from "StyleGuide";

const BoardCard = styled.li`
  padding: 10px;
  background-color: white;
  border-radius: 3px;
  margin-bottom: 5px;
  position: relative;
  cursor: pointer;
  & .cardTitle{
    display: inline-block;
    width: 80%;
    font-size: ${StyleGuide.font.size.paragraph};
    color: ${StyleGuide.color.geyScale.scale8};
    margin-bottom: 5px;
  }
  & .cardInfo {
    font-size: ${StyleGuide.font.size.small};
    color: ${StyleGuide.color.geyScale.scale8};
    width: 80%;
    & .cardCmt {
      margin-left: 20px;
    }
  }
`;

const CustomModal = styled(Modal)`
  padding: 30px;
  & .icon.close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${StyleGuide.color.geyScale.scale9};
    cursor: pointer;
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
  i.icon{
    margin:0;
  }
`;

const CommentContainer = styled.div`
  color: ${StyleGuide.color.geyScale.scale7};
  &.ui.comments {
    max-width: 100%;
    width: 100%;
    & .delBtn {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  & h4 {
    font-size: ${StyleGuide.font.size.heading4};
  }
  & .ui.button.primary {
    background: ${StyleGuide.color.sub.bule.basic};
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
  & .ui.form textarea:not([rows]) {
    min-height: 2rem;
  }
`;

class DesignBoardCard extends Component {
  state = {
    open: false,
    active: "INIT",
    render: true
  };

  componentDidMount() {
    console.log(this.props.card);
  }

  onClose = () => {
    this.setState({ open: false, active: "INIT" });
    this.props.GetDesignBoardRequest(this.props.match.params.id);
  };

  changeActive = async value => {
    this.props
        .GetCardDetailRequest(this.props.card.uid)
        .then(this.setState({ active: value }));
  };

  openModalHandler = async (e) => {
    this.props
      .GetCardDetailRequest(this.props.card.uid)
      .then(this.props.GetCardCommentRequest(this.props.match.params.id, this.props.card.uid))
      .then(this.setState({ open: true }));
  };

  handleSubmit = data => {
    console.log(data);
  };

  onDelete = (e) => {
    e.stopPropagation();
    const confirm = window.confirm("카드를 삭제하시겠습니까?");
    if (confirm) {
      this.props.DeleteDesignCardRequest(this.props.boardId, this.props.card.uid, this.props.token)
      .then(() => {
        this.props.GetDesignBoardRequest(this.props.match.params.id);
      });
    } else {
      return;
    }
  }

  onSubmitCmtForm = async (data) => {
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    }
    this.props.CreateCardCommentRequest(FormDataToJson(data), this.props.match.params.id, this.props.card.uid, this.props.token)
    .then(async res => {
      if (res.data.success === true) {
        this.props.GetCardCommentRequest(this.props.match.params.id, this.props.card.uid);
      }
      await this.setState({
        render: false
      });
      this.setState({
        render: true
      });
    });
  }

  deleteComment = (id) => {
    this.props.DeleteCardCommentRequest(this.props.match.params.id, this.props.card.uid, id, this.props.token)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetCardCommentRequest(this.props.match.params.id, this.props.card.uid);
      }
    });
  }

  render() {
    const { card, detail } = this.props;
    const comment = this.props.Comment;
    const { open } = this.state;
    console.log("detail", detail);

    const CommentForm = () => {
      return (
        <ValidateForm onSubmit={this.onSubmitCmtForm} className="ui reply form">
          <FormField name="comment" validates={["required"]} RenderComponent={FormTextArea} />
          <Button type="submit" className="ui icon primary left labeled button">
            <i aria-hidden="true" className="edit icon"></i>
            댓글쓰기
          </Button>
        </ValidateForm>
      );
    }

    return (
      <div>
        <BoardCard onClick={this.openModalHandler}>
          <div className="cardTitle">{card.title}</div>
          <div className="cardInfo">
            {card.nick_name}
            <span className="cardCmt">
              <Icon name="comment outline"/>
              {card.comment_count? card.comment_count : 0}
            </span>
          </div>
          {this.props.isTeam > 0 && <DeleteBtn onClick={this.onDelete}><i aria-hidden="true" className="trash alternate icon"></i></DeleteBtn>}
        </BoardCard>
        <CustomModal
          open={open}
          closeOnEscape={false}
          closeOnRootNodeClick={false}
          onClose={this.close}
        >
          <Modal.Content>
            <Icon name="close" size="big" onClick={this.onClose}></Icon>
            <CardTitleUpdate
              uid={detail.uid}
              title={detail.title}
              active={this.state.active}
              changeActive={this.changeActive}
              token={this.props.token}
              request={this.props.UpdateCardTitleRequest}
              isTeam={this.props.isTeam}
            />
            <CardContentUpdate
              uid={detail.uid}
              content={detail.content}
              active={this.state.active}
              changeActive={this.changeActive}
              token={this.props.token}
              request={this.props.UpdateCardContentRequest}
              isTeam={this.props.isTeam}
            />
            <CardImageUpdate
              uid={detail.uid}
              token={this.props.token}
              images={detail.images}
              request={this.props.UpdateCardImagesRequest}
              active={this.state.active}
              changeActive={this.changeActive}
              isTeam={this.props.isTeam}
            />
            {/* <CardSourcUpdate
              uid={detail.uid}
              token={this.props.token}
              sourcesLink={detail.sources}
              request={this.props.UpdateCardSourcesRequest}
              active={this.state.active}
              changeActive={this.changeActive}
              isTeam={this.props.isTeam}
            /> */}
            {/* --------------------- 댓글 섹션 ---------------------- */}
            <CommentContainer className="ui comments">
              <h4>댓글</h4>
              {comment.length > 0?
                comment.map(comm=>(
                  <div className="comment" key={comm.uid}>
                    <div className="avatar">
                      <img src={comm.s_img? comm.s_img : eximg} alt="profile" />
                    </div>
                    <div className="content">
                      <a className="author">{comm.nick_name}</a>
                      <div className="metadata">
                        <div>{comm.create_time.split("T")[0]}</div>
                      </div>
                      <div className="text">{comm.comment}</div>
                    </div>
                    {this.props.userInfo && this.props.userInfo.uid === comm.user_id &&
                    <Button size="small" className="delBtn" onClick={()=>this.deleteComment(comm.uid)}>삭제</Button>
                    }
                  </div>
                ))
              :
                <p>등록된 코멘트가 없습니다.</p>
              }
              {this.state.render? <CommentForm/> : null}
            </CommentContainer>
            <Button type="button" onClick={this.onClose}>
              닫기
            </Button>
          </Modal.Content>
        </CustomModal>
      </div>
    );
  }
}

export default DesignBoardCard;
