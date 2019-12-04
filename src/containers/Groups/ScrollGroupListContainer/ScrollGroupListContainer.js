import React, { Component } from "react";
import { connect } from "react-redux";
import { GetGroupListRequest } from "redux/modules/group";
import ScrollList from "components/Commons/ScrollList";
import opendesign_style from "opendesign_style";
import styled from "styled-components";
const NoDataMsg = styled.div`
  width:100%;
  height:500px;
  padding:100px;
  font-size:30pt;
  color:#707070;
  font-family:Noto Sans KR;
  text-align:center;
`
class ScrollGroupListContainer extends Component {
  componentWillMount() {
    this.props.GetGroupListRequest(0, this.props.sort, this.props.keyword);
    // props가 바뀌면 제일 첫번째 페이지 리스트부터 새로 불러옴
  }
  getList = (page) => {
    return this.props.GetGroupListRequest(page, this.props.sort, this.props.keyword);
    // ScrollList에서는 그 다음 페이지부터 불러옴
  }

  render() {
    const {dataListAdded} = this.props;
    console.log(this.props);
    return (
      
      <div>
        {dataListAdded.length<=0?
        <NoDataMsg>등록된 그룹이 없습니다.</NoDataMsg>
        :
        <ScrollList getListRequest={this.getList}
          {...opendesign_style.group_margin} type="group"
          dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} />
        }
       </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.GroupList.status.GroupList,
    dataListAdded: state.GroupList.status.GroupListAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetGroupListRequest: (page, sort, keyword) => {
      return dispatch(GetGroupListRequest(page, sort, keyword))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollGroupListContainer);
