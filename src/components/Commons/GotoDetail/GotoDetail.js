import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

class GotoDetail extends React.Component {
  goto = () =>
    window.location.href = `/${this.props.type}detail/${this.props.id}`;
  render() {
    return (<Wrapper
      title="클릭하면 상세페이지로 이동합니다"
      onClick={() =>
        this.props.type
          ? this.goto()
          : null}>
      {this.props.children}
    </Wrapper>);
  }
}

export default GotoDetail;
