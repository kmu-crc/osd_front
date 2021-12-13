import React, { Component } from 'react';
import { connect } from "react-redux";
import Comment from 'components/Commons/Comment';
import Comment_mobile from 'components/Commons/Comment_mobile';
import { GetCardCommentRequest, CreateCardCommentRequest, DeleteCardCommentRequest } from "redux/modules/design";
import { isMobile } from "constant";


class CardComment extends Component {
    componentDidMount() {
        this.props.GetCardCommentRequest(this.props.designId, this.props.cardId);
    }
    comment = (data) => {

        this.props.CreateCardCommentRequest(data, this.props.designId, this.props.cardId, this.props.token)
            .then(res => {
                this.props.GetCardCommentRequest(this.props.designId, this.props.cardId);
            })
    }
    removeComment = (commentId) => {
        this.props.DeleteCardCommentRequest(this.props.designId, this.props.cardId, commentId, this.props.token)
            .then(res => {
                this.props.GetCardCommentRequest(this.props.designId, this.props.cardId);
            })
    }
    render() {
        let parentComments = this.props.Comment.filter(item => item.d_flag === null);
        let comments = parentComments.map(parent => {
            let replies = this.props.Comment.filter(item => item.d_flag === parent.uid);
            return { ...parent, replies };
        })
        return (<div >
            {isMobile()
                ? <Comment_mobile comments={comments} my={this.props.my} comment={this.comment} removeComment={this.removeComment} />
                : <Comment comments={comments} my={this.props.my} comment={this.comment} removeComment={this.removeComment} />
            }
        </div>)
    }
};
const mapStateToProps = state => {
    return {
        Comment: state.DesignComment.status.CardComment,
        token: state.Authentication.status.token,
    }
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
};
export default connect(mapStateToProps, mapDispatchToProps)(CardComment);
