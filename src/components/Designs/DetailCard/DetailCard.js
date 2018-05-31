import React, { Component } from "react";
import styled from "styled-components";

//css styling
const CardModal = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  height: 600px;
  background-color: #fff;
  border: 2px solid #000;
  z-index: 2;
  // @media only screen and (max-width: 768px){
  //   margin-left: -46%;
  // }
  // @media only screen and (min-width: 960px){
  //   margin-left: -42%;
  // }
  // @media only screen and (min-width: 1200px){
  //   margin-left: -42%;
  // }
`;

class DetailCard extends Component {
  render(){
    let card = this.props.DesignDetailStepCard;
    return(
      <CardModal>
        {card.length !== 0 &&
          <div>{card.uid}</div>
        }
      </CardModal>
    );
  }
}

export default DetailCard;
