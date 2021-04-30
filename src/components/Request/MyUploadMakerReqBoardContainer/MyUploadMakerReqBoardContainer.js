import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetMyMakerRequestListRequest } from "actions/Request";
import DesignerRequestBoard from "components/Request/DesignerRequestBoard";
import styled from "styled-components";
import { Pagination } from 'semantic-ui-react'
import market_style from "market_style";

const Board = styled.div`
  margin:-20px -12px -20px -12px;
  .title__{
    font-family:Noto Sans KR;
    font-size:18px;
    color:black;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .lineBox{
    width:100%;
    padding:10px 0px;
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
const ListElement = styled.div`
  width:100%;
  height:36px;
  border: 1px solid #eaeaea;
  padding:6px 54px 6px 54px;
  display:flex;
  margin-bottom:10px;
  .title{
    min-width:75%;
    display:flex;
    align-items:center;
    font-size:${market_style.font.size.small1};
  }
  .writer{
    min-width:21%;
    display:flex;
    align-items:center;
    font-size:${market_style.font.size.small1};
  }
  .date{
    min-width:5%;
    display:flex; 
    justify-content:center;
    align-items:center;
    font-size:${market_style.font.size.small1};
    }
`;
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
      <div className="lineBox"><div className="line"/></div>
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
          totalPages={lastPage}
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
