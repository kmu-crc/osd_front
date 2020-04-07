import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyMainDesignListRequest } from "redux/modules/personal";
import ScrollList from "components/Commons/ScrollList";
import opendesign_style from 'opendesign_style';
import styled from 'styled-components';

const Head = styled.div`
  color: ${opendesign_style.color.grayScale.scale7};
  font-size: ${opendesign_style.font.size.heading2};
  text-align: center;
  margin-bottom: 25px;
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
        {this.props.MyMainDesignAdded && this.props.MyMainDesignAdded.length > 0 ? <Head>내디자인 / 관심디자인</Head> : null}
        <ScrollList
          {...opendesign_style.design_margin}
          getListRequest={this.getList}
          type="design"
          dataList={this.props.MyMainDesign}
          dataListAdded={this.props.MyMainDesignAdded}
        />
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
