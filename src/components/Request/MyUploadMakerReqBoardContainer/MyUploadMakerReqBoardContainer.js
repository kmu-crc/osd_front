import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetMyMakerRequestListRequest } from "actions/Request";
import DesignerRequestBoard from "components/Request/DesignerRequestBoard";
import styled from "styled-components";
import { Pagination } from 'semantic-ui-react'

const Board = styled.div`
  margin:-20px 0px -20px 0px;
  .title__{
    font-family:Noto Sans KR;
    font-size:18px;
    color:black;
    margin-bottom:20px;
  }
  .pagenation{
    display:flex;
    justify-content:center;
  }
`
class MyUploadMakerReqBoardContainer extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      page:0,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentDidMount() {
    this.props.GetMyMakerRequestListRequest(this.props.id, 0);
  }
  getList = page =>
    this.props.GetMyMakerRequestListRequest(this.props.id, page);
  goPage = async (pagenum) => {
      await this.setState({ page:pagenum });
      this.props.GetMyMakerRequestListRequest(this.props.id, pagenum);
  };
  render() {
    const { page } = this.state;
    const lastPage = parseInt(this.props.allPage / 10, 10);
    return (
      <Board>
      <div className="title__">제작 의뢰</div>
      <DesignerRequestBoard getList={this.getList} {...this.props} />
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
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  dataList: state.RequestList.status.List,
  Count: state.RequestList.status.Total
});
const mapDispatchToProps = (dispatch) => ({
  GetMyMakerRequestListRequest: (id, page) => dispatch(GetMyMakerRequestListRequest(id, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyUploadMakerReqBoardContainer);
