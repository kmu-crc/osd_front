import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { AcceptDesignRequest, GetoutDesignRequest } from "actions/Designs/JoinDesign";
import { GetMyInvitedListRequest } from "actions/Users/MyDetail";

// css styling
const List = styled.li`
  margin: 0.1rem 0;
`;

class MyInvitedContainer extends Component {
  componentDidMount() {
    this.props.GetMyInvitedListRequest(this.props.token);
  }
  render(){
    return(
      <div>
        {this.props.list.length > 0?
          <ul>
            {this.props.list.map((design, i) => (
              <List key={i}>{design.title}</List>
            ))}
          </ul>
        : <div>받은 초대가 없습니다.</div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.MyJoin.status.InvitedList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyInvitedListRequest: (token) => {
      return dispatch(GetMyInvitedListRequest(token))
    },
    AcceptDesignRequest: (id, memberId, token) => {
      return dispatch(AcceptDesignRequest(id, memberId, token))
    },
    GetoutDesignRequest: (id, memberId, token) => {
      return dispatch(GetoutDesignRequest(id, memberId, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInvitedContainer);
