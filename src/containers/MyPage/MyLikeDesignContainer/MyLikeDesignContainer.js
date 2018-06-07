import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyLikeDesignRequest } from "actions/Users/MyDetail";
import ScrollList from "components/Commons/ScrollList";
import Design from "components/Designs/Design";

class MyLikeDesignContainer extends Component {

  getList = (page) => {
    return this.props.GetMyLikeDesignRequest(this.props.location.state.token, page);
  }

  render() {
    return(
      <div>
        <ScrollList getListRequest={this.getList} 
                    ListComponent={Design} 
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} 
                    mobile={8} tablet={8} computer={5} largeScreen={4} widescreen={4} customClass="largeCustom"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.MyDetail.status.MyLikeDesign,
    dataListAdded: state.MyDetail.status.MyLikeDesignAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyLikeDesignRequest: (token, page) => {
      return dispatch(GetMyLikeDesignRequest(token, page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLikeDesignContainer);
