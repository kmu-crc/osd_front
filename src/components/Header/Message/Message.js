import React, { Component } from 'react'

class Message extends Component {
    gotoMessagePage() {
        window.location.href = '/message'
    }
    render() {
        return (<div style={{ cursor: "pointer" }} onClick={this.gotoMessagePage}>
            {this.props.countMsg > 0 && <div style={{ zIndex: "998", position: "absolute", marginLeft: "29px", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "red" }} />}
            <i style={{ zIndex: "997", opacity: ".9", fontSize: "34px" }} className="material-icons">email</i>
        </div>)
    }
}

export default Message