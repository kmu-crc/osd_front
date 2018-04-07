import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerDetailRequest } from "../../actions/Designer";
import DesignerDetail from "../../components/DesignerDetail";

class GroupDetailContainer extends Component {

  componentDidMount(){
    this.props.GetDesignerDetailRequest(this.props.id);
  }
  
  render() {
    return(
      <div>
        <DesignerDetail DesignerDetail={this.props.DesignerDetail}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignerDetail: state.DesignerDetail.status.DesignerDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignerDetailRequest: (id) => {
        return dispatch(GetDesignerDetailRequest(id))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer);
