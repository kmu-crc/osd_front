import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGalleryListDetailRequest } from "actions/Gallery";
import ScrollList from "components/Commons/ScrollList";
import Item from "components/Items/Item";

class ItemInGalleryContainer extends Component {
  componentWillMount() {
    this.props.GetGalleryListDetailRequest(this.props.id, 0);
  }

  getList = (page) => {
    return this.props.GetGalleryListDetailRequest(this.props.id, page);
  }

  render() {
    return(
      <div>
        <ScrollList
          cols={6} type="item" getListRequest={this.getList} ListComponent={Item}
          dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} />
      </div>

      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.GalleryList.status.HaveInGalleryItem,
    dataListAdded: state.GalleryList.status.HaveInGalleryItemAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetGalleryListDetailRequest: (id, page) => {
        return dispatch(GetGalleryListDetailRequest(id, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemInGalleryContainer);
