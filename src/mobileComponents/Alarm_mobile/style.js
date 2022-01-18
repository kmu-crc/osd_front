// import React from 'react'
import styled from 'styled-components'
import { Modal,Transition } from "semantic-ui-react"


export const AlarmWrapper = styled.div`
    width: 27px;
    height: 25px;
    position: relative !important;
`
export const NewAlarmCircle = styled.div`
    // width: 13.5px;
    // height: 13.5px;
    padding:2px;
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #FF3838;
    border-radius: 100%;
    display:flex;
    justify-content:center;
    .count {
        width:10px;
        height:10px;
        display:flex;
        justify-content:center;
        align-items:center;
        text-align: center;
        color: white;
        font-size: .75rem;
        font-weight: 500;
    }
`
export const AlarmModal = styled(Modal)`
    top: 35px;
    // left: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 100%;
    
    // width: ${props => props.width}px !important;
    // margin-left: 10px;
    // margin-right: 10px;
    height: 436px;
    .top-menu-bar {
        .memu-box { }
        .close-box {
            width: max-content;
            cursor: pointer;
            position: absolute;
            top: 16px;
            right: 16px;
            width: 28.8px;
            height: 28.8px;
        }
    }
    .alarm-list {
        overflow-y: scroll;
        overflow-x: hidden;

        margin-top: 54px; 
        margin-left: 10px;
        margin-right: 10px;
        height: 362px;
        ::-webkit-scrollbar {
            position: absolute;
            width: 7px;
            height: 254px;
        }
        ::-webkit-scrollbar-thumb {
            background: #707070 !important;
        } 
        .element {
            width: 90%;
            height: 56px;
            border-bottom: 1px solid #707070;
            display: flex;
            flex-direction: rows;
            margin-bottom: 21px;


            .bar {
                width: 5px;
                height: 46px;
                background-color: #FF383880;
                border-radius: 4px;
            }
            .text {
                margin-left: 10px;
                .message {
                    height: 22px;
                    text-align: left;
                    font: normal normal medium 15px/22px Noto Sans KR;
                    letter-spacing: 0px;
                    color: #000000;
                    opacity: 1;
                }
                .date {
                    height: 19px;
                    text-align: left;
                    font: normal normal medium 13px/19px Noto Sans KR;
                    letter-spacing: 0px;
                    color: #FF3838;
                    opacity: 1;
                }
            }
        }
    }
`