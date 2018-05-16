import React, { Component } from "react";
import styled from "styled-components";
import Card from "components/Designs/Card";
import { SortablePane, Pane } from "react-sortable-pane";

// css styling

const BoardContainer = styled.div`
  height: 100%;
  min-width: 660px;
  padding-top: 10px;
  padding-bottom: 30px;
  & .changeBtn {
    position: absolute;
    top: 0;
    right: 20px;
    padding: 7px 18px;
    border: 1px solid #a4a4a4;
  }
`;

const Board = styled.div`
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
  & h4.boardTitle > input {
    height: 30px;
    width: 100%;
    font-size: 13px;
    border-radius: 3px;
  }
`;

const EmptyCard = styled.div`
  width: 100%;
  min-height: 80px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 5px #999898;
  margin-top: 5px;
  padding: 10px 5px;
  cursor: pointer;
  font-size: 12px;
`;

class DetailStep extends Component {
  state = {
    isEdit: -1,
    titleValue: ""
  };

  activeEdit = (e) => {
    this.setState({
      isEdit: e.target.id,
      titleValue: e.target.innerHTML
    });
  }

  onEdit = (e) => {
    this.setState({
      titleValue: e.target.value
    });
  }

  render(){
    let step = this.props.DesignDetailStep;
    return(
    <BoardContainer>
      {step.length !== 0 &&
        <div>
          {step.map(board =>
            <Board>
              <div className="boardList">
                <h4 className="boardTitle" id={board.uid}>
                  {this.state.isEdit == board.uid? <input value={this.state.titleValue} onChange={this.onEdit}/>
                  : <div id={board.uid} onClick={this.activeEdit}>{board.title}</div>}
                </h4>
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
        </div>
      }
      <Board>
        <div className="boardList">
          <h4 className="boardTitle" id="new">
            {this.state.isEdit === "new"? <input value={this.state.titleValue} onChange={this.onEdit}/>
            : <div id="new" onClick={this.activeEdit}>새 주제 추가 +</div>}
          </h4>
          <EmptyCard>새 카드 추가 +</EmptyCard>
        </div>
      </Board>
    </BoardContainer>
    );
  }
}

export default DetailStep;
