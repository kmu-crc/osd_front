import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyPaymentRequest } from "actions/Payment";
import Item_myDetail_mobile from "components/Items/Item_myDetail_mobile";
import PagingList_mobile from "mobileComponents/PagingList_mobile";
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
class MyPaymentContainer_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0, per: 6,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentWillMount() {
    this.props.GetMyPaymentRequest(this.props.token, 0);
  }

  getList = (page) =>
    this.props.GetMyPaymentRequest(this.props.token, page);

  goPage = async (pagenum) => {
    await this.setState({ page: pagenum });
    this.props.GetMyPaymentRequest(this.props.token, pagenum);
  };
  render() {
    const { page, per } = this.state;
    const lastPage = parseInt((this.props.allPage / per) + (this.props.allPage % per ? 1 : 0), 10);
    console.log(this.props);
    return (
      <Wrapper>
        <div className="header">구입 아이템</div>
        <PagingList_mobile
          getListRequest={this.getList}
          ListComponent={Item_myDetail_mobile}
          type="sales"
          isSmall={true}
          dataList={this.props.dataList}
          dataListAdded={this.props.dataListAdded} />
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
        }
      </Wrapper>

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

export default connect(mapStateToProps, mapDispatchToProps)(MyPaymentContainer_mobile);
