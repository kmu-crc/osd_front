import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Comment from 'components/Commons/Comment';
import { CreateCardCommentRequest, GetCardCommentRequest, DeleteCardCommentRequest } from "redux/modules/design";

class CardComment extends Component {
    componentDidMount() {
        this.props.GetCardCommentRequest(this.props.designId, this.props.cardId);
    }
    reply = () => { }
    comment = (data) => {
        this.props.CreateCardCommentRequest(data, this.props.designId, this.props.cardId, this.props.token);
    }
    render() {
        console.log("CardComment", this.props);
        return (<>
            <Comment comment={this.comment} reply={this.reply} my={this.props.my} comments={this.props.Comment} />
        </>)
    }
}
const mapStateToProps = state => {
    return {
        Comment: state.DesignComment.status.CardComment,
        token: state.Authenification.status.token,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        GetCardCommentRequest: (design_id, card_id) => {
            return dispatch(GetCardCommentRequest(design_id, card_id));
        },
        CreateCardCommentRequest: (data, design_id, card_id, token) => {
            return dispatch(CreateCardCommentRequest(data, design_id, card_id, token));
        },
        DeleteCardCommentRequest: (design_id, card_id, comment_id, token) => {
            return dispatch(DeleteCardCommentRequest(design_id, card_id, comment_id, token));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardComment));