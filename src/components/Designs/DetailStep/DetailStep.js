import React, { Component } from "react";
import styled from "styled-components";
import DesignStepCard from "components/Designs/DesignStepCard";
import { SortablePane, Pane } from "react-sortable-pane";
import { Grid } from "semantic-ui-react";
import DesignBoardContainer from "containers/Designs/DesignBoardContainer";
import CreateDesignBoardContainer from "containers/Designs/CreateDesignBoardContainer";

// css styling

const Container = styled(Grid) `
  min-width: 660px;
  & .ul {
    width: 100%;
  }
`;

const Board = styled.div`
  width: 100%;
  overflow: hidden;
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

const BoardWrap = styled.ul`
  list-style: none;
`

class DetailStep extends Component {
  state = {
    activeBoard: 0
  }
  componentDidMount(){
    this.props.GetDesignBoardRequest(this.props.match.params.id);
  }
  changeBoard = (id) => {
    this.setState({ activeBoard: id });
  }
  render() {
    let step = this.props.DesignDetailStep;
    return (
      <Container>
        <Board>
          <BoardWrap style={{ width: step.length * 264 + 250 }}>
            {step.length > 0 && step.map((board, i) =>
              <DesignBoardContainer designId={this.props.match.params.id} key={i} board={board} activeBoard={this.stateBoard} changeBoard={this.changeBoard} />
            )}
            <CreateDesignBoardContainer designId={this.props.match.params.id} order={step.length} />
          </BoardWrap>
        </Board>
      </Container>
    );
  }
}

export default DetailStep;
