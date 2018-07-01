import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignInDesignerRequest } from "actions/Designer";
import ScrollList from "components/Commons/ScrollList";
import Design from "components/Designs/Design";

class DesignInDesignerContainer extends Component {
  componentWillMount() {
    this.props.GetDesignInDesignerRequest(this.props.match.params.id, 0);
  }

  getList = (page) => {
    return this.props.GetDesignInDesignerRequest(this.props.match.params.id, page);
  }

  render() {
    return(
      <div>
        <ScrollList getListRequest={this.getList} 
                    ListComponent={Design} 
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} 
                    mobile={8} tablet={5} computer={8} largeScreen={4} widescreen={4} customClass="largeCustom"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.DesignerDetail.status.DesignInDesigner,
    dataListAdded: state.DesignerDetail.status.DesignInDesignerAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignInDesignerRequest: (id, page) => {
        return dispatch(GetDesignInDesignerRequest(id, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignInDesignerContainer);
