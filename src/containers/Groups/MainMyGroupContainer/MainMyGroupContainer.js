import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyMainGroupListRequest } from "redux/modules/personal";
import ScrollList from "components/Commons/ScrollListNew";
import ScrollList_mobile from "components/Commons/ScrollListNew_mobile";

import Group from "components/Groups/Group";
import Group_mobile from "components/Groups/Group_mobile";
import styled from "styled-components";

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
        {
        window.innerWidth<500?
        <React.Fragment>
          {/* title */}
          {this.props.MyMainGroupAdded &&
            this.props.MyMainGroupAdded.length > 0
            ? <Head_mobile>내그룹 | 관심그룹</Head_mobile>
            : null}
  
          {/* scroll */}
  
          {/* <ScrollListContainer> */}
          <Board_mobile height={355}>
            <div className="list_box">
              <ScrollList_mobile
                ListComponent={Group_mobile}
                width={width}
                height={"max-content"}
                getListRequest={this.getList}
                type="group"
                dataList={this.props.MyMainGroup}
                dataListAdded={this.props.MyMainGroupAdded}
              />
            </div>
          </Board_mobile>
          {/* </ScrollListContainer> */}
        </React.Fragment>
        :
        <React.Fragment>
          {/* title */}
          {this.props.MyMainGroupAdded &&
            this.props.MyMainGroupAdded.length > 0
            ? <Head>내그룹 | 관심그룹</Head>
            : null}
          <ScrollList
            ListComponent={Group}
            width={width}
            height={"max-content"}
            getListRequest={this.getList}
            type="group"
            dataList={this.props.MyMainGroup}
            dataListAdded={this.props.MyMainGroupAdded}
          />
        </React.Fragment>
        }
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
