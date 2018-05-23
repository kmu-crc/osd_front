import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignInDesignerRequest } from "actions/Designer";
import ContentList from "components/Commons/ContentList";

class DesignInDesignerContainer extends Component {
  componentWillMount() {
    this.props.GetDesignInDesignerRequest(this.props.match.params.id);
  }

  render() {
    return(
      <div>
        <ContentList data={this.props.DesignInDesigner} columns={4} type="design"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignInDesigner: state.DesignerDetail.status.DesignInDesigner
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignInDesignerRequest: (id) => {
        return dispatch(GetDesignInDesignerRequest(id))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignInDesignerContainer);
