import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Grid, Icon, Dropdown } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import ContentList from "components/Commons/ContentList";

// css styling

const Container = styled.div`
  width: 95%;
  margin: auto;
  min-width: 660px;
`;

const Wrapper = styled(Grid)`
  width: 100%;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.3);
  &.ui.grid {
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 0rem;
    margin-right: 0rem;
  }
  &.ui.grid > .row,
  &.ui.grid > .row > .column {
    padding: 0;
  }
`;

const HeadContainer = styled(Grid.Column)`
  border-right: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
`;

const ProfileSection = styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.15);
  padding: 1rem;
  & .imgContainer {
    width: 100%;
    height: 140px;
  }
  & .imgContainer > div {
    width: 140px;
    height: 140px;
    margin: auto;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.25);
    overflow: hidden;
  }
  & .title {
    min-height: 80px;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    padding: 10px 0;
  }
  & .issueContainer {
    height: 40px;
  }
  & .btnContainer {
    height: 60px;
    text-align: center;
    & button {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
`; 

const CountSection = styled.div`
  padding: 1rem 2rem;
  & .list {
    height: 20px;
    width: 100%;
    font-size: 13px;
  }
  & .list span {
    float: right;
  }
`; 

const InfoSection = styled.div`
  padding: 1rem;
  & .explanation {
    font-size: 13px;
  }
`; 

const TabContainer = styled(Grid.Column)`
  background-color: white;
  &..columns {
    padding: 0 20px;
  } 
`;

const Head = styled(Grid)`
  border-bottom: 1px solid rgba(0,0,0,0.25);
  &.ui.grid > .row {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
  & ul {
    line-height: 38px;
  }
  & li {
    float: left;
    width: 100px;
    text-align: center;
    cursor: pointer;
  }
  & li:hover {
    font-weight: 500;
  }
  & li.activeTab {
    color: red;
    position: relative;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  padding: 0 3rem;
`;


class GroupDetail extends Component {
  state = {
    id: this.props.id,
    activeMoreBtn: false,
    activeIssue: false,
    type: this.props.type,
    sort: this.props.sort,
    designData: this.props.DesignInGroup,
    groupData: this.props.GroupInGroup
  };

  // 렌더링 직전에 한번 도는 코드
  componentWillMount() {
    //그룹에 대한 기본 정보 불러오기
    this.props.GetGroupDetailRequest(this.props.id);

    //그룹에 있는 컨텐츠 불러오기 -> 일단 무조건 디자인 리스트부터 불러옴
    this.props.GetDesignInGroupRequest(this.props.id, this.state.sort);

    //새로고침 했을 경우에 적용 -> url에 맞게 값 불러옴
    if (this.props.type === "design" || this.props.type === null || this.props.type === "null") {
      this.props.GetDesignInGroupRequest(this.props.id, this.props.sort).then(()=>{
        this.setState({
          designData: this.props.DesignInGroup
        });
      });
    } else if (this.props.type === "group") {
      this.props.GetGroupInGroupRequest(this.props.id, this.props.sort).then(()=>{
        this.setState({
          groupData: this.props.GroupInGroup
        });
      });
    }
  }

  onActiveMoreBtn = (e) => {
    this.setState({
      activeMoreBtn: !(this.state.activeMoreBtn)
    });
  }

  onActiveIssue = (e) => {
    this.setState({
      activeIssue: !(this.state.activeIssue)
    });
    if (this.state.activeIssue === true) {
      e.target.innerHTML = "★ 공지보기";
    } else if (this.state.activeIssue === false) {
      e.target.innerHTML = "★ 공지닫기";
    }
  }

  typeChange = (e) => {
    let sort = this.props.sort;
    document.getElementsByClassName("activeTab")[0].setAttribute("class", "");
    (e.target).setAttribute("class", "activeTab");
    let value = e.target.id;
    if (value === "design") {
      this.props.GetDesignInGroupRequest(this.props.id, sort).then(()=>{
        this.setState({
          designData: this.props.DesignInGroup,
          type: value
        });
      });
    } else if (value === "group") {
      this.props.GetGroupInGroupRequest(this.props.id, sort).then(()=>{
        this.setState({
          groupData: this.props.GroupInGroup,
          type: value
        });
      });
    }
    let url = (this.props.history.location.pathname).split("/")[1]+"/"+(this.props.history.location.pathname).split("/")[2];
    this.props.history.replace(`/${url}/${value}/${sort}`);
  }

  sortChange = (e, {value}) => {
    let type = this.props.type;
    if (type === "design" || type === "null") {
      this.props.GetDesignInGroupRequest(this.props.id, value).then(()=>{
        this.setState({
          designData: this.props.DesignInGroup,
          sort: value
        });
      });
    } else if (type === "group") {
      this.props.GetGroupInGroupRequest(this.props.id, value).then(()=>{
        this.setState({
          groupData: this.props.GroupInGroup,
          sort: value
        });
      });
    }
    let url = (this.props.history.location.pathname).split("/")[1]+"/"+(this.props.history.location.pathname).split("/")[2];
    this.props.history.replace(`/${url}/${type}/${value}`);
  }

  render(){
    let groupDetail = this.props.GroupDetail;
    let designList = this.state.designData;
    let groupList = this.state.groupData;
    let count;
    if (groupDetail.count != null) {
      count = groupDetail.count;
    } else {
      count = {
        member: 0,
        like: 0,
        design: 0,
        group: 0
      };
    }
    return(
      <div>
        {groupDetail.length !== 0 &&
          <Container>
            <Wrapper padded={false} columns={2}>
              <Grid.Row>
                <HeadContainer width={4}>
                  <ProfileSection>
                    <div className="imgContainer">
                      <div>이미지</div>
                    </div>
                    <div className="title">
                      <h3>{groupDetail.title}</h3>
                    </div>
                    <h4 className="issueContainer">공지섹션</h4>
                    <div className="btnContainer">
                      <button className="red">좋아요</button>
                      <button className="red">지난 공지</button>
                    </div>
                  </ProfileSection>
                  <CountSection>
                    <div className="list">
                      <Icon name="heart" color="grey" size="tiny"></Icon> 좋아요
                      <span>{count.like}</span>
                    </div>
                    <div className="list">
                      <Icon name="signup" color="grey" size="tiny"></Icon> 디자인
                      <span>{count.design}</span>
                    </div>
                    <div className="list">
                      <Icon name="window restore" color="grey" size="tiny"></Icon> 그룹
                      <span>{count.group}</span>
                    </div>
                    <div className="list">
                      <Icon name="user" color="grey" size="tiny"></Icon> 그룹장
                      <span>{groupDetail.userName}</span>
                    </div>
                  </CountSection>
                  <InfoSection>
                    <h4>소개</h4>
                    <p className="explanation">{groupDetail.explanation}</p>
                  </InfoSection>
                </HeadContainer>
                <TabContainer width={12}>
                  <Head devided="vertically" padded={true} columns={2}>
                    <Grid.Row>
                      <Grid.Column as="ul">
                        <li id="design" className="activeTab" onClick={this.typeChange}>디자인</li>
                        <li id="group" onClick={this.typeChange}>그룹</li>
                        <div className="clear"></div>
                      </Grid.Column>
                      <Sorting computer={8} tablet={8} mobile={8} handleChange={this.sortChange} value={this.state.sort}/>
                    </Grid.Row>
                  </Head>
                  <ContentBox>
                    {this.props.type === "design" || this.props.type === null || this.props.type === "null" ?
                    <ContentList data={designList} type="design" columns={4}/>
                    : <ContentList data={groupList} type="group" columns={4}/>
                    }
                  </ContentBox>
                </TabContainer>
              </Grid.Row>
            </Wrapper>
          </Container>
        }
      </div>
    );
  }
}

export default GroupDetail;





//            <HeadContainer >
//               <Grid.Row columns={2}>
//                 <Grid.Column computer={8} tablet={6} mobile={6}>
//                   <h3 className="title">{groupDetail.title}
//                     <button className="btnIssue" onClick={this.onActiveIssue}>★ 공지보기</button>
//                   </h3>
//                   <Cate>
//                     <span className="owner">
//                       <Icon name="user" size="tiny"></Icon>
//                       {groupDetail.userName}
//                     </span>
//                   </Cate>
//                   
//                 </Grid.Column>
//                 <Grid.Column computer={8} tablet={10} mobile={10}>
//                   <SubInfo>
//                   <span className="text">
//                     <Icon name="heart" color="grey" size="tiny"></Icon>
//                     좋아요
//                   </span>
//                   <span className="number">{count.like}</span>
//                   <span className="text">
//                     <Icon name="signup" color="grey" size="tiny"></Icon>
//                     디자인
//                   </span>
//                   <span className="number">{count.design}</span>
//                   <span className="text">
//                     <Icon name="window restore" color="grey" size="tiny"></Icon>
//                     그룹
//                   </span>
//                   <span className="number">0</span>
//                   <span className="more" onClick={this.onActiveMoreBtn}>더보기 +
//                     {this.state.activeMoreBtn === true &&
//                       <BtnModal>
//                         <li>가입신청</li>
//                         <li>수정</li>
//                         <li>삭제</li>
//                       </BtnModal>
//                     }
//                   </span>
//                 </SubInfo>
//                 </Grid.Column>
//               </Grid.Row>
//             </HeadContainer>
//             <TabContainer>
//               <MenuContainer devided="vertically" padded={true} columns={2}>
//                 <Grid.Row>
//                   <Grid.Column computer={13} tablet={12} mobile={10} className="typeSelect">
//                     {this.props.type === "design" || this.props.type === null || this.props.type === "null" ?
//                       <h3>디자인 총 {designList.length}건</h3>
//                       :
//                       <h3>그룹 총 {groupList.length}건</h3>
//                     }
//                     <Dropdown selection placeholder="디자인" options={type} onChange={this.typeChange} value={this.state.type}/>
//                   </Grid.Column>
//                   
//                 </Grid.Row>
//               </MenuContainer>
//               {this.props.type === "design" || this.props.type === null || this.props.type === "null" ?
//               <ContentList data={designList} type="design"/>
//               : <ContentList data={groupList} type="group"/>
//               }
//             </TabContainer>