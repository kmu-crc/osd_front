import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class NotFound extends Component {
    render() {
        return (<><div style={{ width: "1920px", marginTop: "125px", marginBottom: "125px", fontSize: "36px", textAlign: "center" }}>
            <Link to="/">gotoMain</Link>ERROR404: page not found
            </div>
        </>)
    }
}
export default NotFound 