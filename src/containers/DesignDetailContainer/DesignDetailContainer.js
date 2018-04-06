import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignDetailRequest } from "../../actions/Design";
import DesignDetail from "../../components/DesignDetail";

class DesignDetailContainer extends Component {

  componentWillMount(){
    console.log(this.params.id);
    this.props.GetDesignDetailRequest(this.params.id);
  }
  
  render() {
    return(
      <div>
        <DesignDetail DesignDetail={this.props.DesignDetail}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignDetail: state.DesignDetail.status.DesignDetail
  };
  console.log(state);
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignDetailRequest: (id) => {
        return dispatch(GetDesignDetailRequest(id))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailContainer);
