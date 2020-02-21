import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetHaveInItemRequest } from "actions/Product";
import ScrollList from "components/Commons/ScrollList";
import Item from "components/Items/Item";

class HaveInItemContainer extends Component {
  componentWillMount() {
    this.props.GetHaveInItemRequest(this.props.id, 0);
  }

  getList = (page) => {
    return this.props.GetHaveInItemRequest(this.props.id, page);
  }

  render() {
    console.log("test-----",this.props);
    return(
      <div>
        <ScrollList
          cols={6} type="item" getListRequest={this.getList} ListComponent={Item}
          dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} />
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
    dataList: state.ItemDetail.status.HaveInItem,
    dataListAdded: state.ItemDetail.status.HaveInItemAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetHaveInItemRequest: (id, page) => {
        return dispatch(GetHaveInItemRequest(id, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HaveInItemContainer);
