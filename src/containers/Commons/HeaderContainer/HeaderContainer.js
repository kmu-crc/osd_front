import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import Header from "components/Commons/Header"

class HeaderContainer extends Component {
    render() {
        return (
            <Header />
        )
    }
}

// const mapStateToProps = (state) => {
    // return {}
// }

// const mapDispatchToProps = (dispatch) => {
    // return {}
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer))
export default HeaderContainer
