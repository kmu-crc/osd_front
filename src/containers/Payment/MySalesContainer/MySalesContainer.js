import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMySalesRequest } from "actions/Payment";
import ScrollBoardList from "components/Commons/ScrollBoardList";
import ScrollList from "components/Commons/ScrollList";
import PaymentListElement from "containers/Payment/PaymentListElement";
import styled from "styled-components";
import market_style from "market_style";

const ListElement = styled.div`
  width: 100%;
  margin: 0 auto 0.9rem;
  font-size:${market_style.font.size.mini2};
  border-radius: 3px 3px 3px 3px;
  overflow: hidden;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  text-align: left;
  box-sizing: border-box;
  padding: 10px;
  list-style: none;
  display: flex;
  fiex-direction: row;
  .title{
    min-width:67%;
    display:flex;
    align-items:center;
    padding:5px;
    // padding-left:15px;
  }
  .writer{
    min-width:10%;
    display:flex;
    align-items:center;
    padding:5px;
    overflow:hidden;
    // padding-left:15px;
  }
  .date{
    min-width:20%;
    align-items:center;
    padding:5px;
    // padding-left:15px;
  }
`;

class MySalesContainer extends Component {
  componentWillMount() {
    this.props.GetMySalesRequest(this.props.token, 0);
  }

  getList = (page) =>
    this.props.GetMySalesRequest(this.props.token, page);


  render() {
    console.log(this.props);
    return (
      <React.Fragment>
      <ListElement>
            {/* no.    <div style={{ marginRight: "15px" }}>번호</div> */}
            {/* title   */}<div className="title">판매 아이템</div>
            {/* writer  */}<div className="writer">구매자</div>
            {/* date    */}<div className="date">판매일</div>
            {/* {/* view    <div style={{ marginRight: "15px" }}>조회수</div> */}
            {/* {/* like    <div style={{ marginRight: "15px" }}>좋아요</div> */}
      </ListElement>
      <ScrollBoardList
      total={this.props.Count}
      dataList={this.props.dataList}
      getListRequest={this.getList}
      ListComponent={PaymentListElement}
    />
    </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  dataList: state.Payment.status.MySales,
  dataListAdded: state.Payment.status.MySalesAdded,
});
const mapDispatchToProps = (dispatch) => ({
  GetMySalesRequest: (token, page) => dispatch(GetMySalesRequest(token, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MySalesContainer);
