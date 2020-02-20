import * as types from "actions/ActionTypes";
import host from "config";

// get is purchased
export const GetItemReviewRequest = (id, page) => {
    return dispatch => {
        dispatch(GetItemReview());
        const url = `${host}/item/detail/${id}/is-payment`;
        return fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "GET"
        })
            .then(res => res.json())
            .then(data => dispatch(GetItemReviewSuccess(data)))
            .catch(error => dispatch(GetItemReviewFailure(error)));
    };
};

const GetItemReview = () => ({
    type: types.GET_ITEM_QUESTION
});