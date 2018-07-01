import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import CreateDesignCardContainer from "containers/Designs/CreateDesignCardContainer";
import DesignBoardCardContainer from "containers/Designs/DesignBoardCardContainer";
import BoardUpdate from "components/Designs/DesignBoard/BoardUpdate";
import StyleGuide from "StyleGuide";

const Board = styled.li`
  width: 250px;
  float: left;
  box-sizing: border-box;
  background-color: ${StyleGuide.color.sub.bule.basic};
  border-radius: 3px;
  margin-right: 1rem;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  font-size: 1em;
  font-weight: 600;
  padding: 0.3em 10px;
  position: relative;
  color: ${StyleGuide.color.geyScale.scale0};
  cursor: pointer;
  span {
    display: inline-block;
    width: 190px;
    line-height: 38px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  width: 100px;
  background-color: ${StyleGuide.color.geyScale.scale0};
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 3px;
  z-index: 1;
`;

const MenuItem = styled.li`
  box-sizing: border-box;
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
  padding: 10px;
  background-color: #dbdada;
  border-radius: 0 0 3px 3px;
`;

class DesignBoard extends Component {
  state = {
    active: false
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

  onModify = () => {
    if (this.props.isTeam !== 1) {
      return;
    } else {
      this.setState({active: true});
    }
  }
  ModifyComplete = () => {
    this.setState({active: false});
  }
  onDelete = () => {
    this.props.DeleteDesignBoardRequest(this.props.board.design_id, this.props.board.uid, this.props.token).then(() => {
      this.props.GetDesignBoardRequest(this.props.board.design_id);
    });
  }
  render() {
    const { board, changeBoard, activeBoard, designId, list } = this.props;
    console.log(list);
    return (
      <Board>
        <Title>
          {this.state.active ? <BoardUpdate board={board} getBoard={this.props.GetDesignBoardRequest} onUpdate={this.props.UpdateDesignBoardRequest} token={this.props.token} value={board.title} ModifyComplete={this.ModifyComplete}/> : (
            <div>
              <span onClick={this.onModify}>{board.title}</span>
              {this.props.isTeam === 1 &&
              <MenuIcon className="openMenu" onClick={this.onActive}>
                <Icon name="ellipsis vertical" />
              </MenuIcon>
              }
              <Menu
                style={{
                  display:
                    this.props.isActive === `BOARD${board.uid}`
                      ? "block"
                      : "none"
                }}
              >
                <MenuItem>
                  <button onClick={this.onModify}>수정</button>
                </MenuItem>
                <MenuItem>
                  <button onClick={this.onDelete}>삭제</button>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Title>
        <CardList>
          {board.cards.length > 0 &&
            board.cards.map((item, index) => {
              return (
                <DesignBoardCardContainer key={`card${index}`} card={item} boardId={board.uid} />
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
      </Board>
    );
  }
}

export default DesignBoard;
