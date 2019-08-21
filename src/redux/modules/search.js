import host from "config"
import update from "react-addons-update"


const GET_SEARCH_MEMBER = "GET_SEARCH_MEMBER"
const GET_SEARCH_MEMBER_SUCCESS = "GET_SEARCH_MEMBER_SUCCESS"
const GET_SEARCH_MEMBER_FAILURE = "GET_SEARCH_MEMBER_FAILURE"



const SearchMember = () => ({ type: GET_SEARCH_MEMBER })
const SearchMemberSuccess = (members) => ({ type: GET_SEARCH_MEMBER_SUCCESS, members })
const SearchMemberFailure = () => ({ type: GET_SEARCH_MEMBER_FAILURE })

const initialState = {
  Search: { status: "INIT" },
  WaitingList: { status: 'INIT' },
  status: { WaitingList: [], members: [] }
}


export default function Search(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case GET_SEARCH_MEMBER:
      return update(state, {
        Search: {
          $set: "WAITING"
        }
      });
    case GET_SEARCH_MEMBER_SUCCESS:
      return update(state, {
        Search: {
          $set: "SUCCESS"
        },
        status: {
          members: { $set: action.members }
        }
      });
    case GET_SEARCH_MEMBER_FAILURE:
      return update(state, {
        Search: {
          $set: "FAILURE"
        },
        status: {
          members: { $set: [] }
        }
      });
        
    default:
      return state;
  }
}


export function SearchMemberRequest (id, data, token) {
  return (dispatch) => {
    dispatch(SearchMember());
    console.log(id, data);
    const url = `${host}/search/members/${id}`
    return fetch(url, { headers: { "Content-Type": "application/json", "x-access-token": token }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log(res);
        return dispatch(SearchMemberSuccess(res.members));
      }).catch((error) => {
        return dispatch(SearchMemberFailure());
      });
  };
};