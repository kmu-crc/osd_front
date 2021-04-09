import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyRequestItemRequest, UpdatePaymentRequest } from "actions/Payment";
import Item_myDetail from "components/Items/Item_myDetail";
import PagingList from "components/Commons/PagingList";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
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
class MyRequestItemContainer extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      page:0,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentWillMount() {
    this.props.GetMyRequestItemRequest(this.props.token, 0);
  }
  getList = (page) =>
    this.props.GetMyRequestItemRequest(this.props.token, page);

  goPage = async (pagenum) => {
      await this.setState({ page:pagenum });
      this.props.GetMyRequestItemRequest(this.props.token, pagenum);
  };
  confirm = (id) => {
    this.props.UpdatePaymentRequest(id, this.props.token)
      .then(async res => {
        if (res.success) {
          await alert("구입이 완료되었습니다.");
          window.location.reload();
        }
      })
  }

  render() {
    const { page } = this.state;
    const lastPage = parseInt(this.props.allPage / 6, 10);
    return (
      <Board>
      <div className="title_">의뢰 아이템</div>
      <div className="lineBox"><div className="line"/></div>
      <PagingList
        getListRequest={this.getList}
        ListComponent={Item_myDetail}
        confirm={this.confirm}
        type="sales"
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
  dataList: state.Payment.status.MyRequestItem,
  dataListAdded: state.Payment.status.MyRequestItemAdded,
});
const mapDispatchToProps = (dispatch) => ({
  GetMyRequestItemRequest: (token, page) => dispatch(GetMyRequestItemRequest(token, page)),
  UpdatePaymentRequest: (id, token) => dispatch(UpdatePaymentRequest(id, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestItemContainer);
