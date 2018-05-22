import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetLikeInDesignerRequest } from "actions/Designer";
import ContentList from "components/Commons/ContentList";

class LikeInDesignerContainer extends Component {
  componentWillMount() {
    this.props.GetLikeInDesignerRequest(this.props.match.params.id);
  }

  render() {
    return(
      <div>
        <ContentList data={this.props.LikeInDesigner} columns={4} type="design"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    LikeInDesigner: state.DesignerDetail.status.LikeInDesigner
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetLikeInDesignerRequest: (id) => {
        return dispatch(GetLikeInDesignerRequest(id))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeInDesignerContainer);
