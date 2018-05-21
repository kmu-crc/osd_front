import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignInGroupRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";

class DesignInGroupContainer extends Component {
  componentWillMount() {
    this.props.GetDesignInGroupRequest(this.props.match.params.id, this.props.match.params.sort);
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.props.GetDesignInGroupRequest(this.props.match.params.id, nextProps.match.params.sort);
      return true;
    } else {
      return false;
    }
  }

  render() {
    return(
      <div>
        <ContentList data={this.props.DesignInGroup} columns={4} type="design"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignInGroup: state.GroupDetail.status.DesignInGroup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignInGroupRequest: (id, sort) => {
        return dispatch(GetDesignInGroupRequest(id, sort))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignInGroupContainer);
