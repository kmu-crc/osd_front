import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Button } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import ScrollDesignListContainer from "containers/Designs/ScrollDesignListContainer";
import ContentBox from "components/Commons/ContentBox";
import CategoryContainer from "containers/Commons/CategoryContainer/CategoryContainer";
import StyleGuide from "StyleGuide";
import NumberFormat from "modules/NumberFormat";
import ProductFilter from "components/Products/ProductFilter";
import Modal from 'react-awesome-modal';

// css styling
const Wrapper = styled.div`
  width: 100%;
  &.listWrap {
    display: flex;
    flex-direction: row;
  }
`;
const Content = styled(ContentBox)`
  @media only screen and (max-width: 991px) and (min-width: 768px){
    & .ui.grid>.row{
      margin-left: 6.25% !important;
    }
  }
`;
const MenuContainer = styled(Grid)`
  font-size: 1rem;

  &.ui.grid > .row {
    padding-top: 0rem;
    padding-bottom: 0rem;
  }
`;
const MenuWrap = styled.div`
  background-color: white;
  border-top: 1px solid rgba(0,0,0,0.2);
  box-shadow: 0 1px 1px 1px ${StyleGuide.color.geyScale.scale3};
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 3;
`;
const Head = styled.div`
  padding-top: 80px;
  padding-bottom: 2rem;
  font-size: ${StyleGuide.font.size.paragraph};

  & .Sorting{
    float: right;
    display: flex;
    flex-direction: row;
  }
`;


class DesignList extends Component {
  constructor(props) {
    super(props);
    this.state = { rendering: true, filter: false, ops: [] };
  }
  componentDidMount() {
    this.props.GetDesignTotalCountRequest(this.props.cate1, this.props.cate2);
  }
  changeState = async () => {
    await this.setState({ rendering: false });
    await this.setState({ rendering: true });
  }
  cate1Change = (value) => {
    this.props.history.replace(`/product/${this.props.sort}/${value}/null`);
    this.props.GetDesignTotalCountRequest(value, null);
    this.changeState();
  }
  cate2Change = (cate1, value) => {
    if (cate1 && this.props.cate1 !== cate1) {
      this.props.history.replace(`/product/${this.props.sort}/${cate1}/${value}`);
    } else {
      this.props.history.replace(`/product/${this.props.sort}/${this.props.cate1}/${value}`);
    }
    this.props.GetDesignTotalCountRequest(this.props.cate1, value);
    this.changeState();
  }
  sortChange = (e, { value }) => {
    this.props.history.replace(`/product/${value}/${this.props.cate1}/${this.props.cate2}`);
    this.changeState();
  }
  openFilterDialog = () => { this.setState({ filter: true }); }
  closeFilterDialog = () => { this.setState({ filter: false }); }
  reset = () => { this.closeFilterDialog(); }
  filtering = (ops) => { this.setState({ ops: ops }); this.closeFilterDialog(); }
  removeFilter = (k, v) => {
    let copy = this.state.ops;
    copy[k] = copy[k].filter(item => item !== v);
    this.setState({ ops: copy })
  }

  render() {
    const { filter } = this.state;
    const { sort, cate1, cate2 } = this.props;

    const SortOption = () => {
      const cate1List = this.props.category1;
      const cate2List = this.props.category2;

      if (!(cate1List && cate1List.length !== 0 && cate2List && cate2List.length !== 0))
        return <div>loading</div>;

      const cate1Name = this.props.cate1 && this.props.cate1 !== "null" ? cate1List[this.props.cate1] : null;
      const cate2Name = this.props.cate2 && this.props.cate2 !== "null" ? cate2List[parseInt(this.props.cate1, 10)].filter(sub => sub.value === parseInt(this.props.cate2, 10)) : null;

      const options = ['kinds'];
      const { ops } = this.state;
      return (
        <Head>
          <div>
            <span>디자인</span>
            {this.props.cate1 && this.props.cate1 !== "null" && <span> > {cate1Name.text} </span>}
            {this.props.cate2 && this.props.cate2 !== "null" && <span> > {cate2Name.length !== 0 && cate2Name[0].text}</span>}
            <span>({NumberFormat(this.props.Count)})</span>
          </div>

          <div style={{ width: "max-content", marginLeft: "auto", marginBottom: "10px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {options.map(opt_name =>
                ops[opt_name] && ops[opt_name].map(item => {
                  // console.log("test elements:", item)
                  return <div key={item} style={{ display: "flex", flexDirection: "row", marginRight: "10px", height: "25px", fontSize: "18px" }}>
                    <div style={{ cursor: "default", padding: "5px", width: "max-content", backgroundColor: "#707070", color: "#FFFFFF" }}>{item}</div>
                    <div onClick={() => this.removeFilter(opt_name, item)} style={{ cursor: "pointer", padding: "5px", width: "max-content", border: "1px solid #707070" }}>x</div>
                  </div>
                }))}
              <Button onClick={this.openFilterDialog}><i className="filter icon" />필터</Button>
            </div>
            {filter ?
              <Modal onLoad visible={filter} effect="fadeInLeft" >
                <ProductFilter ops={this.state.ops} close={this.closeFilterDialog} reset={this.reset} submit={this.filtering} />
              </Modal> : null}
          </div>

          <div className="Sorting">
            <Sorting handleClick={this.sortChange} placeholder={sort} />
          </div>
        </Head>
      );
    };

    return (
      <React.Fragment>
        <MenuWrap>
          <Content>
            <Wrapper>
              <MenuContainer>
                <CategoryContainer
                  cate1={this.props.cate1} handleCate1={this.cate1Change}
                  cate2={this.props.cate2} handleCate2={this.cate2Change} />
              </MenuContainer>
            </Wrapper>
          </Content>
        </MenuWrap>

        <Content>
          <SortOption />
          <Wrapper className="listWrap">
            {this.state.rendering &&
              <ScrollDesignListContainer sort={sort} cate1={cate1} cate2={cate2} history={this.props.history} />}
          </Wrapper>
        </Content>
      </React.Fragment >
    );
  }
}

export default DesignList;
