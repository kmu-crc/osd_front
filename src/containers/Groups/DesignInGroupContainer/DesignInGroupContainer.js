import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignInGroupRequest } from "actions/Group";
import ScrollList from "components/Commons/ScrollList";
import Design from "components/Designs/Design";
import styled from 'styled-components';
import StyleGuide from 'StyleGuide';

const DesignBox = styled.div`
  margin-bottom: 1rem;
  & .boxTitle {
    padding-bottom: 1rem;
    font-size: ${StyleGuide.font.size.heading4};
  }
`;

class DesignInGroupContainer extends Component {
  componentWillMount() {
    this.props.GetDesignInGroupRequest(this.props.id, 0, this.props.sort);
  }

  shouldComponentUpdate(nextProps){
    if (JSON.stringify(this.props.sort) !== JSON.stringify(nextProps.sort)) {
      this.props.GetDesignInGroupRequest(this.props.id, 0, nextProps.sort);
    }
    return true;
  }

  getList = (page) => {
    return this.props.GetDesignInGroupRequest(this.props.id, page, this.props.sort);
  }

  render() {
    return(
      <div>
        {this.props.dataListAdded && this.props.dataListAdded.length === 0
        ? <div></div>
        : <DesignBox>
            <div className="boxTitle">디자인 ({this.props.count})</div>
            <ScrollList getListRequest={this.getList}
                        ListComponent={Design}
                        dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
                        mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} customClass="largeCustom"/>
          </DesignBox>
        }
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
