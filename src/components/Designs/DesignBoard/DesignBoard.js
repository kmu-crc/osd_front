import React, { Component } from "react";
import styled from "styled-components";
import { Modal, Icon } from "semantic-ui-react";
import CreateDesignCardContainer from "containers/Designs/CreateDesignCardContainer";
import DesignBoardCardContainer from "containers/Designs/DesignBoardCardContainer";
import BoardUpdate from "components/Designs/DesignBoard/BoardUpdate";
import StyleGuide from "StyleGuide";
import { SortableContainer, SortableElement, arrayMove, SortableHandle } from "react-sortable-hoc";
import TextFormat from "modules/TextFormat";
// import {confirmAlert} from "react-confirm-alert";
// import {options,optionsAlter} from "components/Commons/InputItem/AlertConfirm"

const CustomModal = styled(Modal)`
  border: "1px solid";
  border-color: ${StyleGuide.color.main.dark};
  padding: 20px;
  width: 250px;
  & .icon.close{
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${StyleGuide.color.geyScale.scale9};
    cursor: pointer;
  }
`;
const Board = styled.li`
  width: 250px;
  height: 100%;
  overflow: hidden;
  float: left;
  box-sizing: border-box;
  background-color: transparent;
  border-radius: 3px;
  margin-right: 1rem;

`;

const Title = styled.div`
  font-size: 1em;
  font-weight: 600;
  padding: 0.3em 10px;
  position: relative;
  background-color: ${StyleGuide.color.sub.bule.basic};
  color: ${StyleGuide.color.geyScale.scale0};
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  span {
    display: inline-block;
    width: 190px;
    line-height: 38px;
    vertical-align: top;
  }
`;

const MenuIcon = styled.button`
  background-color: transparent;
  border: 0;
  padding: 0;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  text-align: center;
  vertical-align: middle;
  border-radius: 3px;
  &:hover {
    background-color: ${StyleGuide.color.sub.bule.dark};
  }
  i.icon {
    color: ${StyleGuide.color.geyScale.scale0};
    margin: 0;
  }
`;

const Menu = styled.ul`
  position: absolute;
  right: 10px;
  width: 130px;
  background-color: ${StyleGuide.color.geyScale.scale0};
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 3px;
  z-index: 100;
`;

const MenuItem = styled.li`
  box-sizing: border-box;
  font-size: 9pt;
  color: ${StyleGuide.color.geyScale.scale6};
  border-bottom: 1px solid ${StyleGuide.color.geyScale.scale3};
  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    background-color: ${StyleGuide.color.geyScale.scale3};
  }
  button {
    background-color: transparent;
    border: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    outline: 0;
  }
`;

const CardList = styled.ul`
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  padding: 10px;
  max-height: 90%;
  overflow-y: scroll;
  padding-bottom: 5px;
  background-color: #dbdada;
  border-radius: 0 0 3px 3px;
`;
const DragHandle = SortableHandle(() => <Icon name="bars" />);
const SortableItem = SortableElement(({ value }) => (
  <li style={{ height: "35px" }}>
    <div style={{ width: "10%", display: "inline-block" }}><Icon color="red" name="minus circle" /></div>
    <div style={{ width: "80%", display: "inline-block" }}>{value}</div>
    <div style={{ width: "10%", display: "inline-block" }}><DragHandle /></div>
  </li>));
const Container = SortableContainer(({ children }) => { return <ul>{children}</ul>; });
class SortableComponent extends Component {
  state = { items: this.props.items };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({ items: arrayMove(items, oldIndex, newIndex), }));
    this.props.getCardList(this.state.items);
  };
  render() {
    const { items } = this.state;
    return (
      <Container onSortEnd={this.onSortEnd} pressThreshold={5} useDragHandle>
        {items.map((item, index) => (
          <SortableItem hideSortableGhost="true" key={`item-${index}`} index={index} value={item.title} />
        ))}
      </Container>
    );
  }
}

class DesignBoard extends Component {
  state = {
    active: false,
    sortable: false,
    cards: null
  };

