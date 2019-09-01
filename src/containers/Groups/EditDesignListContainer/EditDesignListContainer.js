import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DesignInGroupClear, GetDesignInGroupRequest, DeleteDesignInGroupRequest } from "redux/modules/group";
import ScrollList from "components/Commons/ScrollList";
import StyleGuide from 'StyleGuide';
import styled from 'styled-components';
import Design from "components/Designs/Design";
import osdstyle from "opendesign_style";
import Loading from 'components/Commons/Loading';

const DesignBox = styled.div`
  & .boxTitle {
    margin-left: 1rem;
    padding-bottom: 1rem;
    font-size: ${StyleGuide.font.size.heading4};
  }
`;

class EditDesignListContainer extends Component {
  componentWillMount() {
    this.props.GetDesignInGroupRequest(this.props.id, null, null);
  }
  state = { page: 0 }
  setOut = async (id) => {
    console.log(id)
    this.props.GetDesignInGroupRequest(this.props.id, null, null);
    this.props.DeleteDesignInGroupRequest(this.props.id, id)
    //  .then(res => {
    //    if (res.data.success === true) {
    //      console.log(res.data, "result")
    //      this.props.GetDesignInGroupRequest(this.props.id, null, null)
    //      // this.props.DesignInGroupClear(this.props.EditDesignList)
    //    }
    //  }).catch(err => {
    //    console.log(err);
    //  });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.EditDesignList.length !== this.props.EditDesignList.length) {
      console.log("reload")
      return true;
    }
  }

  render() {
    console.log("redner")
    return (
      <DesignBox>
        <div className="boxTitle">등록된 디자인 ({this.props.EditDesignList.length})</div>
        {this.props.status === "INIT" ?
          <Loading /> :
          <ScrollList
            {...osdstyle.design_margin}
            ListComponent={Design}
            dataListAdded={this.props.EditDesignList}
            getListRequest={null}
            handleReject={this.setOut} />
        }
      </DesignBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.Group.MyExistList,
    EditDesignList: state.Group.status.DesignInGroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    DesignInGroupClear: (data) => {
      return dispatch(DesignInGroupClear(data))
    },
    GetDesignInGroupRequest: (id, page, sort) => {
      return dispatch(GetDesignInGroupRequest(id, page, sort))
    },
    DeleteDesignInGroupRequest: (id, designId) => {
      return dispatch(DeleteDesignInGroupRequest(id, designId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDesignListContainer);
