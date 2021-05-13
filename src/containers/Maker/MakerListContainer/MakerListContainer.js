import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMakerListRequest, GetMakerTotalCountRequest } from "actions/Maker";
import MakerList from "components/Makers/MakerList";

class MakerListContainer extends Component {
    render() {
        return (<MakerList {...this.props} />);
    }
}

const mapStateToProps = (state) => ({
    DesignerList: state.DesignerList.status.DesignerList,
    DesignerListAdded: state.DesignerList.status.DesignerListAdded,
    userInfo: state.Authentication.status.userInfo,
    category1: state.CategoryAll.status.category1,
    category2: state.CategoryAll.status.category2,
    category3: state.CategoryAll.status.category3,
    Count: state.DesignerList.status.Count
});

const mapDispatchToProps = (dispatch) => ({
    GetMakerListRequest: (page, sort, cate1, cate2, cate3, keyword) => dispatch(GetMakerListRequest(page, sort, cate1, cate2, cate3, keyword)),
    GetMakerTotalCountRequest: (category1, category2) => dispatch(GetMakerTotalCountRequest(category1, category2))
});

export default connect(mapStateToProps, mapDispatchToProps)(MakerListContainer);
