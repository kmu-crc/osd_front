import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetLikeInDesignerRequest } from "actions/Designer";
import PagingList from "components/Commons/PagingList";
import Expert_small from "components/Experts/Expert_small";
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
class LikeInDesignerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0, per: 8
    }
    this.goPage = this.goPage.bind(this);
  }
  componentWillMount() {
    this.props.GetLikeInDesignerRequest(this.props.id, 0);
  }

  getList = (page) => {
    return this.props.GetLikeInDesignerRequest(this.props.id, page);
  }

  goPage = async (pagenum) => {
    await this.setState({ page: pagenum });
    this.props.GetLikeInDesignerRequest(this.props.id, pagenum);
  };
  render() {
    const { page, per } = this.state;
    const lastPage = parseInt((this.props.allPage / per) + (this.props.allPage % per ? 1 : 0), 10);
    return (
      <Board>
        <div className="title_">관심 디자이너</div>
        <div className="lineBox"><div className="line" /></div>

        <PagingList getListRequest={this.getList}
          type="designer"
          ListComponent={Expert_small}
          dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
          mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={2} customClass="largeCustom" />
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
      </Board>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.DesignerDetail.status.LikeInDesigner,
    dataListAdded: state.DesignerDetail.status.LikeInDesignerAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetLikeInDesignerRequest: (id, page) => {
      return dispatch(GetLikeInDesignerRequest(id, page))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeInDesignerContainer);
