import React, { Component } from 'react';
import { connect } from "react-redux";
import Comment from 'components/Commons/Comment';
// import { GetCardCommentRequest, CreateCardCommentRequest, DeleteCardCommentRequest } from "src/actions/Design";

class DesignerBoardDetailComment extends Component {
  componentDidMount() {
    // this.props.GetCardCommentRequest(this.props.designId, this.props.cardId);
  }
  comment = (data) => {
    // this.props.CreateCardCommentRequest(data, this.props.designId, this.props.cardId, this.props.token)
    // .then(res => {
    // this.props.GetCardCommentRequest(this.props.designId, this.props.cardId);
    // })
  }
  removeComment = (commentId) => {
    // this.props.DeleteCardCommentRequest(this.props.designId, this.props.cardId, commentId, this.props.token)
    // .then(res => {
    // this.props.GetCardCommentRequest(this.props.designId, this.props.cardId);
    // })
  }
  render() {
    if (!this.props.Comment) return <div>댓글이 없습니다.</div>
    let parentComments = this.props.Comment.filter(item => item.d_flag === null);
    let comments = parentComments.map(parent => {
      let replies = this.props.Comment.filter(item => item.d_flag === parent.uid);
      return { ...parent, replies };
    })
    return (<Comment comments={comments} my={this.props.my} comment={this.comment} removeComment={this.removeComment} />)
  }
};
const mapStateToProps = state => {
  return {
    // Comment: state.DesignComment.status.CardComment,
    token: state.Authentication.status.token,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    // GetCardCommentRequest: (design_id, card_id) => dispatch(GetCardCommentRequest(design_id, card_id)),
    // CreateCardCommentRequest: (data, design_id, card_id, token) => dispatch(CreateCardCommentRequest(data, design_id, card_id, token)),
    // DeleteCardCommentRequest: (design_id, card_id, comment_id, token) => dispatch(DeleteCardCommentRequest(design_id, card_id, comment_id, token))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(DesignerBoardDetailComment);
