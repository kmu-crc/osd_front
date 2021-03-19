import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetLikeInMakerRequest } from "actions/Maker";
import PagingList from "components/Commons/PagingList";
import Expert_small from "components/Experts/Expert_small";
import styled from "styled-components";
import { Pagination } from 'semantic-ui-react'

const Board = styled.div`
  margin:-20px -50px -20px -50px;
  .title_{
    font-family:Noto Sans KR;
    margin-left:38px;
    font-size:18px;
    color:black;
    margin-bottom:20px;
  }
  .pagenation{
    display:flex;
    justify-content:center;
  }
`
class LikeInMakerContainer extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      page:0,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentWillMount() {
    this.props.GetLikeInMakerRequest(this.props.id, 0);
  }

  getList = (page) => {
    return this.props.GetLikeInMakerRequest(this.props.id, page);
  }
  goPage = async (pagenum) => {
    await this.setState({ page:pagenum });
    this.props.GetLikeInMakerRequest(this.props.id, pagenum);
  };
  render() {
    console.log("test-----",this.props);
    const { page } = this.state;
    const lastPage = parseInt(this.props.allPage / 8, 10);
    return(
      <Board>
      <div className="title_">관심 메이커</div>
      <PagingList getListRequest={this.getList}
                    type="sales_Expert"
                    ListComponent={Expert_small}
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
                    mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={2} customClass="largeCustom"/>
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

const mapStateToProps = (state) => {
  return {
    dataList: state.MakerDetail.status.LikeInMaker,
    dataListAdded: state.MakerDetail.status.LikeInMakerAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetLikeInMakerRequest: (id, page) => {
        return dispatch(GetLikeInMakerRequest(id, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeInMakerContainer);
