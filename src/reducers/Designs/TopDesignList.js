import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
    TopDesignList: {
        status: "INIT"
    },
    status: {
        TopDesignList: [],
        TopDesignListAdded: [],
    }
};

export function TopDesignList(state, action) {
    if (typeof state === "undefined")
        state = initialState;

    switch (action.type) {
        case types.GET_TOP_DESIGN_LIST_SUCCESS:
            return update(state, {
                TopDesignList: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    TopDesignList: { $set: action.TopDesignList },
                    TopDesignListAdded: { $push: action.TopDesignList }
                }
            });
        case types.GET_TOP_DESIGN_LIST_FAILURE:
            return update(state, {
                TopDesignList: {
                    status: { $set: "FAILURE" }
                },
                status: {
                    TopDesignList: { $set: action.TopDesignList },
                    TopDesignListAdded: { $set: action.TopDesignList }
                }
            });
        case types.GET_TOP_DESIGN_LIST_CLEAR:
            return update(state, {
                TopDesignList: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    TopDesignList: { $set: action.TopDesignList },
                    TopDesignListAdded: { $set: action.TopDesignList }
                }
            });
        default:
            return state;
    }
};
