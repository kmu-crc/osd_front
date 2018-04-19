import React, { Component } from "react";
import styled from "styled-components";
import Card from "../Card";
import { Container, Row, Columns } from "../Grid";

// css styling

const BoardContainer = styled.div`
  height: 100%;
  min-width: 660px;
  padding-top: 10px;
`;

const Board = Columns.extend` 
  padding: 3px;
  & .boardList {
    background-color: #DBDADA;
    border-radius: 3px;
    cursor: pointer;
    width: 100%;
    padding: 8px;
  }
  & h4 {
    margin: 0;
    font-weight: normal;
    font-size: 15px;
  }
`;

class DetailStep extends Component {
  render(){
    let step = this.props.DesignDetailStep;
    return(
    <BoardContainer> 
      {step.length !== 0 && 
        <div>
          {step.map(board => 
            <Board xs={4} sm={3} width={2} key={board.uid}>
              <div className="boardList">
                <h4>{board.title}</h4>
                {board.cardData.map(card => <Card key={card.uid} cardDetail={card}/>)}
              </div>
            </Board>
          )}
          <Row/>
        </div>
      }
    </BoardContainer>
    );
  }
}

export default DetailStep;
