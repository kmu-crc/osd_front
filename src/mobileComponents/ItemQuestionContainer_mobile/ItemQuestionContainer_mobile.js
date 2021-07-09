import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ItemQuestion_mobile from "mobileComponents/ItemQuestion_mobile";
import { GetItemQuestionRequest, CreateItemQuestionRequest, /*DeleteItemQuestionRequest*/ } from "actions/Item";

class ItemQuestionContainer_mobile extends Component {
    constructor(props) {
        super(props);
        this.requestQuestion = this.requestQuestion.bind(this);
        this.getData = this.getData.bind(this);
    }
    componentDidMount() {
        this.props.GetItemQuestionRequest(this.props.match.params.id, 0)
            .then(() => {
                this.props.isExpanding(this.props.question.length > 1 ? true : false)
            })
    }

    requestQuestion(data) {
        this.props.CreateItemQuestionRequest(data, this.props.match.params.id, this.props.token)
            .then(res => {
                if (res.data.success) {
                    this.props.GetItemQuestionRequest(this.props.match.params.id, 0);
                }
            });
    }
    getData(page) {
        this.props.GetItemQuestionRequest(this.props.match.params.id, page);
    }
    render() {
        return (
            <React.Fragment>
                <ItemQuestion_mobile id={this.props.match.params.id} getData={this.getData} request={this.requestQuestion} {...this.props} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    question: state.ItemQuestion.status.Question,
    total: state.ItemQuestion.status.Total,
    replyCount: state.ItemQuestion.status.ReplyCount,
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
});
const mapDispatchToProps = (dispatch) => ({
    GetItemQuestionRequest: (id, page) => dispatch(GetItemQuestionRequest(id, page)),
    CreateItemQuestionRequest: (data, id, token) => dispatch(CreateItemQuestionRequest(data, id, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemQuestionContainer_mobile));
