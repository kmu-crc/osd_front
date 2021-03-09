import React from 'react';
import { connect } from 'react-redux';
import host from "config";
import { requestSearchPeer } from "../redux/reducers/searchpeer";
import styled from "styled-components";
import opendesign_style from "opendesign_style";
import noface from "source/thumbnail.png";

const SearchMemberDiv = styled.div`
  & ul {
    margin: 1rem 0 2rem 0;
    padding: 3px;
    list-style: none;
    overflow-y: scroll;
    height: 75px;
    // width: 75%;
    border: 1px solid #EAEAEA;
    ::-webkit-scrollbar {
      position: absolute;
      width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(112, 112, 112, 0.45) !important;
    }
    li {
      padding: 1px;
      cursor: default;
      :hover {
        background-color: rgba(255, 112, 112, 0.15);
      }
    }
  }
`;
const Label = styled.div`
  margin: 0 0 0.8rem 0;
  display: block;
  color: rgba(0,0,0,.87);
  font-size: ${opendesign_style.font.size.paragraph};
  font-weight: 700;
  text-transform: none;
`;

function search_member_request(id, data, token) {
  return (dispatch) => {
    const url = `${host}/search/members/null`
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log("key: ", res);
        return dispatch(requestSearchPeer(res.members));
      })
      .catch(error =>
        console.error(error));
  };
};

class SearchMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }
  render() {
    const { id, token, users, members } = this.props;
    const { selected } = this.state;
    console.log(selected);
    const ids_users = (users && users.length && users.map(mem => mem.uid)) || [];
    const ids_selected = (selected && selected.length && selected.map(mem => mem.uid)) || [];
    const ids_members = (members && members.length && members.map(mem => mem.user_id)) || [];
    console.log(ids_users);
    console.log(ids_selected, selected);
    console.log(ids_members);

    return (<React.Fragment>
      <Label>검색</Label>
      <SearchMemberDiv>
        <input onChange={event => {
          const key = event.target.value;
          this.props.search_member_request(id, { key: key }, token);
        }}
        />
        <ul >
          {users &&
            users.map(mem => {
              return ids_members.includes(mem.uid) || ids_selected.includes(mem.uid)
                ? null :
                <li
                  key={mem.uid}
                  style={{ display: "flex", flexDirection: "row" }}
                  onClick={async _ => {
                    const copy = [...selected];
                    copy.push(mem);
                    await this.setState({ selected: copy });
                    this.props.selected && this.props.selected(this.state.selected);
                  }}>
                  <div style={{ width: "35px", height: "35px", borderRadius: "100%", backgroundSize: "cover", backgroundPosition: "center center", backgroundImage: `url(${mem.s_img || noface})` }} />
                  <div style={{ height: "35px", lineHeight: "35px", textAlign: "center" }}>{mem.nick_name}({mem.email})</div>
                </li>
            })}
        </ul>
      </SearchMemberDiv>

      <SearchMemberDiv>
        <ul>
          {selected && selected.length > 0 && selected.map((mem, idx) => {
            return <li
              style={{ display: "flex", flexDirection: "row" }}
              onClick={async _ => {
                const copy = [...selected];
                await copy.splice(idx, 1);
                this.setState({ selected: copy });
              }}>
              <div style={{ width: "35px", height: "35px", borderRadius: "100%", backgroundSize: "cover", backgroundPosition: "center center", backgroundImage: `url(${mem.s_img || noface})` }} />
              <div style={{ height: "35px", lineHeight: "35px", textAlign: "center" }}>{mem.nick_name}({mem.email})</div>
            </li>
          })}
        </ul>
      </SearchMemberDiv>
    </React.Fragment >
    );
  }
};

const SearchMemberContainer =
  connect(
    // map state to props
    (state) => {
      return {
        users: state.searchpeer.members
        // state
      }
    },
    // map dispatch to props
    (dispatch) => {
      return {
        search_member_request: (id, data, token) => {
          return dispatch(search_member_request(id, data, token));
        }
      }
    }
  )(SearchMember);

export default SearchMemberContainer;
