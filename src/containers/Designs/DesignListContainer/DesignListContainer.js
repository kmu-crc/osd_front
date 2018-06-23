import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest } from "actions/Design";
import { GetCategoryLevel2Request } from "actions/Categorys";
import DesignList from "components/Designs/DesignList";

class DesignListContainer extends Component {
  componentDidMount() {
    // 새로고침 하여 페이지가 render될 cate1값은 원래 하나의 리스트라 상관 없지만 cate2 값은
    // cate1의 value에 따라 리스트가 변경되어야 하기 때문에 cate1의 value가 있다면 그에 맞는
    // 리스트를 요청해 주어야 한다. 
    this.props.GetCategoryLevel2Request(this.props.cate1);
  }
  render() {
    return(
      <div>
        <DesignList {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignList: state.DesignList.status.DesignList,
    DesignListAdded: state.DesignList.status.DesignListAdded,
    userInfo: state.Authentication.status.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignListRequest: (sort, categoryLevel1, categoryLevel2, page) => {
        return dispatch(GetDesignListRequest(sort, categoryLevel1, categoryLevel2, page))
      },
      GetCategoryLevel2Request: (id) => {
        return dispatch(GetCategoryLevel2Request(id));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignListContainer);
