import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
// import { Link } from "react-router-dom";
import Sorting from "components/Commons/Sorting";
import ScrollDesignerBoardListContainer from "containers/Designer/ScrollDesignerBoardListContainer";
import ContentBox from "components/Commons/ContentBox";
import CategoryContainer from "containers/Commons/CategoryContainer/CategoryContainer";
import StyleGuide from "StyleGuide";
import NumberFormat from "modules/NumberFormat";

// CSS STYLING
const Wrapper = styled.div`
  width: 100%;
  &.header {
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
  }
`;
const ListElement = styled.div`
  width: 100%;
  margin: 0 auto 0.9rem;
  font-size: 13px;
  border-radius: 3px 3px 3px 3px;
  overflow: hidden;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-color: #fff;
  text-align: left;
  box-sizing: border-box;
  padding: 10px;
  list-style: none;
  display: flex;
  fiex-direction: row;
`;

class DesignerBoardList extends Component {
  constructor(props) {
    super(props);
    this.state = { rendering: true };
  }
  componentDidMount() {
    this.props.GetDesignerBoardTotalCountRequest(this.props.cate1, this.props.cate2);
  }
  changeState = async () => {
    await this.setState({ rendering: false });
    await this.setState({ rendering: true });
  }
  cate1Change = (value) => {
    this.props.history.replace(`/designerboard/${this.props.sort}/${value}/null`);
    this.props.GetDesignerBoardTotalCountRequest(value, null);
    this.changeState();
  }
  cate2Change = (cate1, value) => {
    if (cate1 && this.props.cate1 !== cate1) {
      this.props.history.replace(`/designerboard/${this.props.sort}/${cate1}/${value}`);
    } else {
      this.props.history.replace(`/designerboard/${this.props.sort}/${this.props.cate1}/${value}`);
    }
    this.props.GetDesignerBoardTotalCountRequest(this.props.cate1, value);
    this.changeState();
  }

  sortChange = (e, { value }) => {
    this.props.history.replace(`/designerboard/${value}/${this.props.cate1}/${this.props.cate2}`);
    this.changeState();
  }

  render() {
    const { sort, cate1, cate2, Count } = this.props;
    const Header = () => {
      const cate1List = this.props.category1;
      const cate2List = this.props.category2;

      if (!(cate1List && cate1List.length !== 0 && cate2List && cate2List.length !== 0)) {
        return <div>NOTHING</div>;
      }

      const cate1Name = cate1 && cate1 !== "null" ? cate1List[cate1] : null;
      const cate2Name = cate2 && cate2 !== "null" ? cate2List[parseInt(cate1, 10)].filter(sub => sub.value === parseInt(cate2, 10)) : null;

      return (
        <Head>
          <span>디자이너 </span>
          {cate1 && cate1 !== "null" && <span> > {cate1Name.text} </span>}
          {cate2 && cate2 !== "null" && <span> > {cate2Name.length !== 0 && cate2Name[0].text}</span>}
          <span> ({NumberFormat(Count)})</span>
          <div className="Sorting">
            <Sorting handleClick={this.sortChange} placeholder={sort} />
          </div>
        </Head>
      );
    };

    return (<React.Fragment>
      <MenuWrap>
        <Content>
          <Wrapper>
            <MenuContainer devided="vertically" padded={true} columns={2}>
              <Grid.Row stretched={false}>
                <CategoryContainer board="designer" handleCate1={this.cate1Change} handleCate2={this.cate2Change} cate1={this.props.cate1} cate2={this.props.cate2} />
              </Grid.Row>
            </MenuContainer>
          </Wrapper>
        </Content>
      </MenuWrap>
      <Content>
        <Header />

        <ListElement>
          {/* no.     */}<div style={{ marginRight: "15px" }}>번호</div>
          {/* title   */}<div style={{ marginRight: "15px" }}>제목</div>
          {/* writer  */}<div style={{ marginLeft: "auto", marginRight: "15px", display: "flex" }}>글쓴이</div>
          {/* date    */}<div style={{ marginRight: "15px" }}>작성일</div>
          {/* view    */}<div style={{ marginRight: "15px" }}>조회수</div>
          {/* like    */}<div style={{ marginRight: "15px" }}>좋아요</div>
        </ListElement>
        <Wrapper className="listWrap">
          {this.state.rendering &&
            <ScrollDesignerBoardListContainer sort={sort} cate1={cate1} cate2={cate2} history={this.props.history} />}
        </Wrapper>
      </Content>
    </React.Fragment>);
  }
}

export default DesignerBoardList;
