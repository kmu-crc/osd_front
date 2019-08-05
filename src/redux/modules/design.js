import host from "config"
import update from 'react-addons-update'

// actions
export const ACCEPT_DESIGN = "ACCEPT_DESIGN"
export const ACCEPT_DESIGN_SUCCESS = "ACCEPT_DESIGN_SUCCESS"
export const ACCEPT_DESIGN_FAILURE = "ACCEPT_DESIGN_FAILURE"

// action creators
export const AcceptDesign = () => ({ type: ACCEPT_DESIGN })
export const AcceptDesignSuccess = (data) => ({ type: ACCEPT_DESIGN_SUCCESS, data })
export const AcceptDesignFailure = () => ({ type: ACCEPT_DESIGN_FAILURE })

// api actions
export function AcceptDesignRequest(id, memberId, token) {
    return (dispatch) => {
        dispatch(AcceptDesign());
        return fetch(`${host}/Design/designDetail/${id}/acceptDesign/${memberId}`, {
            headers: { "Content-Type": "application/json", 'x-access-token': token },
            method: "post"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("가입승낙 >>>", data);
            if (!data) {
                console.log("no data");
            }
            return dispatch(AcceptDesignSuccess(data));
        }).catch((error) => {
            console.log("err", error);
            return AcceptDesignFailure(error);
        });
    }
}
