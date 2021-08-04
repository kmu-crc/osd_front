import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import ScrollDesignerListContainer from "containers/Designer/ScrollDesignerListContainer";
import ContentBox from "components/Commons/ContentBox";
import CategoryContainer from "containers/Commons/CategoryContainer/CategoryContainer";
import opendesign_style from "opendesign_style";
import NumberFormat from "modules/NumberFormat";

// css styling

const Wrapper = styled.div`
  width: 100%;
`;

const Content = styled(ContentBox)`
  @media only screen and (max-width: 991px) and (min-width: 768px){
    & .ui.grid>.row{
      margin-left: 6.25% !important;
    }
  }
`;

const MenuContainer = styled(Grid)`
  & .sorting {
    text-align: right;
    line-height: 50px;
  }
  & .ui.default.dropdown:not(.button)>.text,
  & .ui.dropdown:not(.button)>.default.text {
    color: inherit;
  }
  &.ui.grid > .row {
    padding-top: 0rem;
    padding-bottom: 0rem;
  }
`;

const MenuWrap = styled.div`
border:1px solid black;
  background-color: white;
  border-top: 1px solid rgba(0,0,0,0.2);
  box-shadow: 0 1px 1px 1px ${opendesign_style.color.grayScale.scale3};
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 3;
`;

const Head = styled.div`
  padding-top: 80px;
  padding-bottom: 2rem;
  font-size: ${opendesign_style.font.size.paragraph};

  & .Sorting{
    float: right;
  }

`;


class DesignerList extends Component {
  state = {
    rendering: true
  }

  componentDidMount() {
    this.props.GetDesignerTotalCountRequest(this.props.cate1, this.props.cate2);
  }

  changeState = async () => {
    await this.setState({
      rendering: false
    });
    await this.setState({
      rendering: true
    });
  }

  cate1Change = (value) => {
    // this.props.history.replace(`/designer/${this.props.sort}/${value}/null`);
    this.props.history.push(`/designer/${this.props.sort}/${value}/null`);
    this.props.GetDesignerTotalCountRequest(value, null);
    this.changeState();
  }

  cate2Change = (cate1, value) => {
    if (cate1 && this.props.cate1 !== cate1) {
      // this.props.history.replace(`/designer/${this.props.sort}/${cate1}/${value}`);
      this.props.history.push(`/designer/${this.props.sort}/${cate1}/${value}`);
    } else {
      // this.props.history.replace(`/designer/${this.props.sort}/${this.props.cate1}/${value}`);
      this.props.history.push(`/designer/${this.props.sort}/${this.props.cate1}/${value}`);
    }
    this.props.GetDesignerTotalCountRequest(this.props.cate1, value);
    this.changeState();
  }

  sortChange = (e, { value }) => {
    // this.props.history.replace(`/designer/${value}/${this.props.cate1}/${this.props.cate2}`);
    this.props.history.push(`/designer/${value}/${this.props.cate1}/${this.props.cate2}`);
    this.changeState();
  }

  render() {
    const { sort, cate1, cate2 } = this.props;
    const Header = () => {
      const cate1List = this.props.category1;
      const cate2List = this.props.category2;

      if (cate1List && cate1List.length !== 0 && cate2List && cate2List.length !== 0) {
        const cate1Name = this.props.cate1 && this.props.cate1 !== "null"
          ? cate1List[this.props.cate1]
          : null;
        const n = parseInt(this.props.cate1, 10);
        const cate2Name = this.props.cate2 && this.props.cate2 !== "null"
          ? cate2List[n].filter(sub => sub.value === this.props.cate2)
          : null;
        return (
          <Head>
            <span>디자이너 </span>
            {this.props.cate1 && this.props.cate1 !== "null" &&
              <span> &gt; {cate1Name.text} </span>
            }
            {this.props.cate2 && this.props.cate2 !== "null" &&
              <span> &gt; {cate2Name.length !== 0 && cate2Name[0].text}</span>
            }
            <span> ({NumberFormat(this.props.Count)})</span>
            <div className="Sorting">
              <Sorting handleClick={this.sortChange}
                placeholder={sort} />
            </div>
          </Head>
        );
      } else {
        return null;
      }
    };

    return (
      <React.Fragment>
        <MenuWrap>
          <Content>
            <Wrapper>
              <MenuContainer devided="vertically" padded={true} columns={2}>
                <Grid.Row stretched={false}>
                  <CategoryContainer handleCate1={this.cate1Change}
                    handleCate2={this.cate2Change}
                    cate1={this.props.cate1}
                    cate2={this.props.cate2} />
                </Grid.Row>
              </MenuContainer>
            </Wrapper>
          </Content>
        </MenuWrap>
        <Content>
          <Header />
          <Wrapper className="listWrap">
            {this.state.rendering &&
              <ScrollDesignerListContainer sort={sort} cate1={cate1} cate2={cate2} history={this.props.history} />}
          </Wrapper>
        </Content>
      </React.Fragment>
    );
  }
}

export default DesignerList;
