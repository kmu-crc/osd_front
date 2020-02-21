import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetLikeInItemRequest } from "actions/Product";
import ScrollList from "components/Commons/ScrollList";
import Item from "components/Items/Item";

class LikeInItemContainer extends Component {
  componentWillMount() {
    this.props.GetLikeInItemRequest(this.props.id, 0);
  }

  getList = (page) => {
    return this.props.GetLikeInItemRequest(this.props.id, page);
  }

  render() {
    console.log("test-----",this.props);
    return(
      <div>
        <ScrollList getListRequest={this.getList}
                    type="item"
                    ListComponent={Item}
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
                    mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={2} customClass="largeCustom"/>
      {/* <ScrollList
          type="item"
          getListRequest={this.getList}
          ListComponent={Item}
          dataList={this.props.dataList}
          dataListAdded={this.props.dataListAdded}
          /> */}
                    
      </div>

      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.ItemDetail.status.LikeInItem,
    dataListAdded: state.ItemDetail.status.LikeInItemAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetLikeInItemRequest: (id, page) => {
        return dispatch(GetLikeInItemRequest(id, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeInItemContainer);
