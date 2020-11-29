import React from 'react';
import { connect } from 'react-redux';
import host from "config";
// import * as stateActions from "../redux/stateActions";
import { requestSearchPeer } from "../redux/reducers/searchpeer";

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
    const { id, token, members } = this.props;
    const { selected } = this.state;
    return (<React.Fragment>
      <div>
        <input onChange={event => {
          const key = event.target.value;
          this.props.search_member_request(id, { key: key }, token);
        }} />
        <ul style={{ overflowY: "scroll", height: "150px", width: "75%", border: "1px solid red" }}>
          {members &&
            members.map(mem => {
              return selected.includes(mem.uid)
                ? null :
                <li onClick={async _ => {
                  const copy = [...selected];
                  copy.push(mem.uid);
                  await this.setState({ selected: copy });
                  this.props.selected && this.props.selected(this.state.selected);
                }}>
                  {mem.uid}
                  {mem.email}
                  {mem.nickName}
                  {mem.nick_name}
                  {/* {mem.thumbnail.s_img} */}
                </li>
            })}
        </ul>
      </div>
      <div>
        <ul style={{ overflowY: "scroll", height: "150px", width: "75%", border: "1px solid red" }}>
          {selected && selected.map((mem, idx) => {
            return <li onClick={async _ => {
              const copy = [...selected];
              await copy.splice(idx, 1);
              this.setState({ selected: copy });
            }}>{mem}</li>
          })}
        </ul>
      </div>
    </React.Fragment>
    );
  }
};

const SearchMemberContainer =
  connect(
    // map state to props
    (state) => {
      return {
        members: state.searchpeer.members
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
