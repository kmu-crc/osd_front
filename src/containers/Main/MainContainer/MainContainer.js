import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from "components/Main";
import Main_mobile from "components/Main_mobile";

class MainContainer extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    window.innerWidth <= 500?
                    <Main_mobile {...this.props} />
                    :
                    <Main {...this.props} />
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
});

// const mapDispatchToProps = (dispatch) => {
// }

export default connect(mapStateToProps, null)(MainContainer);