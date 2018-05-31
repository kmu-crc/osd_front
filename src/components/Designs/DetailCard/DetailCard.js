import React, { Component } from "react";
import styled from "styled-components";

//css styling
const CardModal = styled.div`
`;

class DetailCard extends Component {
  render(){
    let card = this.props.DesignDetailStepCard;
    return(
      <CardModal>
        {card.length !== 0 &&
          <div>
            <div>{card.title}</div>
            <div>{card.create_time.split("T")[0]}</div>
            <div>{card.content}</div>
            
          </div>
        }
      </CardModal>
    );
  }
}

export default DetailCard;
