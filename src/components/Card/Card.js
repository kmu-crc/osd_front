import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import DesignDetailStepCardContainer from "../../containers/DesignDetailStepCardContainer";

// css styling
const CardContainer = styled.div`
  width: 100%;
  min-height: 80px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 5px #999898;
  margin-top: 5px;
  padding: 10px 5px;
  cursor: pointer;
  & span {
    font-size: 12px;
    font-weight: 400;
    margin-right: 10px;
  }
  & .date {
    float: right;
    font-size: 12px;
    color: #AEABAB;
  }
  &:hover h4 {
    font-weight: 600;
  }
`;

class Card extends Component {
  state = {
    modal: false,
    changeMode: this.props.changeMode
  }

  openModal = (e) => {
    if (this.state.changeMode === false) {
      this.setState({
        modal: !(this.state.modal)
      });
    }
  }

  render(){
    let card = this.props.cardDetail;
    return(
      <CardContainer onClick={this.openModal}>
        {card.length !== 0 && 
          <div>
            <h4>{card.title}</h4>
            <span>{card.nick_name}</span>
            <span>{card.comment_count}</span>
            {card.is_complete_card === 0 && 
              <span>대표선택됨</span>
            }
            <span className="date">{card.update_time}</span>
          </div>
        }
        {this.state.modal === false? <div></div> : 
        <DesignDetailStepCardContainer id={this.props.designId} card_id={card.uid}/>}
      </CardContainer>
    );
  }
}

export default Card;