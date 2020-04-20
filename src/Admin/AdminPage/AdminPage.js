import React, { Component } from "react";
import AdminTemplate from "templates/AdminTemplate";

class AdminMainPage extends Component{
  render() {
    return(
      <div>관리자 페이지입니다.</div>
    );
  }
}

class AdminPage extends Component {
  render() {
    return(
      <AdminTemplate>
          <AdminMainPage />
      </AdminTemplate>
    );
  }
}

export default AdminPage;
