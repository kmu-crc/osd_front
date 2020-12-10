
export const requestSearchPeer = (members) => {
  return {
    type: 'GET_SEARCH_PEER',
    payload: { members }
  }
};

const initialState = {};
const searchpeer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SEARCH_PEER':
      {
        const { members } = action.payload;
        return { ...state, members: members }
      }
      default: {
        return state;
      }
  }
};


export default searchpeer;
