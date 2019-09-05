import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Comment from 'components/Commons/Comment'
import { GetDesignCommentRequest, CreateDesignCommentRequest, DeleteDesignCommentRequest } from "redux/"

class DesignComment extends Component {
    componentDidMount() {
        this.props.GetDesignCommentRequest(this.props.designId);
    }
    reply = () => { }
    comment = (data) => {
        this.props.CreateDesignCommentRequest(data, this.props.designId, this.props.cardId, this.props.token);
    }
    render() {
        return (<>
            <Comment comment={this.comment} reply={this.reply} my={this.props.my} comments={this.props.Comment} />
        </>)
    }
}


const mapStateToProps = state => {
    return {
        Comment: state.DesignComment.status.Comment,
        token: state.Authenification.status.token,
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
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesignComment));