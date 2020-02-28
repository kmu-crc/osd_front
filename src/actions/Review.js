import * as types from "actions/ActionTypes";
import host from "config";

// GET DESIGNER REVIEW LIST
export function GetDesignerReviewListRequest(id, page) {
    return (dispatch) => {
        const sql = `${host}/designer/get-review/${id}/${page}`;
        console.log(sql);
        return fetch(sql,
            { headers: { "Content-Type": "application/json" }, method: "GET" })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return dispatch(page === 0 ? DesignerReviewClear(data || []) : GetDesignerReview(data || []))
            }
            )
            .catch(err => dispatch(DesignerReviewFail()))
    }
};
const GetDesignerReview = (data) => ({ type: types.GET_DESIGNER_REVIEW, List: data.data });
const DesignerReviewClear = (data) => ({ type: types.GET_DESIGNER_REVIEW_CLEAR, List: data.data, ListAdded: [] });
const DesignerReviewFail = () => ({ type: types.GET_DESIGNER_REVIEW_FAIL, List: [], ListAdded: [] });

// GET DESIGNER REVIEW TOTAL COUNT
export function GetTotalCountDesignerReviewRequest(id) {
    return (dispatch) => {
        const sql = `${host}/designer/get-review-count/${id}`;
        console.log(sql);
        return fetch(sql,
            { headers: { "Content-Type": "application/json" }, method: "GET" })
            .then(res => res.json())
            .then(data => dispatch(GetTotalDesignerReview(data)))
            .catch(err => dispatch(TotalDesignerReviewFail(err)))
    }
};
const GetTotalDesignerReview = (data) => ({ type: types.GET_TOTAL_COUNT_DESIGNER_REVIEW, Total: data.data });
const TotalDesignerReviewFail = (err) => ({ type: types.GET_TOTAL_COUNT_DESIGNER_REVIEW_FAIL, Total: 0, error: err });

