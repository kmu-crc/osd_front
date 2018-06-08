import React, { Component } from "react";
import styled from "styled-components";
import CreateDesignCardContainer from "containers/Designs/CreateDesignCardContainer";
import DesignBoardCardContainer from "containers/Designs/DesignBoardCardContainer";

const Board = styled.li`
  width: 250px;
  float: left;
  box-sizing: border-box;
  background-color: white;
  border-radius: 3px;
  margin-right: 1rem;
`

const Title = styled.div`
  font-size: 1em;
  font-weight: 600;
  padding: .67857143em 1em;
  min-height: 38px;
  cursor: pointer;
`
const CardList = styled.ul`
  padding: 10px;
  background-color: #DBDADA;
  border-radius: 0 0 3px 3px;
`

const Card = styled.li`
  padding: 10px;
  background-color: white;
  border-radius: 3px;
`

class DesignBoard extends Component {
  // componentDidMount(){
  //   this.props.GetDesignCardRequest(this.props.designId, this.props.board.uid);
  // }
  render() {
    const {board, changeBoard, activeBoard, designId, list} = this.props;
    console.log(list);
    return (
      <Board>
        <Title>{board.title}</Title>
        <CardList>
          { board.cards.length > 0 && board.cards.map( (item, index) => {
            return (<DesignBoardCardContainer key={`card${index}`} card={item}/>)
          })}
          <CreateDesignCardContainer designId={designId} boardId={board.uid} changeBoard={changeBoard} activeBoard={activeBoard}/>
        </CardList>
      </Board>
    );
  }
}

export default DesignBoard;
