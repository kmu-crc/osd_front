import React, { Component } from "react";
import styled from "styled-components";
import Card from "../Card";
import { Container, Row, Columns } from "../Grid";
import { SortablePane, Pane } from "react-sortable-pane";

// css styling

const BoardContainer = styled.div`
  height: 100%;
  min-width: 660px;
  padding-top: 10px;
  & .changeBtn {
    position: absolute;
    top: 0;
    right: 20px;
    padding: 7px 18px;
    border: 1px solid #a4a4a4;
  }
`;

const Board = Columns.extend` 
  padding: 3px;
  & .boardList {
    background-color: #DBDADA;
    border-radius: 3px;
    cursor: pointer;
    width: 100%;
    padding: 8px;
    height: 300px;
  }
  & h4 {
    margin: 0;
    margin-bottom: 10px;
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
            <Board xs={4} sm={3} md={3} width={2} key={board.uid}>
              <div className="boardList">
                <h4>{board.title}</h4>
                  <div>
                    <SortablePane direction="vertical" margin={5} onResizeStop>
                    {board.cardData.map(card => 
                      (board.cardData).length > 1?
                        <Pane className="pane" id={card.order} key={card.order} 
                              width="100%" height={80} maxHeight={120}
                              isResizable={{x: false, y: false, xy: false}}>
                          <Card cardDetail={card} designId={board.design_id}/>
                        </Pane>
                        :
                        <Card key={card.order} cardDetail={card} designId={board.design_id}/>
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
