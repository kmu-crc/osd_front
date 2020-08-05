import React, { Component } from 'react';
import styled from "styled-components";
import {
  GetGroupNoticeListRequest, GetTotalCountGroupNoticeRequest,
} from "redux/modules/group";
import DateFormat from "modules/DateFormat";
import { Pagination } from 'semantic-ui-react';


const Container = styled.div``;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  background-color: #EFEFEF;
  border-top: 2px solid #707070;
  border-bottom: 1px solid #A0A0A0;
  padding: 5px;
  font-weight: 900;
  cursor: default;

  .num {
    width: 20%;
  }
  .title {
    width: 60%;
  }
  .date {
    width: 20%;
  }
`;
const List = styled.div`
  .row {
    display: flex;
    justify-content: space-between;
    text-align: center;
    background-color: white;
    padding: 5px;
    cursor: default;
    border-bottom: 1px solid #A0A0A0;
    :hover {
      background-color: #EFEFEF;
    }
    .num {
      width: 20%;
      color: gray;
    }
    .title {
      width: 60%;
      text-align: left;
      color: black;
      font-weight: 500;
    }
    .date {
      width: 20%;
      color: gray;
    }
  }
`;
const Navi = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
class GroupListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      count: 0,
      list: [],
    };
    this.getList = this.getList.bind(this);
  }
  componentDidMount() {

    this.getList();
  }
  async getList() {
    GetTotalCountGroupNoticeRequest(this.props.id)
      .then(data => this.setState({ count: data.data }))
      .catch(err => console.error(err));
    GetGroupNoticeListRequest(this.props.id, this.state.page)
      .then(data => this.setState({ list: data.data }))
      .catch(err => console.error(err));
  }

  render() {
    const { list, count, page } = this.state;
    const per = 5;
    const lastPage = parseInt(count / per, 10);

    return (
      <Container>
        <Head>
          <div className="num">번호</div>
          <div className="title">제목</div>
          <div className="date">등록일</div>
        </Head>

        <List>
          {list && list.length > 0 ?
            list.map(noti => {
              return (<div className="row" key={noti.uid} onClick={() => this.props.open(noti)}>
                <div className="num">{noti.uid}</div>
                <div className="title">{noti.title}</div>
                <div className="date">{DateFormat(noti.create_time)}</div>
              </div>)
            })
            : <div>공지사항이 없습니다.</div>}
        </List>

        <Navi>
          {count > per
            ?
            <Pagination
              defaultActivePage={1}
              totalPages={(count / per)}
              onPageChange={async (event, { activePage }) => {
                await this.setState({ page: activePage - 1 });
                this.getList();
              }}
            />
            :
            null}
        </Navi>

      </Container>
    )
  }
}


export default GroupListContainer;
