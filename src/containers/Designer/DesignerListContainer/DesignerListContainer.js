import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignerListRequest, GetDesignerTotalCountRequest } from "actions/Designer";
import DesignerList from "components/Designers/DesignerList";
import DesignerList_mobile from "mobileComponents/DesignerList_mobile"
class DesignerListContainer extends Component {
  render() {
    return (
    <React.Fragment>
      {
        window.innerWidth>=500?
        <DesignerList {...this.props} />
        :
        <DesignerList_mobile {...this.props}/>
      }
    </React.Fragment>
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
    category3: state.CategoryAll.status.category3,
    Count: state.DesignerList.status.Count
  };
};

const mapDispatchToProps = (dispatch) => ({
  GetDesignerListRequest: (page, sort, cate1, cate2, cate3, keyword) => dispatch(GetDesignerListRequest(page, sort, cate1, cate2, cate3, keyword)),
  GetDesignerTotalCountRequest: (category1, category2) => dispatch(GetDesignerTotalCountRequest(category1, category2))
})

export default connect(mapStateToProps, mapDispatchToProps)(DesignerListContainer);
