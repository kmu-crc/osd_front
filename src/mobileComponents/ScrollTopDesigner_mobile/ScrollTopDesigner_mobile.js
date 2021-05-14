import React, { Component } from "react";
import { connect } from "react-redux";
import { GetTopExpertListRequest } from "actions/Commons/TopList";
import ScrollList from "mobileComponents/ScrollListHorizontal_mobile/ScrollListHorizontal_mobile";
import Expert_mobile from "components/Experts/Expert_mobile";
import Loading from "components/Commons/Loading";

class ScrollTopDesigner_mobile extends Component {
  async componentWillMount() {
    await this.props.GetTopExpertListRequest();
  }

  render() {
    // console.log(this.props.dataList);
    return (
      this.props.status === "INIT"
        ? <Loading />
        : <ScrollList ListComponent={Expert_mobile} dataList={this.props.dataList&&this.props.dataList.concat(this.props.dataList)} />
    );
  }
}

const mapStateToProps = (state) => ({
  dataList: state.TopList.status.ExpertList,
  status: state.TopList.ExpertList.status,
});

const mapDispatchToProps = (dispatch) => ({
  GetTopExpertListRequest: () => dispatch(GetTopExpertListRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTopDesigner_mobile);
