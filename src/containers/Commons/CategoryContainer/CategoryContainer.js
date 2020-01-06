import React, { Component } from "react";
import { connect } from "react-redux";
import Category from "components/Commons/Category";
import { withRouter } from "react-router";
import { Grid } from "semantic-ui-react";

class CategoryContainer extends Component {
  render() {
    const { category1, category2 } = this.props;
    return (
      <Grid.Column tablet={10} computer={8} widescreen={12} largeScreen={12}>
        {category1.length > 0 && category2.length > 0 ?
          <Category {...this.props} /> : null}
      </Grid.Column>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    category1: state.CategoryAll.status.category1,
    category2: state.CategoryAll.status.category2
  };
};
const mapDispatchToProps = (dispatch) => { return {} };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryContainer));
