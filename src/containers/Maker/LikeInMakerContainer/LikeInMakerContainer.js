import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetLikeInMakerRequest } from "actions/Maker";
import ScrollList from "components/Commons/ScrollList";
import Expert from "components/Experts/Expert";

class LikeInMakerContainer extends Component {
  componentWillMount() {
    this.props.GetLikeInMakerRequest(this.props.id, 0);
  }

  getList = (page) => {
    return this.props.GetLikeInMakerRequest(this.props.id, page);
  }

  render() {
    console.log("test-----",this.props);
    return(
      <div>
        <ScrollList getListRequest={this.getList}
                    type="maker"
                    ListComponent={Expert}
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
                    mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={2} customClass="largeCustom"/>
                    
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.MakerDetail.status.LikeInMaker,
    dataListAdded: state.MakerDetail.status.LikeInMakerAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetLikeInMakerRequest: (id, page) => {
        return dispatch(GetLikeInMakerRequest(id, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeInMakerContainer);
