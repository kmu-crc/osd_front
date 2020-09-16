import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { InputContent } from "components/Commons/InputItem";
import { GetItemContentRequest } from "actions/Item";
import CardSourceDetail from "components/Designs/CardSourceDetail";

class ItemContentContainer extends Component {
    componentDidMount() {
        this.props.GetItemContentRequest(this.props.id, this.props.token);
    }
    render() {
        console.log(this.props.content, "~");
        // return (<InputContent content={this.props.ItemContent} />)
        return (<CardSourceDetail {...this.props} upDateRequest={() => console.log("updated")} />);
    }
}

const mapStateToProps = (state) => ({
    content: state.ItemContent.status.Content,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
});
const mapDispatchToProps = (dispatch) => ({
    GetItemContentRequest: (id, token) => dispatch(GetItemContentRequest(id, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemContentContainer));
