import styled from 'styled-components';
import market_style from "market_style";
import who from "source/thumbnail.png";
import arrow_new from "source/arrow_new.png";
import { PxToVH, PxToVW } from "modules/PxtoViewport";

export const Container = styled.div`
    *{ font-family:Noto Sans KR; }
    *{ border: 1px solid #FF3838; }
    display: flex;
    justify-content: center;
    margin-top: ${PxToVH(35)}vh;
    margin-bottom: ${PxToVH(100)}vh;
    width: 100%;
    height: ${PxToVH(750)}vh;
    .line{
        display: flex;
        flex-direction: row;
    }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-start;
  border-radius: 25px;
  box-shadow: 5px 5px 10px #00000029;
  
  @media only screen and (min-width: 499px) and (max-width: 900px){
    *{ background-color: blue; }

  }
  @media only screen and (min-width: 900px) and (max-width: 1366px){
    *{ background-color: green; }
  }
`;
export const Peers = styled.div`
  cursor: default;
  background: #F9F9F9;
  border-radius: 25px 0 0 25px;
  padding: ${PxToVH(25)}vh ${PxToVW(25)}vw;

  .self {
    padding: ${PxToVH(25)}vh ${PxToVW(25)}vw;
    border-radius: 20px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;

    .me {
      width: ${PxToVW(45)}vw;
      height: ${PxToVH(45)}vh;
      border-radius: 50%;
      background-size: cover;
      background-position: center center;
    }
  }

  .searchBox {
    align-items: center;
    padding-top: 25px;
    padding-bottom: 25px;

    .searchRow {
      display: flex;
    }
    .heading {
      margin-right: 10px;
      display: flex;
      align-items: center;
    }
    .memberBox {
      border-radius: 10px;
      border: 1px solid white;
      padding: 5px;
      margin-top: 5px;
      background-color: #E6E6E6;
      cursor: pointer;
    }
  }

  .list {
    font-family: Noto Sans KR;
    dipsplay: flex;
    flex-direction: column;
    height: 650px;
    overflow: hidden;
    :hover {
        overflow: auto;
    }
    .person {
        max-height: 100px;
        margin-bottom: 5px;
        background-color: #FBFBFB;
        border:1px solid #E6E6E6;
        border-radius: 20px;
        padding: 25px;

        :hover {
            background: #F0F0F0;
        }
        &.active {
            background: #F0F0F0;
        }
        margin-bottom: 10px;
        // width: 100%;
        display: flex;
        flex-direction: row;
      // justify-content: space-between;
     .middle {
        width: 250px;
        margin-left: 5px;
        .name {
          color: #7F7F7F;
          font-weight: 500;
        }
        .last-message {
          height:20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .date {
        width: 75px;
        margin-left: auto;
        margin-right: 15px;
        .sent-date {
          text-align: right;
          margin-left: auto;
          margin-right: 10px;
        }
        .checker {
        }
      }
    }
  }
`;
export const Chatting = styled.div`
  background: #FFFFFF;
  border-left:1px solid #E6E6E6;
  padding:25px;
  border-radius: 0 25px 25px 0;
  font-family: Noto Sans KR;
  width: 750px;
  &.expand {
    border-radius: 0;
  }
  .status {
    background-color: #F9F9F9;
    border-radius: 0px 20px 0px 0px;
    border: 1px solid #E9E9E9;
    display: flex;
    flex-direction: row;
    padding: 25px;
    .nick {
      margin-left: 5px;
      font-size: ${market_style.font.size.small2};
      font-weight: 500;
    }
    .circle {
      margin-left: 5px;
      width: 10px;
      height: 10px;
      border: 1px solid gray;
      background-color: gray;
      border-radius: 50%;
      &.active {
        background-color: #00FF00;
        border: 1px solid #00FF00;
      }
    }
  }
  .chat-list {
    margin-top: 15px;
    height: 530px;
    overflow:hidden;
  }
  .chat-input {
    margin-top: 15px;
    .border{
      border-bottom: 1px solid gray;
    }
    .input-wrapper {
      margin-top: 15px;
      .input-style {
        display:flex;
        justify-content:center;
        align-items:center;
        width: 90%;
        background: #F0F0F0;
        border-radius: 25px 0 0 25px; 
        input {
          width: 100%;
          padding-left: 10px;
          border: none;
          background: transparent;
        }
      }
      .button-style{
        min-width:60px;
        min-height:40px;
        background-color: #FF3838;
        width: 35px;
        height: 35px;
        display:flex;
        justify-content:center;
        align-items:center;
        text-align: center;
        border-radius: 0px 20px 20px 0px;
        button{
          border: none;
          background: transparent;

        }
      }
    }
  }
  &:hover{
    .chat-list{
      overflow:auto;
    }
  }
  .folding {
    position: absolute;
    width: 35px;
    height: 35px;
    background: white;
    border-radius: 100%;
    cursor: pointer;
  }
  .arrow {
    margin: auto;
    margin-top: 5px;
    margin-left: 10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid black;
  }
  
`;
export const SendMessageTextarea = styled.div`
    width: 95%;
    height: 40px;
    min-height: 40px;
    font-size: ${market_style.font.size.mini2};
    text-align: left;
    line-height: 27px;
    background-color: #dddddd;
    resize: none;
    border: none;
    outline: none;
    padding: 5px;
    overflow: auto;

    
`;
export const Face = styled.div`
  background-image: url(${props => props.img ? props.img : who});
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
`;
//export const ProfileDetail = styled.div`
//  width: 100px;
//  background: #F9F9F9;
//  display: none;
//  &.expand {
//    display: block;
//    border-radius: 0 25px 25px 0;
//  }
//
//`;