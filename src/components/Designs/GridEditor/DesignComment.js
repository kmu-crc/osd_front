import React, { Component } from 'react';
import { connect } from "react-redux";
import Comment from 'components/Commons/Comment';
import { GetDesignCommentRequest, CreateDesignCommentRequest, DeleteDesignCommentRequest } from "redux/modules/design";

class DesignComment extends Component {
    componentDidMount() {
        this.props.GetDesignCommentRequest(this.props.designId);
    }
    reply = () => { }
    comment = (data) => {
        this.props.CreateDesignCommentRequest(data, this.props.designId, this.props.cardId, this.props.token);
    }
    render() {
        console.log(this.props.Comment);
        return (<>
            <Comment comment={this.comment} reply={this.reply} my={this.props.userInfo} comments={this.props.Comment} />
        </>)
    }
};
const mapStateToProps = state => {
    return {
        Comment: state.DesignComment.status.Comment,
        token: state.Authentication.status.token,
        userInfo: state.Authentication.status.userInfo,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        GetDesignCommentRequest: (design_id) => {
            return dispatch(GetDesignCommentRequest(design_id));
        },
        CreateDesignCommentRequest: (data, design_id, token) => {
            return dispatch(CreateDesignCommentRequest(data, design_id, token));
        },
        DeleteDesignCommentRequest: (design_id, comment_id, token) => {
            return dispatch(DeleteDesignCommentRequest(design_id, comment_id, token));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(DesignComment);