  onActive = e => {
    const event = e;
    event.stopPropagation();
    let target = event.currentTarget;
    let active = this.props.isActive;
    if (active === "INIT" || active !== `BOARD${this.props.board.uid}`) {
      active = `BOARD${this.props.board.uid}`;
    } else if (active === `BOARD${this.props.board.uid}`) {
      active = "INIT";
    }
    this.props.SetActive(active, target);
  };

  // 단계이동위한함수
  swapBoard = (boardA, boardB) => {
    this.props.UpdateDesignBoardRequest(boardA.id, this.props.token, boardA.data)
      .then(this.props.UpdateDesignBoardRequest(boardB.id, this.props.token, boardB.data))
      .then(() => {
        this.props.GetDesignBoardRequest(this.props.board.design_id);
      });
  };
  onRight = (e) => {
    let b = this.props.step.find((board) => { return board.order === this.props.board.order + 1 });
    let boardA = { id: this.props.board.uid, data: { order: this.props.board.order + 1 } };
    let boardB = { id: b.uid, data: { order: this.props.board.order } };
    // console.log(boardA, boardA.id, boardA.data);
    // console.log(boardB, boardB.id, boardB.data);
    this.swapBoard(boardA, boardB);
  };
  onLeft = (e) => {
    let b = this.props.step.find((board) => { return board.order === this.props.board.order - 1 });
    let boardA = { id: this.props.board.uid, data: { order: this.props.board.order - 1 } };
    let boardB = { id: b.uid, data: { order: this.props.board.order } };
    // console.log(boardA, boardA.id, boardA.data);
    // console.log(boardB, boardB.id, boardB.data);
    this.swapBoard(boardA, boardB);
  }
  onModify = () => {
    if (this.props.isTeam !== 1) {
      return;
    } else {
      this.setState({ active: true });
    }
  }
  requestReSortCardList = async () => {
    const jobs = [];
    let promiseAry = [];
    this.state.cards.forEach((element, index) => {
      if (element.order !== index) jobs.push({ uid: element.uid, neworder: index });
    });
    // console.log(jobs);
    promiseAry = jobs.map(job => { return this.props.UpdateCardTitleRequest({ order: job.neworder }, this.props.token, job.uid) })

    await Promise.all(promiseAry)
      .then(this.props.GetDesignBoardRequest(this.props.designId))
      .then(this.setState({ sortable: false }))
  }
  closeSortableModal = () => {
    this.setState({ sortable: false });
  }
  openSortableModal = () => {
    this.setState({ sortable: true });
  }
  ModifyComplete = () => {
    this.setState({ active: false });
  };
  onDelete = () => {
    if (this.props.board.cards && this.props.board.cards.length > 0) {
      alert("컨텐츠가 있는 단계는 삭제할 수 없습니다.");
      return;
    }
    const confirm = window.confirm("단계를 삭제하시겠습니까?");
    if (confirm) {
      this.props
        .DeleteDesignBoardRequest(
          this.props.board.design_id,
          this.props.board.uid,
          this.props.token
        )
        .then(() => {
          this.props.GetDesignBoardRequest(this.props.board.design_id);
        });
    }
    // confirmAlert(options("단계를 삭제하시겠습니까?",()=>{ 
    //     this.props
    //       .DeleteDesignBoardRequest(
    //         this.props.board.design_id,
    //         this.props.board.uid,
    //         this.props.token
    //       )
    //       .then(() => {
    //         this.props.GetDesignBoardRequest(this.props.board.design_id);
    //       });},event));

  };
  handleGetCardList = (list) => {
    this.setState({ cards: list })
    // console.log("get list from child", this.state.cards);
  }
  render() {
    const { board, changeBoard, activeBoard, designId, step } = this.props;
    let cardList = board.cards.map(card => { return { title: card.title, uid: card.uid, order: card.order } });
    return (
      <Board >
        <Title>
          {this.state.active && this.props.isTeam ?
            (
              <BoardUpdate
                board={board}
                getBoard={this.props.GetDesignBoardRequest}
                onUpdate={this.props.UpdateDesignBoardRequest}
                designTime={this.props.UpdateDesignTime}
                token={this.props.token}
                value={board.title}
                ModifyComplete={this.ModifyComplete}
              />
            ) :
            (
              <div>
                <span onClick={this.onModify}><TextFormat txt={board.title} /></span>
                {this.props.isTeam > 0 ? (
                  <MenuIcon className="openMenu" onClick={this.onActive}>
                    <Icon name="ellipsis vertical" />
                  </MenuIcon>
                ) : null
                }
                <Menu
                  style={{
                    display:
                      this.props.isActive === `BOARD${board.uid}`
                        ? "block"
                        : "none"
                  }}
                >
                  {board.order > 0 &&
                    <MenuItem>
                      <button onClick={this.onLeft} style={{ display: "flex", justifyContent: "spaceBetween" }}>
                        <Icon name="arrow circle left" /><p>왼쪽으로 보내기</p>
                      </button>
                    </MenuItem>
                  }
                  {board.order < step.length - 1 &&
                    <MenuItem>
                      <button onClick={this.onRight} style={{ display: "flex", justifyContent: "spaceBetween" }}>
                        <Icon name="arrow circle right" /><p>오른쪽으로 보내기</p></button>
                    </MenuItem>
                  }
                  <MenuItem>
                    <button onClick={this.openSortableModal} style={{ display: "flex", justifyContent: "spaceBetween" }}>
                      <i className="bars icon" /><p>카드순서바꾸기</p></button>
                  </MenuItem>
                  <MenuItem>
                    <button onClick={this.onModify} style={{ display: "flex", justifyContent: "spaceBetween" }}>
                      <i className="edit outline icon" /><p>이름바꾸기</p></button>
                  </MenuItem>
                  <MenuItem>
                    <button onClick={this.onDelete} style={{ display: "flex", justifyContent: "spaceBetween" }}>
                      <i className={`trash alternate outline icon`} /><p>보드지우기</p></button>
                  </MenuItem>
                </Menu>
              </div>
            )
          }
        </Title>
        <CardList>
          {board.cards.length > 0 &&
            board.cards.map((item, index) => {
              return (
                <DesignBoardCardContainer
                  key={`card${index}`}
                  card={item}
                  boardId={board.uid}
                />
              );
            })}
          {this.props.isTeam > 0 ? (
            <CreateDesignCardContainer
              designId={designId}
              boardId={board.uid}
              changeBoard={changeBoard}
              activeBoard={activeBoard}
              lastOrder={board.cards.length}
            />
          ) : null}
        </CardList>
        {this.state.sortable && cardList.length > 1 ? (
          <CustomModal style={{ width: "350px" }} open={this.state.sortable} onClose={this.closeSortableModal}>
            <Modal.Content>
              <h3>카드목록 편집</h3>
              <div style={{ padding: "3px 6px 3px 6px", margin: "0 0 10px 0", borderRadius: "10px 10px 10px 10px", width: "100%", backgroundColor: "#FF6F7F" }}><h3>{board.title}</h3></div>
              <div>
                <SortableComponent getCardList={this.handleGetCardList} items={cardList} />
              </div><br />
              <div align="right" style={{ right: "0px", paddingBottom: "5px", paddingRight: "5px" }}>
                <button style={{ fontSize: "9pt", backgroundColor: "#E72327", borderColor: "#E72327", padding: "0.5em 1.7em", marginTop: "6px", color: "#FFF", border: "0px", borderRadius: "5px 5px 5px 5px", lineHeight: "25px", marginLeft: "3px", width: "65px" }}
                  onClick={this.requestReSortCardList}>완료하기</button>
                <button style={{ fontSize: "9pt", backgroundColor: "#FFF", borderColor: "#E72327", padding: "0.5em 1.7em", marginTop: "6px", color: "#666", borderStyle: "solid", borderWidth: "1px", borderRadius: "5px 5px 5px 5px", lineHeight: "25px", marginLeft: "3px", width: "65px" }}
                  onClick={this.closeSortableModal}> 취소하기</button>
              </div>
            </Modal.Content>
          </CustomModal>
        ) : null}
      </Board>
    );
  }
}

export default DesignBoard;
