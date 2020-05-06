import React, { Component } from 'react';
import Socket from "modules/socket";
import styled from 'styled-components';

const MemberStatus = styled.div`
  position: fixed;
  width: 275px;
  height: 350px;
  top: 10em;
  right: 3em;
  padding: 25px;
  border-radius: 35px;
  background-color: #EFEFEF;
  z-index: 999;
  .title {
    font-size: 20px;
    color: #707070;
  }
  .member {
    display: flex;
    flex-direction: row;
  }
`;

class ConnectedMemberContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { members: [] }
  }
  componentDidMount() {
    Socket.emit("REQUEST-THIS-ITEM-MEMBER", this.props.id);
    Socket.on("GET-ONLINE-MEMBER", list => {
      console.log("connected user:", list);
      this.setState({ members: list });
    });
    Socket.on("SOMEONE-LOGOUT", () => {
      Socket.emit("REQUEST-THIS-ITEM-MEMBER", this.props.id);
    })
  }
  componentWillUnmount() {
    // alert("out!");
    // Socket.emit("OUT-ITEM", this.props.id);
  }
  render() {
    const { members } = this.state;
    return (
      <MemberStatus>
        <div className="title">현재 접속중인 유저</div>
        <div className="">
          {members.map(mem => {
            console.log("mem", mem);
            return (<div className="member" key={mem.uid}>
              {/* <div>{mem.uid}</div> */}
              <div>{mem.nick_name}</div>

            </div>);
          })}
        </div>
      </MemberStatus>
    );
  }
}


export default ConnectedMemberContainer;
