import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import { Grid, Icon } from "semantic-ui-react";
import DesignBoardContainer from "containers/Designs/DesignBoardContainer";
import CreateDesignBoardContainer from "containers/Designs/CreateDesignBoardContainer";
import ContentBox from "components/Commons/ContentBox";
import PxtoRem from "modules/PxtoRem";

// css styling

const Container = styled(Grid)`
  & .ul {
    width: 100%;
  }
`;

const Board = styled.div`
  width: 100%;
  height: 80vh;
  margin-bottom: ${PxtoRem(50)};
  position: relative;
  box-sizing: border-box;
  padding-left: 0 !important;
  padding-right: 0 !important;
`;

const BoardMask = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-bottom: 50px;
`;

const BoardWrap = styled.ul`
  height: 100%;
  list-style: none;
`;

const BtnBox = styled.div`
  width: 100%;
  z-index: 100;
`;
const BoardController = styled.button`
  position: absolute;
  background-color: ${StyleGuide.color.geyScale.scale4};
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  border: 0;
  height: 50px;
  width: 50px;
  top: 50%;
  z-index: 100;
  transform: translateY(-50%);
  border-radius: 50%;
  line-height: 50px;
  font-size: 20px;
  &.left {
    left: -30px;
  }
  &.right {
    right: -30px;
  }
  i.icon {
    margin: 0 !important;
  }
`;

class DetailStep extends Component {
  state = {
    activeBoard: 0,
    boardWidth: 264,
    left: false,
    right: false,
    scroll: false
  };
  async shouldComponentUpdate(nextProps) {
    if (
      JSON.stringify(this.props.DesignDetailStep) !==
      JSON.stringify(nextProps.DesignDetailStep)
    ) {
      let width = parseInt(
        window.getComputedStyle(
          this.ContentBox._reactInternalFiber.child.stateNode._reactInternalFiber
            .child.stateNode
        ).width
      );
      console.log("width", width)
      await this.setState({
        right: false
      });
      if(nextProps.isTeam) {
        await this.setState({
          boardWidth: nextProps.DesignDetailStep.length * 264 + 250
        });
        if (width === 1100 && nextProps.DesignDetailStep.length > 3) {
          await this.setState({
            right: true
          });
        } else if ((width === 850 || width > 700) && nextProps.DesignDetailStep.length > 2) {
          await this.setState({
            right: true
          });
        } else if (width < 700 && nextProps.DesignDetailStep.length > 1) {
          await this.setState({
            right: true
          });
        } else {
          await this.setState({
            right: false
          });
        }
      } else {
        await this.setState({
          boardWidth: nextProps.DesignDetailStep.length * 264
        });
        if (width === 1100 && nextProps.DesignDetailStep.length > 4) {
          await this.setState({
            right: true
          });
        } else if (width === 800 && nextProps.DesignDetailStep.length > 3) {
          await this.setState({
            right: true
          });
        } else if (width === 700 && nextProps.DesignDetailStep.length > 2) {
          await this.setState({
            right: true
          });
        } else if (width < 700 && nextProps.DesignDetailStep.length > 1) {
          await this.setState({
            right: true
          });
        } else {
          await this.setState({
            right: false
          });
        }
      }

    }
    return true;
  }
  async componentDidMount() {
    let width = parseInt(
      window.getComputedStyle(
        this.ContentBox._reactInternalFiber.child.stateNode._reactInternalFiber
          .child.stateNode
      ).width
    );
    await this.setState({
      right: false
    });
    this.props.GetDesignBoardRequest(this.props.id);
    if (this.props.isTeam) {
      await this.setState({
        boardWidth: this.props.DesignDetailStep.length * 264 + 250
      });
      if (width === 1100 && this.props.DesignDetailStep.length > 3) {
        await this.setState({
          right: true
        });
      } else if (width > 699 && this.props.DesignDetailStep.length > 2) {
        await this.setState({
          right: true
        });
      } else if (this.props.DesignDetailStep.length > 1) {
        await this.setState({
          right: true
        });
      } else {
        await this.setState({
          right: false
        });
      }
    } else {
      await this.setState({
        boardWidth: this.props.DesignDetailStep.length * 264
      });
      if (width === 1100 && this.props.DesignDetailStep.length > 4) {
        await this.setState({
          right: true
        });
      } else if (width === 800 && this.props.DesignDetailStep.length > 3) {
        await this.setState({
          right: true
        });
      } else if (width === 700 && this.props.DesignDetailStep.length > 2) {
        await this.setState({
          right: true
        });
      } else if (this.props.DesignDetailStep.length > 1) {
        await this.setState({
          right: true
        });
      } else {
        await this.setState({
          right: false
        });
      }
    }
  }
  changeBoard = id => {
    this.setState({ activeBoard: id });
  };
  listPosition = value => {
    let scroll = this.boardMask._reactInternalFiber.child.stateNode.scrollLeft;
    if (value) {
      scroll -= 264;
    } else {
      scroll += 264;
    }
    this.boardMask._reactInternalFiber.child.stateNode.scrollLeft = scroll;

    if (value) {
      if (scroll > 0) {
        this.setState({ left: true, right: true });
      } else {
        this.setState({ left: false, right: true });
      }
    } else {
      console.log(this.state.boardWidth, scroll)
      if (
        this.state.boardWidth - parseInt(
          window.getComputedStyle(
            this.ContentBox._reactInternalFiber.child.stateNode._reactInternalFiber
              .child.stateNode
          ).width
        ) <= scroll
      ) {
        this.setState({ right: false, left: true });
      } else {
        this.setState({ right: true, left: true });
      }
    }
  };

  leftButton = () => {
    this.listPosition(true);
  };
  rightButton = () => {
    this.listPosition(false);
  };
  render() {
    let step = this.props.DesignDetailStep;
    return (
      <ContentBox ref={ref => (this.ContentBox = ref)}>
        <Container padded={true}>
          <Board>
            <BtnBox>
              <BoardController
                className="left"
                style={{ display: this.state.left ? "block" : "none" }}
                onClick={this.leftButton}
              >
                <Icon name="angle left" />
              </BoardController>
              <BoardController
                className="right"
                style={{ display: this.state.right ? "block" : "none" }}
                onClick={this.rightButton}
              >
                <Icon name="angle right" />
              </BoardController>
            </BtnBox>
            <BoardMask
              onScroll={this.scrollEvent}
              style={{
                overflowX: `${this.state.scroll ? "scroll" : "hidden"}`
              }}
              ref={ref => (this.boardMask = ref)}
            >
              <BoardWrap
                ref={ref => (this.boardList = ref)}
                style={{ width: `${this.state.boardWidth}px` }}
              >
                {step.length > 0 &&
                  step.map((board, i) => (
                    <DesignBoardContainer
                      designId={this.props.id}
                      key={i}
                      board={board}
                      activeBoard={this.stateBoard}
                      changeBoard={this.changeBoard}
                    />
                  ))}
                {this.props.isTeam > 0 ? (
                  <CreateDesignBoardContainer
                    designId={this.props.id}
                    order={step.length}
                  />
                ) : null}
              </BoardWrap>
            </BoardMask>
          </Board>
        </Container>
      </ContentBox>
    );
  }
}

export default DetailStep;
