import React, { Component } from "react";
import styled from "styled-components";
import Card from "../Card";
import { Container, Row, Columns } from "../Grid";
import { SortablePane, Pane } from 'react-sortable-pane';

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

  openModal = (e) => {
    console.log(e.target);
  }
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
                <div>
                  <SortablePane direction="vertical" margin={5}>
                  {board.cardData.map(card => 
                    (board.cardData).length > 1?
                      <Pane className="pane" id={card.order} key={card.order} 
                            width="100%" height={80} maxHeight={120}>
                        <Card handleClick={this.openModal} cardDetail={card}/>
                      </Pane>
                      :
                      <Card handleClick={this.openModal} key={card.uid} cardDetail={card}/>
                  )}
                  </SortablePane>
                </div>
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
