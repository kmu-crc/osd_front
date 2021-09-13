import React, { Component } from 'react'
import new_logo_mail from "source/new_logo_mail.svg";
import styled from 'styled-components'


const MsgIcon = styled.div`
width:44px;
height:44px;
background: url(${new_logo_mail}); 
background-size:contain;
background-repeat: no-repeat;
background-position: center center;
`
class Message extends Component {
    gotoMessagePage() {
        window.location.href = '/message'
    }

    render() {
        return (<div style={{ cursor: "pointer" }} onClick={this.gotoMessagePage}>
            {this.props.noti && this.props.noti.countMsg > 0 && <div style={{ zIndex: "998", position: "absolute", marginLeft: "40px", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "red" }} />}
            <i style={{ zIndex: "997", opacity: ".9", fontSize: "34px" }} className="material-icons"><MsgIcon/></i>
        </div>)
    }
}

export default Message