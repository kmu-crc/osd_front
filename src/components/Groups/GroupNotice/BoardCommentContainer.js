import React, { Component } from 'react';
import {
    GetBoardCommentRequest,
    CreateGroupBoardCommentRequest,
    UpdateGroupBoardCommentRequest,
    DeleteGroupBoardCommentRequest,
} from "redux/modules/group";
import Comment from 'components/Commons/Comment';
import styled from "styled-components";

const CommentWrapper = styled.div`
    font-size: 0.95rem;
`;
export default class BoardCommentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { comment: [], };
    }
    refresh = (group_id, board_id) => {
        GetBoardCommentRequest(group_id, board_id)
            .then(comment => {
                this.setState({ comment: comment.data });
            })
            .catch(e => {
                console.error(e);
            });
    }
    componentDidMount() {
        const { group_id, board_id } = this.props;
        this.refresh(group_id, board_id);
    }
    comment = (data) => {
        const { group_id, board_id, token } = this.props;
        const obj = { comment: data.comment, parent: data.d_flag }
        CreateGroupBoardCommentRequest(obj, group_id, board_id, token)
            .then((result) => {
                if (result.success)
                    this.refresh(group_id, board_id);
                else throw result.success
            })
            .catch(_ => {
                // alert("댓글달기를 하지 못하였습니다.")
            });
    }
    removecomment = (id) => {
        const { group_id, board_id, token } = this.props;
        console.log(id, group_id, board_id, token);
        DeleteGroupBoardCommentRequest(id, group_id, board_id, token)
            .then((result) => {
                if (result.success)
                    this.refresh(group_id, board_id);
                else throw result.success
            })
            .catch(_ => alert("댓글을 지우지 못하였습니다."));
    }
    editcomment = (data) => {
        const { group_id, board_id, token } = this.props;
        UpdateGroupBoardCommentRequest(data, group_id, board_id, token)
            .then((result) => {
                if (result.success)
                    this.refresh(group_id, board_id);
                else throw result.success
            })
            .catch(_ => alert("댓글을 수정하지 못하였습니다."));
    }

    render() {
        let parentComments = [];
        let comments = [];
        const { comment } = this.state;
        if (comment && comment.length > 0) {
            parentComments = comment.filter(item => item.parent == null);
            comments = parentComments.map(parent => {
                let replies = comment.filter(item => item.parent === parent.uid);
                return { ...parent, replies };
            })
        }
        return (<CommentWrapper>
            <Comment
                disabledBlink={true}
                disabledReply={true}
                comments={comments}
                my={this.props.userInfo}
                comment={this.comment}
                removeComment={this.removecomment} />
        </CommentWrapper>)
    }
}