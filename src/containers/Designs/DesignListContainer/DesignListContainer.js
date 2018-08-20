import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest, GetDesignTotalCountRequest } from "actions/Design";
import { GetCategoryLevel2Request } from "actions/Categorys";
import DesignList from "components/Designs/DesignList";

class DesignListContainer extends Component {
  render() {
    return(
      <div>
        <DesignList {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignList: state.DesignList.status.DesignList,
    DesignListAdded: state.DesignList.status.DesignListAdded,
    userInfo: state.Authentication.status.userInfo,
    category1: state.CategoryAll.status.category1,
    category2: state.CategoryAll.status.category2,
    Count: state.DesignList.status.Count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignListRequest: (page, sort, categoryLevel1, categoryLevel2) => {
        return dispatch(GetDesignListRequest(page, sort, categoryLevel1, categoryLevel2))
      },
      GetDesignTotalCountRequest: (category1, category2) => {
        return dispatch(GetDesignTotalCountRequest(category1, category2))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignListContainer);
