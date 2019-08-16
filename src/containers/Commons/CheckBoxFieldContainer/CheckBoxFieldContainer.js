import React, { Component } from "react";
import { connect } from "react-redux";
import { GetCategoryLevel1Request, GetCategoryLevel2Request } from "actions/Categorys";
import CheckBoxField from "components/Commons/CheckBoxField";

class CheckBoxFieldContainer extends Component {
  render() {
    return(
      <CheckBoxField {...this.props}/>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    category1: state.Categorys.status.level1,
    category2: state.Categorys.status.level2
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetCategoryLevel1Request: () => {
      return dispatch(GetCategoryLevel1Request());
    },
    GetCategoryLevel2Request: (id) => {
      return dispatch(GetCategoryLevel2Request(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxFieldContainer);
