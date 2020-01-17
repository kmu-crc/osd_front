import React, { Component } from 'react';
import styled, { keyframes } from "styled-components";
import StyleGuide from 'StyleGuide';
import { setCookie, getCookie } from "modules/Sessions";

const keyframe = keyframes`
  0% { height: 0px; }
  100% { height: 75px; }
`;
const Notification = styled.header`
  animation: ${keyframe} 0.4s ease-in-out;
  visibility: ${props => props.visible};
  width: 100%;
  height: 75px;
  top: 0;
  position: fixed;
  z-index: 100;
  color: ${StyleGuide.color.geyScale.scale9};
  background-color: #F2A3A9;
  .bottom{
    height: 35%;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 3px 3px 3px 3px;
    color: white;
  }
  .content{
    height: 65%;
    color: white;
    text-align: center;
    padding: 5px 5px 5px 5px;
    button{
      border: none;
      color: white;
      background-color:${StyleGuide.color.main.dark};
    }
  }
  }
`;
class Notice extends Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }
    close = (event, noti) => {
        var dif = Math.abs(new Date(noti.expiry_time) - new Date()) / (1000 * 60 * 60 * 24)
        this.refs[noti.uid].checked && setCookie('noti_' + noti.uid, 'hidden' + noti.uid, parseInt(dif, 10) + 1)
        let notification = this.props.notice;
        for (var i = 0; i < notification.length; i++) {
            if (notification[i].uid === noti.uid) {
                notification[i].visible = "hidden"
            }
        }
        this.setState({ notification: notification });
    }
    render() {
        const { notice } = this.props;
        return (
            notice.map(noti => {
                if (getCookie("noti_" + noti.uid))
                    return null;
                else
                    return <Notification visible={noti.visible || "visible"} key={noti.uid} >
                        <div className="content">
                            <div>{noti.content}<br /></div>
                            <div className="bottom">
                                <div>
                                    <label><input type="checkbox" name={noti.uid} ref={noti.uid} />그만보기&nbsp;</label>
                                    <button type="button" onClick={(event) => this.close(event, noti)} >닫기</button>
                                </div>
                            </div>
                        </div>
                    </Notification>
            })
        )
    }
}
export default Notice;