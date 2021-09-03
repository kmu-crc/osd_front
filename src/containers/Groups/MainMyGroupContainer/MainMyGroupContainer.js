import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyMainGroupListRequest } from "redux/modules/personal";
import ScrollList from "components/Commons/ScrollList";
import opendesign_style from 'opendesign_style';
import styled from 'styled-components';

const Head = styled.div`
  font: normal normal bold 23px/34px Noto Sans KR;
  color: ${opendesign_style.color.grayScale.scale7};
  // font-size: ${opendesign_style.font.size.heading2};
  line-height: ${opendesign_style.font.size.heading2};
  text-align: center;
  margin-top: 27px;
  margin-bottom: 27px;
`
// const ScrollListContainer = styled.div`
//  padding-left:20px;
// `
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
    // console.log("groups:", this.props.MyMainGroupAdded)

    return (
      <React.Fragment>
        {this.props.MyMainGroupAdded && this.props.MyMainGroupAdded.length > 0 ? <Head>내그룹 | 관심그룹</Head> : null}
        {/* <ScrollListContainer> */}
        <ScrollList
          height={"max-content"}
          {...opendesign_style.group_margin}
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
