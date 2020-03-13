import * as types from "actions/ActionTypes";
import host from "config";

// GET DESIGNER REVIEW LIST
export function GetDesignerReviewListRequest(id, page) {
    return (dispatch) => {
        const url =  `${host}/designer/get-review/${id}/${page}`;
        console.log(url);
        return fetch(url,
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
        const url =  `${host}/designer/get-review-count/${id}`;
        console.log(url);
        return fetch(url,
            { headers: { "Content-Type": "application/json" }, method: "GET" })
            .then(res => res.json())
            .then(data => dispatch(GetTotalDesignerReview(data)))
            .catch(err => dispatch(TotalDesignerReviewFail(err)))
    }
};
const GetTotalDesignerReview = (data) => ({ type: types.GET_TOTAL_COUNT_DESIGNER_REVIEW, Total: data.data });
const TotalDesignerReviewFail = (err) => ({ type: types.GET_TOTAL_COUNT_DESIGNER_REVIEW_FAIL, Total: 0, error: err });



// GET MAKER REVIEW LIST
export function GetMakerReviewListRequest(id, page) {
    return (dispatch) => {
        const url =  `${host}/Maker/get-review/${id}/${page}`;
        return fetch(url,
            { headers: { "Content-Type": "application/json" }, method: "GET" })
            .then(res =>
                res.json())
            .then(data =>
                dispatch(page === 0 ? MakerReviewClear(data || []) : MakerReview(data || [])))
            .catch(err =>
                dispatch(MakerReviewFail()))
    }
};

const MakerReview = (data) => ({ type: types.GET_MAKER_REVIEW, List: data.data });
const MakerReviewClear = (data) => ({ type: types.GET_MAKER_REVIEW_CLEAR, List: data.data, ListAdded: [] });
const MakerReviewFail = () => ({ type: types.GET_MAKER_REVIEW_FAIL, List: [], ListAdded: [] });
// GET MAKER REVIEW TOTAL COUNT
export function GetTotalCountMakerReviewRequest(id) {
    return (dispatch) => {
        const url =  `${host}/maker/get-review-count/${id}`;
        return fetch(url,
            { headers: { "Content-Type": "application/json" }, method: "GET" })
            .then(res => res.json())
            .then(data => dispatch(TotalMakerReview(data)))
            .catch(err => dispatch(TotalMakerReviewFail(err)))
    }
};
const TotalMakerReview = (data) => ({ type: types.GET_TOTAL_COUNT_MAKER_REVIEW, Total: data.data });
const TotalMakerReviewFail = (err) => ({ type: types.GET_TOTAL_COUNT_MAKER_REVIEW_FAIL, Total: 0, error: err });
