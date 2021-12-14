import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyMainDesignListRequest } from "redux/modules/personal";
import ScrollList from "components/Commons/ScrollListNew";
import ScrollList_mobile from "components/Commons/ScrollListNew_mobile";
import Design from "components/Designs/Design";
import styled from "styled-components";
import opendesign_style from 'opendesign_style';
import opendesign_mobile_style from "opendesign_mobile_style";
import Design_mobile_mini from "components/Designs/Design_mobile_mini";

const Head = styled.div`
  width: 100%;
  max-width: 1920px;
  // min-width: 1000px;
  font-weight: bold;
  font-size: 23px;
  line-height: 34px;
  font-family: Noto Sans KR;
  color: ${opendesign_style.color.grayScale.scale7};
  text-align: center;
  // margin-top: 27px;
  // margin-bottom: 27px;
  padding-top: 27px;
  padding-bottom: 27px;
`;
const Head_mobile = styled.div`
    width:100%;
    height:32px;
    display:flex;
    align-items:center;
    justify-content:center;

    font: normal normal normal 20px/28px Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #707070;
`
const Board_mobile = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    .list_box{
        width:335px;
        height:${props=>props.height}px;
        overflow:hidden;    
    }
`
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
      {
        window.innerWidth<500?
        <React.Fragment>
        {/* title */}
        {this.props.MyMainDesignAdded &&
          (this.props.MyMainDesignAdded.length > 0)
          ? <Head_mobile>내 디자인 | 관심 디자인</Head_mobile>
          : null}

        {/* scroll */}
        <Board_mobile height={355}>
        <div className="list_box">
        <ScrollList_mobile
          row={17}
          col={17}
          height={"max-content"}
          width={width}
          type="design"
          ListComponent={Design_mobile_mini}
          getListRequest={this.getList}
          dataList={this.props.MyMainDesign}
          dataListAdded={this.props.MyMainDesignAdded} />
        </div>
        </Board_mobile>
        </React.Fragment>
        :
        <React.Fragment>
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
        </React.Fragment>
      }


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
