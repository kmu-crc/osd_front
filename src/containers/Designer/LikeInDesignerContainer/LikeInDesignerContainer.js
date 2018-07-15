import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetLikeInDesignerRequest } from "actions/Designer";
import ScrollList from "components/Commons/ScrollList";
import Design from "components/Designs/Design";

class LikeInDesignerContainer extends Component {
  componentWillMount() {
    this.props.GetLikeInDesignerRequest(this.props.match.params.id, 0);
  }

  getList = (page) => {
    return this.props.GetLikeInDesignerRequest(this.props.match.params.id, page);
  }

  render() {
    return(
      <div>
        <ScrollList getListRequest={this.getList} 
                    ListComponent={Design} 
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} 
                    mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={2} customClass="largeCustom"/>
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
