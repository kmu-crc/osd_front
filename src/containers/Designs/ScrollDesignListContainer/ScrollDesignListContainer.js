import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest } from "actions/Design";
import ScrollDesignList from "components/Designs/ScrollDesignList";

class ScrollDesignListContainer extends Component {
  render() {
    return(
      <div>
        <ScrollDesignList {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignList: state.DesignList.status.DesignList,
    DesignListAdded: state.DesignList.status.DesignListAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignListRequest: (sort, categoryLevel1, categoryLevel2, page) => {
        return dispatch(GetDesignListRequest(sort, categoryLevel1, categoryLevel2, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignListContainer);
