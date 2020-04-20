import React, { Component } from "react"
import AdminTemplate from "templates/AdminTemplate"
import NoticeManager from "../components/NoticeManager"

class NoticeManagerPage extends Component {
    render() {
        return (
            <AdminTemplate>
                <NoticeManager {...this.props} />
            </AdminTemplate>
        )
    }
}

export default NoticeManagerPage