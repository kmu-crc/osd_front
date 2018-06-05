import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerListRequest } from "actions/Designer";
// import ScrollDesignerList from "components/Designers/ScrollDesignerList";
import ScrollList from "components/Commons/ScrollList";
import Designer from "components/Designers/Designer";

class ScrollDesignerListContainer extends Component {
  getList = (page) => {
    return this.props.GetDesignerListRequest(page, this.props.sort, this.props.cate1, this.props.cate2);
  }

  render() {
    return(
      <div>
        <ScrollList getListRequest={this.getList} 
                    ListComponent={Designer} 
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} 
                    mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} customClass="largeCustom"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.DesignerList.status.DesignerList,
    dataListAdded: state.DesignerList.status.DesignerListAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignerListRequest: (sort, categoryLevel1, categoryLevel2, page) => {
        return dispatch(GetDesignerListRequest(sort, categoryLevel1, categoryLevel2, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignerListContainer);
