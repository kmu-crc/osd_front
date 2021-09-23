import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyMainGroupListRequest } from "redux/modules/personal";
import ScrollList from "components/Commons/ScrollListNew";

class MainMyGroupContainer extends Component {
  componentWillMount() {
    this.props.token &&
      this.props.GetMyMainGroupListRequest(
        this.props.token, 0);
  }

  getList = (page) =>
    this.props.token &&
    this.props.GetMyMainGroupListRequest(
      this.props.token, page);

  render() {
    const { Head, width } = this.props;

    return (
      <React.Fragment>
        {/* title */}
        {this.props.MyMainGroupAdded &&
          this.props.MyMainGroupAdded.length > 0
          ? <Head>내그룹 | 관심그룹</Head>
          : null}

        {/* scroll */}

        {/* <ScrollListContainer> */}
        <ScrollList
          width={width}
          height={"max-content"}
          getListRequest={this.getList}
          type="group"
          dataList={this.props.MyMainGroup}
          dataListAdded={this.props.MyMainGroupAdded}
        />
        {/* </ScrollListContainer> */}
      </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => ({
  MyMainGroup: state.Personal.status.MyMainGroup,
  MyMainGroupAdded: state.Personal.status.MyMainGroupAdded,
  token: state.Authentication.status.token,
});

const mapDispatchToProps = (dispatch) => ({
  GetMyMainGroupListRequest: (token, page) => (dispatch(GetMyMainGroupListRequest(token, page))),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMyGroupContainer);
