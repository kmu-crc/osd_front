import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyMainDesignListRequest } from "redux/modules/personal";
import ScrollList from "components/Commons/ScrollListNew";
import Design from "components/Designs/Design";

class MainMyDesignContainer extends Component {
  componentWillMount() {
    const { token } = this.props;
    token && this.props.GetMyMainDesignListRequest(token, 0);
  }

  getList = (page) =>
    this.props.token &&
    this.props.GetMyMainDesignListRequest(
      this.props.token, page);

  render() {
    const { Head, width } = this.props;

    return (<React.Fragment>

      {/* title */}
      {this.props.MyMainDesignAdded &&
        (this.props.MyMainDesignAdded.length > 0)
        ? <Head>내 디자인 | 관심 디자인</Head>
        : null}

      {/* scroll */}
      <ScrollList
        height={"max-content"}
        width={width}
        type="design"
        ListComponent={Design}
        getListRequest={this.getList}
        dataList={this.props.MyMainDesign}
        dataListAdded={this.props.MyMainDesignAdded} />

    </React.Fragment>);
  }
}

const mapStateToProps = (state) => ({
  MyMainDesign: state.Personal.status.MyMainDesign,
  MyMainDesignAdded: state.Personal.status.MyMainDesignAdded,
  token: state.Authentication.status.token,
});

const mapDispatchToProps = (dispatch) => ({
  GetMyMainDesignListRequest: (token, page) => (dispatch(GetMyMainDesignListRequest(token, page))),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMyDesignContainer);
