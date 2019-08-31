import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignInGroupRequest, DeleteDesignInGroupRequest } from "redux/modules/group";
import ScrollList from "components/Commons/ScrollList";
import StyleGuide from 'StyleGuide';
import styled from 'styled-components';
import Design from "components/Designs/Design";
import osdstyle from "opendesign_style";

const DesignBox = styled.div`
  & .boxTitle {
    padding-bottom: 1rem;
    font-size: ${StyleGuide.font.size.heading4};
  }
`;

class EditDesignListContainer extends Component {
  componentWillMount() {
    this.props.GetDesignInGroupRequest(this.props.id, null, null);
  }

  setOut = (id) => {
    this.props.DeleteDesignInGroupRequest(this.props.id, id)
      .then(res => {
        if (res.data.success === true) {
          this.props.GetDesignInGroupRequest(this.props.id, null, null);
        }
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <DesignBox>
        <div className="boxTitle">등록된 디자인 ({this.props.EditDesignList.length})</div>
        <ScrollList
          {...osdstyle.design_margin}
          ListComponent={Design}
          dataListAdded={this.props.EditDesignList}
          getListRequest={null}
          handleReject={this.setOut} />
      </DesignBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    EditDesignList: state.Group.status.DesignInGroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignInGroupRequest: (id, page, sort) => {
      return dispatch(GetDesignInGroupRequest(id, page, sort))
    },
    DeleteDesignInGroupRequest: (id, designId) => {
      return dispatch(DeleteDesignInGroupRequest(id, designId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDesignListContainer);
