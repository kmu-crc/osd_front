import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Modal from 'react-awesome-modal';

import StyleGuide from "StyleGuide";
import NumberFormat from "modules/NumberFormat";
import Sorting from "components/Commons/Sorting";
import ContentBox from "components/Commons/ContentBox";
import ProductFilter from "components/Products/ProductFilter";
import ScrollProductListContainer from "containers/Products/ScrollProductListContainer";
import CategoryContainer from "containers/Commons/CategoryContainer/CategoryContainer";
import ButtonOSD from "components/Commons/Button";

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
    & .ui.grid>.row {
      margin-left: 6.25% !important;
    }
  }
  background-color: ${props => props.bgcolor || "#FFF"};
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
  display: flex;
  &.Sorting {
    float: right;
    display: flex;
    flex-direction: row;
  }
`;

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { rendering: true, filter: false, ops: [] };
  }
  componentDidMount() {
    this.props.GetProductTotalCountRequest(this.props.cate1, this.props.cate2);
  }
  changeState = async () => {
    await this.setState({ rendering: false });
    await this.setState({ rendering: true });
  }
  cate1Change = (value) => {
    this.props.history.replace(`/product/${this.props.sort}/${value}/null`);
    this.props.GetProductTotalCountRequest(value, null);
    this.changeState();
  }
  cate2Change = (cate1, value) => {
    if (cate1 && this.props.cate1 !== cate1) {
      this.props.history.replace(`/product/${this.props.sort}/${cate1}/${value}`);
    } else {
      this.props.history.replace(`/product/${this.props.sort}/${this.props.cate1}/${value}`);
    }
    this.props.GetProductTotalCountRequest(this.props.cate1, value);
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
    const { rendering, filter } = this.state;
    const { history, sort, cate1, cate2, Count } = this.props;

    const SortOption = () => {
      const cate1List = this.props.category1;
      const cate2List = this.props.category2;

      if (!(cate1List && cate1List.length !== 0 && cate2List && cate2List.length !== 0))
        return <div>loading</div>;

      const cate1Name = cate1 && cate1 !== "null" ? cate1List[cate1] : null;
      const cate2Name = cate2 && cate2 !== "null" ? cate2List[parseInt(cate1, 10)].filter(sub => sub.value === parseInt(cate2, 10)) : null;

      const options = ['kinds'];
      const { ops } = this.state;
      return (<Head>
        <div style={{ height: "30px", lineHeight: "30px" }}>
          <span>아이템</span>
          {cate1 && cate1 !== "null" && <span> > {cate1Name.text} </span>}
          {cate2 && cate2 !== "null" && <span> > {cate2Name.length !== 0 && cate2Name[0].text}</span>}
          <span>({NumberFormat(Count)})</span>
        </div>
        <div style={{ marginLeft: "15px" }}>
          <Button onClick={this.openFilterDialog}><i className="filter icon" />필터</Button>
        </div>

        <div style={{ width: "max-content", marginLeft: "auto", marginBottom: "10px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {options.map(opt_name =>
              ops[opt_name] && ops[opt_name].map(item => {
                return <div key={item} style={{ display: "flex", flexDirection: "row", marginRight: "10px", height: "25px", fontSize: "18px" }}>
                  <div style={{ cursor: "default", padding: "5px", width: "max-content", backgroundColor: "#F00", color: "#FEFEFE" }}>{item}</div>
                  <div onClick={() => this.removeFilter(opt_name, item)} style={{ cursor: "pointer", padding: "5px", width: "max-content", border: "1px solid #707070" }}>x</div>
                </div>
              }))}
          </div>

          <a href="/createProduct"><ButtonOSD size="small" round={true} color="Primary">상품 등록</ButtonOSD></a>
          {filter ?
            <Modal onLoad visible={filter} effect="fadeInLeft" >
              <ProductFilter ops={ops} close={this.closeFilterDialog} reset={this.reset} submit={this.filtering} />
            </Modal> : null}
        </div>

        <div className="Sorting">
          <Sorting handleClick={this.sortChange} placeholder={sort} />
        </div>
      </Head>);
    };

    return (
      <React.Fragment>
        <MenuWrap>
          <Content>
            <Wrapper>
              <MenuContainer>
                <CategoryContainer
                  which="아이템" board="product"
                  cate1={cate1} handleCate1={this.cate1Change}
                  cate2={cate2} handleCate2={this.cate2Change} />
              </MenuContainer>
            </Wrapper>
          </Content>
        </MenuWrap>

        <Content bgcolor="#EFEFEF">
          <SortOption />
          <Wrapper className="listWrap">
            {rendering && <ScrollProductListContainer sort={sort} cate1={cate1} cate2={cate2} history={history} />}
          </Wrapper>
        </Content>
      </React.Fragment >
    );
  }
}

export default ProductList;
