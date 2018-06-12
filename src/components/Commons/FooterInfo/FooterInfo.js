import React, { Component } from "react";
import styled from "styled-components";
import { Container, Header, Grid } from "semantic-ui-react";

const FromFieldCard = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.3);
  padding: 40px;
  margin-bottom: 30px;
`;

const FormHeader = styled(Header) `
  position: relative;
  padding-right: 2.5rem !important;
  &::after{
    position: absolute;
    display: block;
    right: 2rem;
    content: "";
    height: 20px;
    border-right: 3px solid #191919;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Ul = styled.ul`
  margin: 15px 0;
  & li {
    font-weight: 600;
    height: 24px;
  }
`;

class FooterInfo extends Component {
  render() {
    return(
      <Container>
        <Header as='h1'>오픈디자인 소개</Header>
        <FromFieldCard>
          <Grid>
            <Grid.Column width={4}>
              <FormHeader as="h2">쉬운 디자인, <br></br>함께하는 디자인</FormHeader>
            </Grid.Column>
            <Grid.Column width={12}>
              <div>
                <p>
                  디자인은 인간의 창의성을 담는 그릇입니다. 창의력이 핵심 경쟁력이 될 미래는 디자인 중심 사회가 될 것입니다.<br></br>
                  세계 각국은 디자인의 중요성을 깨달아 디자인에 대한 투자를 늘리고 있지만 아직 대부분의 사람들에게 디자인은 어려운 분야입니다.<br></br>
                  사람들이 쉽게 디자인을 접하고, 경험하며, 배울 수 있는 디자인 인프라 구축이 중요한 시점입니다.
                </p>
                <p>
                  오픈 디자인은 “쉬운 디자인, 함께하는 디자인”을 추구하는 웹 사이트입니다.<br></br>
                  누구나 쉽고, 재미있게, 시간과 장소에 구애 받지 않고 함께 어울리며 디자인할 수 있는 환경을 만들고자 합니다.
                </p>
                <p>
                  우리 사이트에서는 디자인이 쉬워집니다.<br></br> 
                  기존의 디자인을 약간 수정하거나 보완하여 새로운 디자인을 만들고, 이를 다시 공유하는 디자인 공유 사이클이 활성화됩니다.<br></br>
                  간단한 디자인 모듈들을 조립하여 복잡한 디자인을 만들 수 있는 모듈형 디자인도 가능해집니다.
                </p>
                <p>
                  우리 사이트에서는 디자인이 재미있어집니다.<br></br> 
                  온라인 협업 디자인 환경을 제공하는 프로젝트 기능을 이용해서 언제, 어디서나, 누구와도 함께 어울리며 즐겁게 디자인을 경험하면서 배울 수 있습니다.<br></br>
                  디자인 공유 사이클이 활성화 되기 위해서는 디자인 아이디어의 공유 못지않게 디자인 과정에서의 산출물들을 포함하는 디자인 소스 공유가 중요합니다.
                </p>
                <p>
                  우리 사이트는 디자인 프로젝트를 이용하여 디자인 소스를 공유할 수 있도록 지원합니다.<br></br>
                  디자인 공유를 통해 오픈 소스 소프트웨어가 소프트웨어 분야에 미친 효과를 디자인 분야에도 가져올 수 있도록 노력할 것이며, 구체적으로 다음과 같은 효과를 기대합니다.
                </p>
                <Ul>
                  <li> * 개개인의 작은 디자인 아이디어가 모여 최고의 디자인으로 발전할 수 있습니다. (집단 지성)</li>
                  <li> * 사장될 수도 있는 개인의 디자인 아이디어가 다른 사람들에게 영감을 주어 디자인 생태계의 발전을 가져옵니다. (창의성 고양)</li>
                  <li> * 일반인들의 디자인에 대한 관심을 끌고 안목을 키워줄 수 있습니다.</li>
                  <li> * 디자인의 독창성, 우수성, 개선사항 등에 대한 다양한 분야의 전문가들의 평가와 조언을 즉각적으로 얻을 수 있습니다.</li>
                  <li> * 많은 발명이나 발견이 인류공영에 이바지 하였듯이 훌륭한 디자인이 수많은 사람들에게 혜택을 줄 수 있습니다.</li>
                </Ul>
                <p>
                  디자인에 대한 투자는 기술에 대한 투자보다 30배 이상의 이득이 있다고 합니다.<br></br> 
                  우리나라 디자인 산업 분야에서의 1% 생산성 증가가 1조원 이상의 가치를 창출합니다.<br></br> 
                  디자인 중심 사회가 될 미래에 핵심 가치를 창출할 수 있도록 여러분들의 적극적인 참여를 부탁 드립니다.
                </p>
              </div>
            </Grid.Column>
          </Grid>
        </FromFieldCard>
      </Container>
    );
  }
}

export default FooterInfo;
