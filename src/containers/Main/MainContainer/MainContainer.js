import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from "components/Main";
import Main_mobile from "components/Main_mobile";
import { isMobile } from "constant";

class MainContainer extends Component {
    render() {
        return (
            isMobile()
                ? <Main_mobile {...this.props} />
                : <Main {...this.props} />)
    }
}

const mapStateToProps = (state) => ({
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
});
// const mapDispatchToProps = (dispatch) => {
// }

export default connect(mapStateToProps, null)(MainContainer);