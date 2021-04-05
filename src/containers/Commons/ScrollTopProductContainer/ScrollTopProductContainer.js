import React, { Component } from "react";
import { connect } from "react-redux";
import { GetTopItemListRequest } from "actions/Commons/TopList";
import ScrollList from "components/Commons/ScrollList";
import Loading from "components/Commons/Loading";
import Item from "components/Items/Item";
import styled from "styled-components"

const Wrapper_itemlist = styled.div`
padding-left:8px;
`

class ScrollTopProductContainer extends Component {
  componentWillMount() {
    this.props.GetTopItemListRequest(0);
  }
  getList = page => {
    return this.props.GetTopItemListRequest(page);
  }
  render() {
    // console.log(this.props);
    
    return (
      this.props.status === "INIT" ? <Loading /> :
        <Wrapper_itemlist>
        <ScrollList
          cols={6} type="item" getListRequest={this.getList} ListComponent={Item}
          dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} />
        </Wrapper_itemlist>
    );
  }
};

const mapStateToProps = (state) => ({
  dataList: state.TopList.status.ItemList,
  dataListAdded: state.TopList.status.ItemListAdded,
  status: state.TopList.TopList.status
});

const mapDispatchToProps = (dispatch) => ({
  GetTopItemListRequest: (page) => dispatch(GetTopItemListRequest(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTopProductContainer);
