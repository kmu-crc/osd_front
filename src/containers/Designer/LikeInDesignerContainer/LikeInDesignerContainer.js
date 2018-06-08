import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetLikeInDesignerRequest } from "actions/Designer";
import ScrollList from "components/Commons/ScrollList";
import Design from "components/Designs/Design";

class LikeInDesignerContainer extends Component {
  // componentWillMount() {
  //   this.props.GetLikeInDesignerRequest(this.props.match.params.id);
  // }

  getList = (page) => {
    return this.props.GetLikeInDesignerRequest(this.props.match.params.id, page);
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
    dataList: state.DesignerDetail.status.LikeInDesigner,
    dataListAdded: state.DesignerDetail.status.LikeInDesignerAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetLikeInDesignerRequest: (id, page) => {
        return dispatch(GetLikeInDesignerRequest(id, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeInDesignerContainer);
