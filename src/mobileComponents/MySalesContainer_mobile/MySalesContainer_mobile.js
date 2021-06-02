import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMySalesRequest } from "actions/Payment";
import ScrollBoardList from "components/Commons/ScrollBoardList";
import ScrollList from "components/Commons/ScrollList";
import PaymentListElement from "containers/Payment/PaymentListElement";
import styled from "styled-components";
import market_style from "market_style";
import { Pagination } from 'semantic-ui-react'
import ScrollBoardList_mobile from "mobileComponents/ScrollBoardList_mobile";
import RequestListElement_mobile from "components/Request/RequestListElement_mobile";

const Wrapper = styled.div`
  max-width:375px;
  width:100%;
  padding:0px 10px 10px 10px;
  .header{
    width:100%;
    font-size:${market_style.font.size.normal3};
    font-weight:800;
    color:#c1c1c1;
    text-align:center;
    margin-bottom:10px;
    margin-top:1px;
  }
  .pagenation{
    display:flex;
    justify-content:center;
  }
  .line{
    border-top:1px solid #e9e9e9;
  }
`


class MySalesContainer_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0, per: 10,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentWillMount() {
    this.props.GetMySalesRequest(this.props.token, 0);
  }

  getList = (page) =>
    this.props.GetMySalesRequest(this.props.token, page);

  goPage = async (pagenum) => {
    await this.setState({ page: pagenum });
    this.props.GetMySalesRequest(this.props.token, pagenum);
  };
  render() {
    const { page, per } = this.state;
    const lastPage = parseInt((this.props.allPage / per) + (this.props.allPage % per ? 1 : 0), 10);
    return (
      <Wrapper>
        <div className="header">판매 아이템</div>
        <div className="line"/>
        <ScrollBoardList_mobile
        total={this.props.Count}
        dataList={this.props.dataList}
        dataListAdded={this.props.dataListAdded}
        getListRequest={this.getList}
        ListComponent={RequestListElement_mobile}
        type={"payment"}
       />
      </Wrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(MySalesContainer_mobile);



        {/* <div className="lineBox"><div className="line" /></div> */}
        {/* <ListElement>
          <div className="title">제목</div>
          <div className="writer">글쓴이</div>
          <div className="date">작성일</div>
        </ListElement>
        <ScrollBoardList
          total={this.props.Count}
          dataList={this.props.dataList}
          getListRequest={this.getList}
          ListComponent={PaymentListElement}
        />
        {
          lastPage == 0 ? null :
            <div className="pagenation">
              <Pagination
                activePage={page + 1}
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={lastPage}
                // pointing
                secondary
                onPageChange={(event, { activePage }) => {
                  this.goPage(activePage - 1);
                }}
              />
            </div>
        } */}
