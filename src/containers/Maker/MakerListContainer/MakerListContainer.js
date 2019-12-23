import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignerListRequest, GetDesignerTotalCountRequest } from "actions/Designer";
import MakerList from "components/Makers/MakerList";

class MakerListContainer extends Component {
    render() {
        return (
            <MakerList {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        DesignerList: state.DesignerList.status.DesignerList,
        DesignerListAdded: state.DesignerList.status.DesignerListAdded,
        userInfo: state.Authentication.status.userInfo,
        category1: state.CategoryAll.status.category1,
        category2: state.CategoryAll.status.category2,
        Count: state.DesignerList.status.Count
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        GetDesignerListRequest: (page, sort) => {
            return dispatch(GetDesignerListRequest(page, sort))
        },
        GetDesignerTotalCountRequest: (category1, category2) => {
            return dispatch(GetDesignerTotalCountRequest(category1, category2))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MakerListContainer);
