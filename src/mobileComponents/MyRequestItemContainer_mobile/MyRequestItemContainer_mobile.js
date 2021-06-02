import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyRequestItemRequest, UpdatePaymentRequest } from "actions/Payment";
import Item_myDetail_mobile from "components/Items/Item_myDetail_mobile";
import PagingList_mobile from "mobileComponents/PagingList_mobile";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import styled from "styled-components";
import { Pagination } from 'semantic-ui-react'
import market_style from "market_style";


const Wrapper = styled.div`
  max-width:375px;
  width:100%;
  padding:0px 0px 10px 10px;
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
`
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
class MyRequestItemContainer_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0, per: 6,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentWillMount() {
    this.props.GetMyRequestItemRequest(this.props.token, 0);
  }
  getList = (page) =>
    this.props.GetMyRequestItemRequest(this.props.token, page);

  goPage = async (pagenum) => {
    await this.setState({ page: pagenum });
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
    const { page, per } = this.state;
    const lastPage = parseInt((this.props.allPage / per) + (this.props.allPage % per ? 1 : 0), 10);
    return (
      <Wrapper>
        <div className="header">의뢰 아이템</div>
        <PagingList_mobile
          getListRequest={this.getList}
          ListComponent={Item_myDetail_mobile}
          confirm={this.confirm}
          type="sales"
          dataList={this.props.dataList}
          dataListAdded={this.props.dataListAdded} />
        {
          lastPage == 1 ? null :
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
        }
      </Wrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestItemContainer_mobile);
