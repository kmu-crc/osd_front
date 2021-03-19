import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMySalesRequest } from "actions/Payment";
import ScrollBoardList from "components/Commons/ScrollBoardList";
import ScrollList from "components/Commons/ScrollList";
import PaymentListElement from "containers/Payment/PaymentListElement";
import styled from "styled-components";
import market_style from "market_style";
import { Pagination } from 'semantic-ui-react'

const Board = styled.div`
  margin:-20px -12px -20px -12px;
  .title_{
    font-family:Noto Sans KR;
    font-size:18px;
    color:black;
  }
  .hrline{
    width:100%;
    border:2px solid #EFEFEF;
    margin-top:10px;
    margin-bottom:10px;
  }
  .pagenation{
    display:flex;
    justify-content:center;
  }
`
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
`;

class MySalesContainer extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      page:0,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentWillMount() {
    this.props.GetMySalesRequest(this.props.token, 0);
  }

  getList = (page) =>
    this.props.GetMySalesRequest(this.props.token, page);

  goPage = async (pagenum) => {
      await this.setState({ page:pagenum });
      this.props.GetMySalesRequest(this.props.token, pagenum);
  };
  render() {
    const { page } = this.state;
    const lastPage = parseInt(this.props.allPage / 10, 10);
    return (
      <Board>
      <div className="title_">판매 아이템</div>
      <div className="hrline"/>
      <ScrollBoardList
      total={this.props.Count}
      dataList={this.props.dataList}
      getListRequest={this.getList}
      ListComponent={PaymentListElement}
    />
    {
    lastPage==0?null:
    <div className="pagenation">
    <Pagination
      activePage={page + 1}
      boundaryRange={0}
      defaultActivePage={1}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      siblingRange={1}
      totalPages={lastPage + 1}
      // pointing
      secondary
      onPageChange={(event, { activePage }) => {
        this.goPage(activePage - 1);
      }}
    />
    </div>
    }
    </Board>
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
