import React, { Component } from "react";
import host from "config";
import DesignReorderGrid from "./DesignReorderGrid";
import Loading from "components/Commons/Loading";
// MANAGER
class HotDesignManager extends Component {
  constructor(props) {
    super(props);
    this.state = {

      // ui
      loading: false,

      // list
      page: 0, max: 10,
      editSpecial: false,
      special: [], normal: [],
      count: null,
    };
    this.GetSpecialDesignListRequest = this.GetSpecialDesignListRequest.bind(this);
    this.UpdateDesignRequest = this.UpdateDesignRequest.bind(this);
    this.handleUpdateRequest = this.handleUpdateRequest.bind(this);
    this.EditSpecial = this.EditSpecial.bind(this);
    this.DeleteDesignRequest = this.DeleteDesignRequest.bind(this);
  };
  componentDidMount() {
      this.GetSpecialDesignListRequest();
      this.setState({ editSpecial: true });
  };
  GetSpecialDesignListRequest() {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/TopItemList`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json'
      , 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => {
          this.setState({ special: data });
          console.log(data);
      })
        .catch(error => alert(error));
    })
  };
  UpdateDesignRequest(id, data, token) {
    return new Promise((resolve) => {
      if (data.type === "delete") {
        fetch(`${host}/admins/${id}/deleteTopDesign`, {
          headers: { 'x-access-token': token },
          method: "POST"
        })
          .then(res => res.json())
          .then(res => { resolve();})
          .catch(err => console.error(err));
      }
      else if (data.type === "insert") {
        fetch(`${host}/admins/${id}/insertTopDesign`, {
          headers: { 'x-access-token': token, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(data)
        }).then(res => res.json())
          .then(res => { resolve();})
          .catch(err => console.error(err));
      }
      else {
        fetch(`${host}/admins/${id}/updateTopDesign`, {
          headers: { "x-access-token": token, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(res => { resolve();})
          .catch(err => console.error(err));
      }
      
    });
  };
  async handleUpdateRequest(jobs) {
    // console.log(jobs); return;
    let promiseAry = [];
    promiseAry = jobs.map(job => this.UpdateDesignRequest(job.uid, job.data, this.props.admin_token))
    await Promise.all(promiseAry);
    this.GetSpecialDesignListRequest();
  };
  EditSpecial() {
    if (this.state.editSpecial) { //to off
      this.setState({ editSpecial: false, special: [] });
    }
    else { //to on
      this.GetSpecialDesignListRequest();
      this.setState({ editSpecial: true });
    }
  }
  DeleteDesignRequest(item) {
    const deleteRequest = () => {
      return new Promise((resolve, reject) => {
        const url = `${host}/admins/DeleteDesign/${item.uid}`;
        console.log(url);
        fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': this.props.admin_token
          },
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => data.success ? alert("삭제성공") : alert("삭제실패"))
          .catch(error => alert(error));
      });
    }
    const prompt = window.prompt(`
    선택하신 디자인을 삭제합니다.
    확인 차 아래 입력창에 디자인의 이름을 입력해주세요.\n
    디자인이름입력: ${item.title}\n`);
    (prompt === item.title) ?
      deleteRequest()
        .then(() => this.GetDesignListCountRequest())
        .then(() => this.GetDesignListRequest())
      : alert("잘못입력하셨습니다.");
  }
  render() {
    const { special, editSpecial,loading} = this.state;
    return (
      <div style={{ display: "flex", flexDirection: "row", marginLeft: "auto", marginRight: "auto", width: "max-content" }}>

        {/* loading */}
        {loading ? <Loading /> : null}

        {/* favorite design manager */}
        <div style={{ width: editSpecial ? "770px" : "150px", overflowX: "hidden",marginTop:"20px",marginBottom:"10px" }}>
          <h1>인기아이템</h1>
          <DesignReorderGrid list={special} update={this.handleUpdateRequest} />
        </div>
      </div>

    )
  }
}

export default HotDesignManager;

