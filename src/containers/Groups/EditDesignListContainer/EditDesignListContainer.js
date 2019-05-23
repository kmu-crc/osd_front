import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignInGroupRequest, DeleteDesignInGroupRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";
import StyleGuide from 'StyleGuide';
import styled from 'styled-components';

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
    const confirm = window.confirm("디자인을 그룹에서 탈퇴시키겠습니까?")
    if (!confirm) return
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
        <ContentList data={this.props.EditDesignList} type="design" handleClick={this.setOut} />
      </DesignBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    EditDesignList: state.GroupDetail.status.DesignInGroup,
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
