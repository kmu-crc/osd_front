import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyDesignListRequest } from "actions/Users/MyDetail";
import ScrollList from "components/Commons/ScrollList";
import Design from "components/Designs/Design";

class MyDesignContainer extends Component {
  componentWillMount(){
    this.props.GetMyDesignListRequest(this.props.token, 0);
  }

  getList = (page) => {
    return this.props.GetMyDesignListRequest(this.props.token, page);
  }

  render() {
    return(
      <div>
        <ScrollList getListRequest={this.getList}
                    ListComponent={Design}
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
                    mobile={8} tablet={8} computer={8} largeScreen={5} customClass="largeCustom"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.MyDetail.status.MyDesign,
    dataListAdded: state.MyDetail.status.MyDesignAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDesignListRequest: (token, page) => {
      return dispatch(GetMyDesignListRequest(token, page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDesignContainer);
