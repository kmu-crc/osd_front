import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetLikeInItemRequest } from "actions/Product";
import PagingList from "components/Commons/PagingList";
import Item_myDetail from "components/Items/Item_myDetail";
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
class LikeInItemContainer extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      page:0,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentWillMount() {
    this.props.GetLikeInItemRequest(this.props.id, 0);
  }

  getList = (page) => {
    return this.props.GetLikeInItemRequest(this.props.id, page);
  }
  goPage = async (pagenum) => {
    await this.setState({ page:pagenum });
    this.props.GetLikeInItemRequest(this.props.id, pagenum);
  };
  render() {
    console.log("test-----",this.props);
    const { page } = this.state;
    const lastPage = parseInt(this.props.allPage / 6, 10);
    return(
      <Board>
      <div className="title_">관심 아이템</div>
      <div className="lineBox"><div className="line"/></div>

      <PagingList getListRequest={this.getList}
                    type="sales"
                    ListComponent={Item_myDetail}
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

    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.ItemDetail.status.LikeInItem,
    dataListAdded: state.ItemDetail.status.LikeInItemAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetLikeInItemRequest: (id, page) => {
        return dispatch(GetLikeInItemRequest(id, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeInItemContainer);
