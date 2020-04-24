import React, { Component } from "react";
import host from "config";
import ExpertReorderGrid from "./ExpertReorderGrid";
import Loading from "components/Commons/Loading";

// MANAGER
class HotExpertManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ui
      loading: false,
      // list
      experts: [],
      count: null,
    };
    this.GetHotExpertListRequest = this.GetHotExpertListRequest.bind(this);
    this.UpdateHotExpertRequest = this.UpdateHotExpertRequest.bind(this);
    this.handleUpdateRequest = this.handleUpdateRequest.bind(this);
  };

  componentDidMount() {
    this.GetHotExpertListRequest();
  };
  GetHotExpertListRequest() {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/TopExpertList`;
      console.log(url);
      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': this.props.admin_token
        },
        method: "GET"
      })
        .then(res => res.json())
        .then(data => this.setState({ experts: data }))
        .catch(error => alert(error));
    });
  };
  UpdateHotExpertRequest(job, token) {
    const { uid, type, data } = job;
    return new Promise((resolve) => {
      if (data.type === "delete") {
        fetch(`${host}/admins/${uid}/${type}/deleteTopExpert`, {
          headers: { 'x-access-token': token },
          method: "POST"
        }).then(res => res.json())
          .then(res => { })
          .catch(err => console.error(err));
      }
      else if (data.type === "insert") {
        fetch(`${host}/admins/${uid}/${type}/insertTopExpert`, {
          headers: { 'x-access-token': token, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(data)
        }).then(res => res.json())
          .then(res => { })
          .catch(err => console.error(err));
      }
      else {
        fetch(`${host}/admins/${uid}/${type}/updateTopExpert`, {
          headers: { "x-access-token": token, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(data)
        }).then(res => res.json())
          .then(res => { })
          .catch(err => console.error(err));
      }
      resolve();
    });
  };
  async handleUpdateRequest(jobs) {
    let promiseAry = [];
    promiseAry = jobs.map(job =>
      this.UpdateHotExpertRequest(job, this.props.admin_token))
    await Promise.all(promiseAry);
    this.GetHotExpertListRequest();
  };

  render() {
    const { experts, loading, } = this.state;

    return (
      <div style={{ display: "flex", flexDirection: "row", marginLeft: "auto", marginRight: "auto", width: "max-content" }}>

        {/* loading */}
        {loading ? <Loading /> : null}

        {/* favorite design manager */}
        <div style={{ width: "770px", overflowX: "hidden", marginTop: "20px", marginBottom: "10px" }}>
          <h1>인기 디자이너/메이커</h1>
          {experts && experts.length > 0
            ? <ExpertReorderGrid list={experts} update={this.handleUpdateRequest} />
            : "데이터가 없습니다."}
        </div>
      </div>

    )
  }
}

export default HotExpertManager;
