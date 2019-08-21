import React, { Component } from "react";
import deleteItem from "source/deleteItem.png"
import SelectBox from "components/Commons/SelectBox"
import { CreateStep, CreateCard, TipDiv } from "modules/GridEditor"
const emptyCategory = [{ value: 0, text: "" }]
const scrollmenu = [{ txt: "기본 정보", tag: "#basics" }, { txt: "부가 정보", tag: "#additional" }, { txt: "단계/컨텐츠 정보", tag: "#contenteditor" }]

class CreateDesign extends Component {
  state = {
    loading: false, isPossibleNextStep: false, step: 2, /* 0: basics, 1: additional, 2: contents*/
    selectedCate1: null, selectedCate2: null,
    /* cate1: null, */ cate2: null
  }
  // setLoader = () => { this.setState({ loading: !this.state.loading }) }
  checkIsPossibleToGoNextStep = (step) => {

  }

  gotoPrevStep = () => {
    if (this.state.step === 0) {
      window.history.go(-1);
    }
    this.setState({ step: this.state.step - 1 });
  }
  gotoNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  }
  completeCreateDesign = () => {
    this.submit();
  }
  submit = () => {
    console.log("!!!");
  }
  selectedCate1 = (cate1) => {
    const cate2 = this.props.cate2[cate1.value]
    this.setState({ cate2: cate2, selectedCate2: cate2[0], selectedCate1: this.props.cate1[cate1.value] })
    console.log(cate2)
  }
  selectedCate2 = (cate2) => {
    if (cate2 === 0) {
      this.setState({ selectedCate2: null })
    }
    else {
      this.setState({ selectedCate2: cate2 })
    }
  }
  completed = () => {
    this.setState({ isPossibleNextStep: true })
  }
  render() {
    // const myInfo = this.props.MyDetail
    const SectionBasics = () => {
      return (
        <section style={{ paddingLeft: "55.5px" }} >
          {/* thumbnail */}
          <div style={{ width: "1200px" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "100px", height: "29px", lineHeight: "29px", fontSize: "20px", fontWeight: "500", color: "#707070", textAlign: "left" }}>섬네일 사진
              <input hidden type="file" value={null} />
              </div>
              <div style={{ marginLeft: "67px", width: "210px", height: "210px", borderRadius: "10px", backgroundColor: "#EFEFEF" }} />
              <div style={{ marginLeft: "54.5px", marginTop: "100px" }}>
                <div style={{ width: "63px", height: "25px", cursor: "pointer" }}>
                  <div style={{ fontWeight: "500", fontSize: "17px", borderBottom: "1.5px solid #FF0000", lineHeight: "25px", textAlign: "left", color: "#FF0000" }}>찾아보기</div></div>
                <div style={{ width: "341px", height: "45px", marginTop: "11px", fontWeight: "300", fontSize: "14px", lineHeight: "20px", textAlign: "left", color: "#707070" }}>프로필 사진은 대표적으로 보이게 되는 사진으로, JPG/<br />JPEG/PNG 파일을 등록 가능합니다.</div>
              </div>
            </div>
          </div>
          {/* title */}
          <div style={{ marginTop: "86px", width: "1544px" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "37px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>제목</div>
              <div style={{ marginLeft: "130px", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }} >
                <input type="text" style={{ outline: "none", marginLeft: "27px", marginTop: "12px", height: "29px", lineHeight: "29px", width: "451.5px", border: "none", color: "#707070", backgroundColor: "#EFEFEF" }} placeholder="디자인 제목을 입력하세요." />
              </div>
              <div style={{ marginTop: "16px", marginLeft: "27.5px", fontSize: "17px", fontWeight: "300", lineHeight: "25px", color: "#707070", width: "230px", height: "25px" }} />
            </div>
          </div>
          {/* description */}
          <div style={{ marginTop: "50px", display: "flex" }}>
            <div style={{ width: "97px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>디자인 설명</div>
            <div style={{ width: "717.5px", height: "244px", marginLeft: "70px", backgroundColor: "#EFEFEF", borderRadius: "5px", marginTop: "14px", }}>
              <textarea style={{
                width: "717.5px", height: "244px", backgroundColor: "#EFEFEF", outline: "none", border: "none", resize: "none", lineHeight: "35px",
                textAlign: "left", fontSize: "20px", fontWeight: "300", color: "#707070", paddingTop: "26px", paddingLeft: "22px", paddingBottom: "34px", paddingRight: "32.5px"
              }} placeholder="디자인에 대한 설명을 입력하세요." />
            </div>
          </div>
        </section>
      )
    }
    const Peer = () => {
      return (<div style={{ display: "flex", marginRight: "50px" }}>
        <div style={{ backgroundImage: `url(${this.state.url})`, backgroundColor: "#D6D6D6", width: "30px", height: "30px", borderRadius: "50%" }} />
        <div style={{ marginTop: "1px", marginLeft: "10px", fontSize: "20px", lineHeight: "29px", textAlign: "left", fontWeight: "500", fontFamily: "Noto Sans KR", color: "#707070", width: "112px", height: "29px" }}>진아진아진아</div>
        <img alt={"delete"} src={deleteItem} style={{ marginTop: "7.34px", marginLeft: "13.86px", width: "16px", height: "16px" }} />
      </div>)
    }
    const SectionAdditional = () => {
      return (
        <>
          {this.props.cate1.length > 0 ?
            <section style={{ marginBottom: "16px", paddingLeft: "52px" }} >
              {/* category */}
              <div style={{ display: "flex" }}>
                <div style={{ width: "74px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>카테고리</div>
                <div style={{ marginLeft: "98px", marginTop: "4px", width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }}>
                  <SelectBox onSelectedItem={this.selectedCate1} default={this.state.selectedCate1} items={this.props.cate1} width="410" /></div>
                <div style={{ marginLeft: "30px", marginTop: "4px", width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }}>
                  <SelectBox onSelectedItem={this.selectedCate2} default={this.state.selectedCate2} items={this.state.cate2 || emptyCategory} width="410" /></div>
              </div>
              {/* invite member*/}
              <div style={{ marginTop: "107px", display: "flex" }}>
                <div style={{ width: "115px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070", textAlign: "left" }}>맴버 초대하기</div>
                <div style={{ marginLeft: "52px", width: "645px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }} >
                  <input type="text" style={{ outline: "none", marginLeft: "27px", marginTop: "12px", height: "29px", lineHeight: "29px", width: "451.5px", border: "none", color: "#707070", backgroundColor: "#EFEFEF" }} placeholder="닉네임을 검색해 주세요" />
                </div>
                <div style={{ marginLeft: "20px", width: "27px", height: "25px", fontSize: "17px", lineHeight: "25px", fontWeight: "500", color: "#FF0000", textAlign: "left" }}>TIP</div>
                <div style={{ marginLeft: "17px", width: "457px", height: "75px", fontSize: "17px", lineHeight: "25px", fontWeight: "100", color: "#707070", textAlign: "left" }}>함께 디자인을 만들어 갈 멤버를 초대해 주세요.<br />초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.<br />디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수 있습니다.</div>
              </div>
              {/* invited member*/}
              <div style={{ marginTop: "20px", marginLeft: "167px" }}>
                <div style={{ display: "flex", marginBottom: "34px" }}><Peer /><Peer /><Peer /></div>
                <div style={{ display: "flex" }}><Peer /><Peer /><Peer /></div>
              </div>
              {/* hr line */}
              <div style={{ width: "1318px", marginTop: "122.5px", border: "2.5px solid #EFEFEF" }} />
              <div style={{ marginTop: "150.5px", marginLeft: "auto", marginRight: "52px", width: "545px", height: "69px", textAlign: "right", fontWeight: "300", fontSize: "20px", lineHeight: "40px", fontFamily: "Noto Sans KR", letterSpacing: "0", color: "#FF0000", opacity: "1" }} >마지막 단계만이 남아있습니다!<br />단계 / 컨텐츠 정보 탭에서 기본적인 디자인의 뼈대를 구성해 주세요</div>
            </section>
            : <p>카테고리를 가져오고 있습니다.</p>}
        </>
      )
    }
    const SectionContentEditor = () => {
      return (
        <section style={{ paddingLeft: "51px", marginBottom: "204px" }} >
          <div style={{ display: "flex" }}>
            <div style={{ width: "200px", marginRight: "75px" }}></div>
            <div style={{ display: "flex" }}>
              <CreateStep marginRight="73px" onClick={() => { alert("??") }} step={"단계"} />
              <CreateStep marginRight="48px" disabled onClick={() => { alert("??") }} step={"단계"} />
              <TipDiv txt="디자인을 등록 후에도 단계 / 컨텐츠를 수정할 수 있습니다." />
            </div>
          </div>
          <div style={{ marginTop: "25px", marginBottom: "69.5px" }}>
            <div style={{ marginLeft: "358px", width: "31px", height: "27px", border: "1px dashed purple" }}>
              <i style={{ color: "#707070", fontSize: "25px" }} className="material-icons">arrow_drop_down</i>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div><CreateStep marginRight="73px" onClick={() => { alert("??") }} step={"단계"} /></div>
            <div><CreateCard marginRight="321px" onClick={this.completed} step={"카드"} /></div>
            <TipDiv txt="단계 없이 카드 하나만으로도 등록이 가능합니다." />
          </div>
          <div style={{ display: "flex" }}>
            <div><CreateStep marginRight="73px" disabled onClick={() => { alert("??") }} step={"단계"} /></div>
            <div></div>
            <div></div>
          </div>
        </section>
      )
    }
    const { step } = this.state
    return (<>
      <div style={{ width: "1920px", display: "flex", justifyContent: "center" }}>
        <div style={{ marginTop: "45px", width: "196px", height: "37px", fontFamily: "Noto Sans KR", fontSize: "25px", fontWeight: "700", lineHeight: "37px", textAlign: "center", color: "#707070" }}>디자인 등록하기</div>
      </div>
      <div style={{ display: "flex", marginTop: "60px", marginBottom: "111px" }}>
        {/* scroll - menu */}
        <div style={{ width: "325px", marginLeft: "64px" }}>
          <div style={{ position: "fixed", top: "197px", width: "325px", height: "190px", backgroundColor: "#F5F4F4", borderRadius: "5px" }}>
            {scrollmenu.map((menu, index) => {
              return (<div onClick={() => this.gotoStep(menu, index)} style={{ cursor: "pointer", height: "62px", lineHeight: "29px", borderBottom: index + 1 === scrollmenu.length ? "none" : "2px solid #FFFFFF", paddingTop: "18px", paddingLeft: "36px" }} key={menu.txt}>
                <div style={{ color: this.state.step === index ? "#FF0000" : "#707070", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "300", textAlign: "left" }}>{menu.txt}</div>
              </div>)
            })}
          </div>
        </div>
        {/* form */}
        <div style={{ width: "1422px", marginLeft: "45px", height: "871px", borderRadius: "5px", border: "8px solid #F5F4F4", paddingTop: "46px" }}>
          <form>
            {step === 0 && <SectionBasics />}
            {step === 1 && <SectionAdditional />}
            {step === 2 && <SectionContentEditor />}

            {/* buttons*/}
            <div style={{ marginTop: "20.54px", justifyContent: "flex-end", display: "flex" }}>
              {step === 0
                ? null
                : <div onClick={this.gotoPrevStep} style={{ cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: "#FF0000", paddingTop: "6px", paddingLeft: "15px", marginRight: "15px" }}><p style={{ width: "74px", padding: "0px", fontFamilty: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", textAlign: "center", fontSize: "20px", color: "#FFFFFF" }}>뒤로</p></div>}
              {step === 2
                ? <div onClick={this.state.isPossibleNextStep ? this.completeCreateDesign : null} style={{ cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: this.state.isPossibleNextStep ? "#FF0000" : "#707070", paddingTop: "6px", paddingLeft: "15px", marginRight: "53px" }}>
                  <p style={{ width: "74px", padding: "0px", fontFamilty: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", textAlign: "center", fontSize: "20px", color: "#FFFFFF" }}>완료</p></div>
                : <div onClick={this.state.isPossibleNextStep ? this.gotoNextStep : null} style={{ cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: this.state.isPossibleNextStep ? "#FF0000" : "#707070", paddingTop: "6px", paddingLeft: "15px", marginRight: "53px" }}>
                  <p style={{ width: "74px", padding: "0px", fontFamilty: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", textAlign: "center", fontSize: "20px", color: "#FFFFFF" }}>다음</p>
                </div>
              }
            </div>
          </form>
        </div>
      </div>
    </>)
  }
}

export default CreateDesign;
