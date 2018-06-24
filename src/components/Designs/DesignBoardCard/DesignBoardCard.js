import React, { Component } from "react";
import styled from "styled-components";
import { Modal, Button, Icon } from "semantic-ui-react";
import {
  CardTitleUpdate,
  CardContentUpdate,
  CardImageUpdate,
  CardSourcUpdate
} from "components/Designs/DesignBoardCard";

const BoardCard = styled.li`
  padding: 10px;
  background-color: white;
  border-radius: 3px;
  margin-bottom: 5px;
  position: relative;
  cursor: pointer;
  span{
    display: inline-block;
    width: 80%;
  }
`;

const CustomModal = styled(Modal)`
  padding: 30px;
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
`

class DesignBoardCard extends Component {
  state = {
    open: false,
    active: "INIT"
  };
  componentDidMount() {
    console.log(this.props.card);
  }
  onClose = () => {
    this.setState({ open: false, active: "INIT" });
  };
  changeActive = async value => {
    this.props
        .GetCardDetailRequest(this.props.card.uid)
        .then(this.setState({ active: value }));
  };
  openModalHandler = async (e) => {
    this.props
      .GetCardDetailRequest(this.props.card.uid)
      .then(this.setState({ open: true }));
  };
  handleSubmit = data => {
    console.log(data);
  };
  onDelete = (e) => {
    e.stopPropagation();
    this.props.DeleteDesignCardRequest(this.props.boardId, this.props.card.uid, this.props.token)
      .then(() => {
        this.props.GetDesignBoardRequest(this.props.match.params.id);
      })
  }
  render() {
    const { card, detail } = this.props;
    const { open } = this.state;
    console.log("detail", detail);
    return (
      <div>
        <BoardCard onClick={this.openModalHandler}><span>{card.title}</span>{this.props.isTeam > 0 && <DeleteBtn onClick={this.onDelete}><Icon name="trash alternate"/></DeleteBtn>}</BoardCard>
        <CustomModal
          open={open}
          closeOnEscape={false}
          closeOnRootNodeClick={false}
          onClose={this.close}
        >
          <Modal.Content>
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
            <CardSourcUpdate
              uid={detail.uid}
              token={this.props.token}
              sourcesLink={detail.sources}
              request={this.props.UpdateCardSourcesRequest}
              active={this.state.active}
              changeActive={this.changeActive}
              isTeam={this.props.isTeam}
            />
            <Button type="button" onClick={this.onClose}>
              Close
            </Button>
          </Modal.Content>
        </CustomModal>
      </div>
    );
  }
}

export default DesignBoardCard;
