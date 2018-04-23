import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row, Columns } from "../Grid";

//css styling
const CardModal = Columns.extend`
  position: absolute;
  top: 0;
  left: 50%;
  height: 600px;
  background-color: #fff;
  border: 2px solid #000;
  z-index: 2;
  @media only screen and (max-width: 768px){
    margin-left: -46%;
  }
  @media only screen and (min-width: 960px){
    margin-left: -42%;
  }
  @media only screen and (min-width: 1200px){
    margin-left: -42%;
  }
`;

class DetailCard extends Component {
  render(){
    let card = this.props.DesignDetailStepCard;
    return(
      <CardModal xs={11} width={10}>
        {card.length !== 0 && 
          <div>{card.uid}</div>
        }
      </CardModal>
    );
  }
}

export default DetailCard;