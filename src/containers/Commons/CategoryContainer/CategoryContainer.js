import React, { Component } from "react";
import { connect } from "react-redux";
import { GetCategoryLevel1Request, GetCategoryLevel2Request } from "actions/Categorys";
import Category from "components/Commons/Category";
import Category2 from "components/Commons/Category2";
import { withRouter } from "react-router";

class CategoryContainer extends Component {

  render() {
    return(
      <div style={{width: "50%"}}>
        {this.props.category1.length > 0 && this.props.category2.length > 0 &&
          <div style={{width: "100%"}}>
            <Category2 {...this.props}/>
            <Category {...this.props}/>
          </div>
        }
      </div>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    category1: state.CategoryAll.status.category1,
    category2: state.CategoryAll.status.category2
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryContainer));
