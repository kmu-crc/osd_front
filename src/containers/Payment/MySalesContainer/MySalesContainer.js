import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMySalesRequest } from "actions/Payment";
import ScrollBoardList from "components/Commons/ScrollBoardList";
import ScrollList from "components/Commons/ScrollList";
import PaymentListElement from "containers/Payment/PaymentListElement";
import styled from "styled-components";
import market_style from "market_style";
import { Pagination } from 'semantic-ui-react'

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
    width:80%;
    min-width:max-content;
    display:flex;
    align-items:center;
    font-size:${market_style.font.size.mini2};
  }
  .writer{
    width:15%;
    min-width:max-content;
    display:flex;
    align-items:center;
    font-size:${market_style.font.size.mini2};
  }
  .date{
    width:5%;
    min-width:max-content;
    display:flex; 
    justify-content:center;
    align-items:center;
    font-size:${market_style.font.size.mini2};
    }

    @media only screen and (min-width: 500px) and (max-width: 800px) {
      padding-left:20px;
      padding-right:20px;
      .title{
        width:80%;
      }
      .writer{
        width:17%;
      }
      .date{
        width:3%;
      }
    }
`;


class MySalesContainer extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      page:0,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentWillMount() {
    this.props.GetMySalesRequest(this.props.token, 0);
  }

  getList = (page) =>
    this.props.GetMySalesRequest(this.props.token, page);

  goPage = async (pagenum) => {
      await this.setState({ page:pagenum });
      this.props.GetMySalesRequest(this.props.token, pagenum);
  };
  render() {
    const { page } = this.state;
    const lastPage = parseInt(this.props.allPage / 10, 10);
    return (
      <Board>
      <div className="title__">판매 아이템</div>
      <div className="lineBox"><div className="line"/></div>
      <ListElement>
                <div className="title">제목</div>
                <div className="writer">글쓴이</div>
                <div className="date">작성일</div>
      </ListElement>
      <ScrollBoardList
      total={this.props.Count}
      dataList={this.props.dataList}
      getListRequest={this.getList}
      ListComponent={PaymentListElement}
    />
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

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  dataList: state.Payment.status.MySales,
  dataListAdded: state.Payment.status.MySalesAdded,
});
const mapDispatchToProps = (dispatch) => ({
  GetMySalesRequest: (token, page) => dispatch(GetMySalesRequest(token, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MySalesContainer);
