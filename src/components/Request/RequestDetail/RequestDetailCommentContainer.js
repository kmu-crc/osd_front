import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetRequestCommentRequest, CreateRequestCommentRequest, DeleteRequestCommentRequest } from "actions/Request";
import Comment from 'components/Commons/Comment';

class RequestDetailComment extends Component {
  componentDidMount() {
    this.props.GetRequestCommentRequest(this.props.id);
  };
  comment = _data => {
    const data = { ..._data, board_id: this.props.id, user_id: this.props.userInfo.uid };
    this.props.CreateRequestCommentRequest(data, this.props.id, this.props.token)
      .then(res => this.props.GetRequestCommentRequest(this.props.id));
  };
  removeComment = (commentId) => {
    this.props.DeleteRequestCommentRequest(commentId, this.props.token)
      .then(res => this.props.GetRequestCommentRequest(this.props.id));
  };
  render() {
    console.log("test",this.props.Comment, this.props);
    if (!this.props.Comment) return <div>댓글이 없습니다.</div>
    let parentComments = this.props.Comment.filter(item => item.d_flag === null);
    let comments = parentComments.map(parent => {
      let replies = this.props.Comment.filter(item => item.d_flag === parent.uid);
      return { ...parent, replies };
    })
    console.log("comments", comments);
    return (<Comment comments={comments} my={this.props.userInfo} comment={this.comment} removeComment={this.removeComment} />)
  }
};
const mapStateToProps = state => ({
  Comment: state.RequestComment.status.Comment,
  userInfo: state.Authentication.status.userInfo,
  token: state.Authentication.status.token,
});
const mapDispatchToProps = dispatch => ({
  CreateRequestCommentRequest: (data, id, token) => dispatch(CreateRequestCommentRequest(data, id, token)),
  DeleteRequestCommentRequest: (id, token) => dispatch(DeleteRequestCommentRequest(id, token)),
  GetRequestCommentRequest: (id) => dispatch(GetRequestCommentRequest(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RequestDetailComment);
