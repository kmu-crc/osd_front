import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignerListRequest } from "actions/Designer";
import { GetCategoryLevel2Request } from "actions/Categorys";
import DesignerList from "components/Designers/DesignerList";

class DesignerListContainer extends Component {
  componentDidMount() {
    // 새로고침 하여 페이지가 render될 cate1값은 원래 하나의 리스트라 상관 없지만 cate2 값은
    // cate1의 value에 따라 리스트가 변경되어야 하기 때문에 cate1의 value가 있다면 그에 맞는
    // 리스트를 요청해 주어야 한다. 
    this.props.GetCategoryLevel2Request(this.props.cate1);
  }
  render() {
    return(
      <div>
        <DesignerList {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignerList: state.DesignerList.status.DesignerList,
    DesignerListAdded: state.DesignerList.status.DesignerListAdded,
    userInfo: state.Authentication.status.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignerListRequest: (page, sort) => {
        return dispatch(GetDesignerListRequest(page, sort))
      },
      GetCategoryLevel2Request: (id) => {
        return dispatch(GetCategoryLevel2Request(id));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignerListContainer);
