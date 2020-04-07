import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from "components/Main"

class MainContainer extends Component {
    render() {
        return <Main {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
});

// const mapDispatchToProps = (dispatch) => {
// }

export default connect(mapStateToProps, null)(MainContainer);