import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import DesignDetailStepCardContainer from "containers/Designs/DesignDetailStepCardContainer";
import { Modal } from "semantic-ui-react";

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
  &:hover h4 {
    font-weight: 600;
  }
`;

const ModalBtn = styled.button`
  // opacity: 0;
`;

class DesignStepCard extends Component {
  render(){
    let card = this.props.cardDetail;
    const ShowModalPage = () => {
      return(
        <Modal trigger={<ModalBtn id="modalBtn">Show Modal</ModalBtn>}>
          <Modal.Header>디자인 카드</Modal.Header>
          <Modal.Content>
            <DesignDetailStepCardContainer/>
          </Modal.Content>
        </Modal>
      );
    }
    return(
      <div onClick={()=>{
        document.getElementById("modalBtn").addEventListener("click", ()=>{
          console.log("modal");
        });
      }}>
        <CardContainer>
          {card.length !== 0 &&
            <div>
              <h4>{card.title}</h4>
              <span>{card.nick_name}</span>
              <span>{card.comment_count}</span>
              <span className="date">{card.update_time}</span>
            </div>
          }
        </CardContainer>
        <ShowModalPage/>
      </div>
    );
  }
}

export default DesignStepCard;
