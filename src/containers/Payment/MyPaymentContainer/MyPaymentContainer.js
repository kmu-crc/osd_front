import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyPaymentRequest } from "actions/Payment";
import Item_myDetail from "components/Items/Item_myDetail";
import PagingList from "components/Commons/PagingList";
import styled from "styled-components";
import { Pagination } from 'semantic-ui-react'

const Board = styled.div`
  margin:-20px -50px -20px -50px;
  display:flex;
  flex-direction:column;
  .title_{
    font-family:Noto Sans KR;
    font-size:18px;
    color:black;
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .lineBox{
    width:100%;
    padding:6px 38px 10px 38px;
    .line{
      width:100%;
      border:1px solid #efefef;
    }
  }
  .pagenation{
    display:flex;
    justify-content:center;
  }
`
class MyPaymentContainer extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      page:0,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentWillMount() {
    this.props.GetMyPaymentRequest(this.props.token, 0);
  }

  getList = (page) =>
    this.props.GetMyPaymentRequest(this.props.token, page);

  goPage = async (pagenum) => {
      await this.setState({ page:pagenum });
      this.props.GetMyPaymentRequest(this.props.token, pagenum);
  };
  render() {
    const { page } = this.state;
    const lastPage = parseInt(this.props.allPage / 6, 10);
    return (
      <Board>
      <div className="title_">구입 아이템</div>
      <div className="lineBox"><div className="line"/></div>
      <PagingList
        getListRequest={this.getList}
        ListComponent={Item_myDetail}
        type="sales"
        isSmall={true}
        dataList={this.props.dataList}
        dataListAdded={this.props.dataListAdded} />
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
  dataList: state.Payment.status.MyPayment,
  dataListAdded: state.Payment.status.MyPaymentAdded,
});
const mapDispatchToProps = (dispatch) => ({
  GetMyPaymentRequest: (token, page) => dispatch(GetMyPaymentRequest(token, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPaymentContainer);
