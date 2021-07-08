import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetMyDesignerRequestListRequest } from "actions/Request";
import styled from "styled-components";
import market_style from "market_style";
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

class MyUploadDesignReqBoardContainer_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0, per: 10,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentDidMount() {
    this.props.GetMyDesignerRequestListRequest(this.props.id, 0);
  }
  getList = page =>
    this.props.GetMyDesignerRequestListRequest(this.props.id, page);
  goPage = async (pagenum) => {
    await this.setState({ page: pagenum });
    this.props.GetMyDesignerRequestListRequest(this.props.id, pagenum);
  };
  render() {
    const { page, per } = this.state;
    const lastPage = parseInt((this.props.allPage / per) + (this.props.allPage % per ? 1 : 0), 10);
    return (
      <Wrapper>
        <div className="header">디자인 의뢰</div>
        {this.props.Count!=0?<div className="line"/>:null}
        <ScrollBoardList_mobile
        total={this.props.Count}
        dataList={this.props.dataList}
        dataListAdded={this.props.dataListAdded}
        getListRequest={this.getList}
        ListComponent={RequestListElement_mobile}
        type={"request"}
       />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  dataList: state.RequestList.status.List,
  dataListAdded: state.RequestList.status.ListAdded,
  Count: state.RequestList.status.Total
});
const mapDispatchToProps = (dispatch) => ({
  GetMyDesignerRequestListRequest: (id, page) => dispatch(GetMyDesignerRequestListRequest(id, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyUploadDesignReqBoardContainer_mobile);
