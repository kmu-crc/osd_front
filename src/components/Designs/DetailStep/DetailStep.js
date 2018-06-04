import React, { Component } from "react";
import styled from "styled-components";
import DesignStepCard from "components/Designs/DesignStepCard";
import { SortablePane, Pane } from "react-sortable-pane";
import { Grid } from "semantic-ui-react";

// css styling

const Container = styled(Grid)`
  min-width: 660px;
  & .ul {
    width: 100%;
  }
`;

const Board = styled.li`
  padding: 3px;
  width: 200px;
  float: left;
  & .boardList {
    background-color: #DBDADA;
    border-radius: 3px;
    cursor: pointer;
    width: 100%;
    padding: 8px;
    height: 300px;
    }
  & .boardList .boardTitle {
    height: 30px;
    width: 100%;
    font-size: 13px;
    border-radius: 3px;
  }
  & .pane div.eyWoOB {
    margin-top: 0;
    margin-bottom: 5px;
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
      <Container>
        <ul>
          {step.length !== 0 && step.map((board, i) =>
            <Board key={i}>
              <div className="boardList">
                {this.state.isEdit == board.uid? 
                  <input className="boardTitle" value={this.state.titleValue} onChange={this.onEdit}/>
                  : <h4 id={board.uid} onClick={this.activeEdit}>
                      {board.title}
                    </h4>
                }
                <div>
                  <SortablePane direction="vertical" margin={5}>
                  {board.cardData.length > 0 && board.cardData.map(card =>
                    board.cardData.length > 1? 
                    <Pane key={card.uid} id={card.uid}
                          className="pane" width="100%" height={80} maxHeight={120}
                          onResizable={{ x: false, y: false, xy: false }}>
                      <DesignStepCard cardDetail={card} designId={board.design_id}/>
                    </Pane>
                    :
                    <DesignStepCard key={card.uid} cardDetail={card} designId={board.design_id}/>
                  )}
                  </SortablePane>
                </div>
              </div>
            </Board>
            )}
            <Board>
              <div className="boardList">
                {this.state.isEdit === "new"? 
                  <input value={this.state.titleValue} onChange={this.onEdit}/>
                  : <h4 id="new" onClick={this.activeEdit}>
                      새 주제 추가 +
                    </h4>
                }
                <EmptyCard>새 카드 추가 +</EmptyCard>
              </div>
            </Board>
        </ul>
      </Container>
    );
  }
}

export default DetailStep;
