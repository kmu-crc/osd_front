import React, { Component } from 'react';
import Comment from 'components/Commons/Comment';

class CardComment extends Component {
    reply = () => { }
    render() {
        console.log("CardComment", this.props.comment);
        return (<><Comment comment={this.props.comment} /></>)
    }
}

export default CardComment;