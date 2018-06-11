import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignInGroupRequest } from "actions/Group";
import ScrollList from "components/Commons/ScrollList";
import Design from "components/Designs/Design";

class DesignInGroupContainer extends Component {
  componentWillMount() {
    this.props.GetDesignInGroupRequest(this.props.match.params.id, 0, this.props.match.params.sort);
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.props.GetDesignInGroupRequest(this.props.match.params.id, 0, nextProps.match.params.sort);
      return true;
    } else {
      return false;
    }
  }

  getList = (page) => {
    return this.props.GetDesignInGroupRequest(this.props.match.params.id, page, this.props.match.params.sort);
  }

  render() {
    return(
      <div>
        <ScrollList getListRequest={this.getList} 
                    ListComponent={Design} 
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} 
                    mobile={8} tablet={8} computer={5} largeScreen={4} widescreen={4} customClass="largeCustom"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.GroupDetail.status.DesignInGroup,
    dataListAdded: state.GroupDetail.status.DesignInGroupAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignInGroupRequest: (id, page, sort) => {
        return dispatch(GetDesignInGroupRequest(id, page, sort))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignInGroupContainer);
