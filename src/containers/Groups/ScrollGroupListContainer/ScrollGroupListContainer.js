import React, { Component } from "react";
import { connect } from "react-redux";
import { GetGroupListRequest } from "redux/modules/group";
import ScrollList from "components/Commons/ScrollList";
import ScrollList_mobile from "components/Commons/ScrollList_mobile";
import opendesign_style from "opendesign_style";
import opendesign_mobile_style from "opendesign_mobile_style";
import styled from "styled-components";

const NoDataMsg = styled.div`
  width: 100%;
  height: 250px; // 500px;
  padding: 50px; // 100px;
  font-size: 30px;
  color: #707070;
  font-family: Noto Sans KR;
  text-align: center;
`;

class ScrollGroupListContainer extends Component {
  componentWillMount() {
    this.getInitList();
  }
  componentDidUpdate(prevProps) {
    if (this.props.keyword !== prevProps.keyword) {
      this.getInitList();
    }
  }
  getInitList = () => {
    this.props.keyword &&
      this.props.keyword.length &&
      this.props.GetGroupListRequest(0, this.props.sort, this.props.keyword);
  }
  getList = (page) =>
    this.props.GetGroupListRequest(page, this.props.sort, this.props.keyword);

    
  render() {
    const { dataListAdded } = this.props;

    return (

      <div>
        {dataListAdded.length <= 0 ?
          <NoDataMsg>
            {this.props.message || "등록된 그룹이 없습니다."}</NoDataMsg>
          :
          this.props.isMobile == true?
          this.props.display == false?
          null:
          <ScrollList_mobile
            manual={this.props.manual || false}
            {...opendesign_mobile_style.group_margin}
            getListRequest={this.getList}
            type="group"
            dataList={this.props.dataList}
            dataListAdded={this.props.dataListAdded} />
          :
          this.props.display == false?
          null:
          <ScrollList
            manual={this.props.manual || false}
            {...opendesign_style.group_margin}
            getListRequest={this.getList}
            type="group"
            dataList={this.props.dataList}
            dataListAdded={this.props.dataListAdded} />
          
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
