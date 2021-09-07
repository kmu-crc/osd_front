import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyMainDesignListRequest } from "redux/modules/personal";
// import ScrollList from "components/Commons/ScrollList";
import ScrollList from "components/Commons/ScrollList";
import opendesign_style from 'opendesign_style';
import styled from 'styled-components';

const Head = styled.div`
  font: normal normal bold 23px/34px Noto Sans KR;
  color: ${opendesign_style.color.grayScale.scale7};
  // font-size: ${opendesign_style.font.size.heading2};
  line-height: ${opendesign_style.font.size.heading2};
  text-align: center;
  margin-top: 30px;
  margin-bottom: 27px;
`;

class MainMyDesignContainer extends Component {
  componentWillMount() {
    this.props.token &&
      this.props.GetMyMainDesignListRequest(
        this.props.token, 0);
  }

  getList = (page) =>
    this.props.token &&
    this.props.GetMyMainDesignListRequest(
      this.props.token, page);

  render() {
    return (
      <React.Fragment>
        {this.props.MyMainDesignAdded &&
          (this.props.MyMainDesignAdded.length > 0)
          ? <Head>내 디자인 | 관심 디자인</Head>
          : null}
        {/* <ScrollListContainer> */}
        <ScrollList
          height={"max-content"}
            {...opendesign_style.design_margin}
            getListRequest={this.getList}
          type="design"
          dataList={this.props.MyMainDesign}
          dataListAdded={this.props.MyMainDesignAdded}
        />
        {/* </ScrollListContainer> */}
      </React.Fragment>
    );
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
