import React, { Component } from "react";
import SelectBox from "components/Commons/SelectBox"

const scrollmenu = [
  { txt: "기본 정보", tag: "#basics" }, { txt: "부가 정보", tag: "#additional" }, { txt: "단계/컨텐츠 정보", tag: "#contenteditor" }
]
class CreateDesign extends Component {
  state = {
    loading: false,
    step: 0 // 0: basics, 1: additional, 2: contents
  }

  setLoader = () => {this.setState({loading: !this.state.loading})}
gotoStep(){}
 render() {
    // const myInfo = this.props.MyDetail;
    const { selected } = this.state
    const SectionBasics = () => {
      return (
        <section style={{ paddingLeft: "55.5px" }} >
          {/* thumbnail */}
          <div style={{ width: "1200px" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "100px", height: "29px", lineHeight: "29px", fontSize: "20px", fontWeight: "500", color: "#707070", textAlign: "left" }}>섬네일 사진</div>
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
              <div style={{width: "37px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>제목</div>
              <div style={{ marginLeft: "130px", 
                width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px",
                fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070"
              }} >
                <input type="text" style={{ outline: "none", marginLeft: "27px", marginTop: "12px", height: "29px", lineHeight: "29px", width: "451.5px", border: "none", color: "#707070", backgroundColor: "#EFEFEF" }} placeholder="디자인 제목을 입력하세요." />
              </div>
              <div style={{ marginTop: "16px", marginLeft: "27.5px", fontSize: "17px", fontWeight: "300", lineHeight: "25px", color: "#707070", width: "230px", height: "25px" }}>
              </div>
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
    const SectionAdditional = () => {
      return (
        <section style={{ paddingLeft: "95.5px" }} >
          {/* category */}
          <div style={{ display: "flex" }}>
            <div style={{ width: "74px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>카테고리</div>
            <div style={{ marginLeft: "98px", marginTop: "4px", width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }}>
              <SelectBox items={this.props.cate1} width="410" /></div>
            <div style={{ marginLeft: "30px", marginTop: "4px", width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }}>
              <SelectBox items={this.props.cate1} width="410" /></div>
          </div>
        </section>
      )
    }    
    const SectionContentEditor = () => {
      return (
        <section style={{ paddingLeft: "95.5px" }} >
          {/* pw */}
          <div style={{ display: "flex" }}>
            <div style={{ width: "75px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>비밀번호</div>
            <div style={{
              marginLeft: "98px", marginTop: "9px",
              width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px",
              fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070"
            }} >
              <input type="password"
                style={{
                  outline: "none", border: "none",
                  marginLeft: "12px", marginTop: "13px",
                  width: "481.5px", height: "29px", lineHeight: "29px",
                  color: "#707070", backgroundColor: "#EFEFEF"
                }} placeholder="비밀번호를 입력하세요." />
            </div>
          </div>
          {/* pw verify */}
          <div style={{ marginTop: "55px", display: "flex" }}>
            <div style={{ width: "115px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>비밀번호 확인</div>
            <div style={{
              marginLeft: "60px", marginTop: "9px",
              width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px",
              fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070"
            }} >
              <input type="password" style={{
                outline: "none", border: "none",
                marginLeft: "12px", marginTop: "13px",
                width: "481.5px", height: "29px", lineHeight: "29px",
                color: "#707070", backgroundColor: "#EFEFEF"
              }} placeholder="비밀번호를 입력하세요." />
            </div>
          </div>
        </section>
      )
    }
    const {step} = this.state
    return (<>
      <div style={{ width: "1920px", display: "flex", justifyContent: "center" }}>
        <div style={{ marginTop: "45px", width: "196px", height: "37px", fontFamily: "Noto Sans KR", fontSize: "25px", fontWeight: "700", lineHeight: "37px", textAlign: "center", color: "#707070" }}>새 디자인 등록하기</div>
      </div>

      <div style={{ display: "flex", marginTop: "60px", marginBottom: "111px" }}>
        {/* scroll - menu */}
        <div style={{ width: "325px", marginLeft: "64px" }}>
          <div style={{ position: "fixed", top: "197px", width: "325px", height: "190px", backgroundColor: "#F5F4F4", borderRadius: "5px" }}>
            {scrollmenu.map((menu, index) => {
              return (<div onClick={() => this.gotoStep(menu, index)} style={{ cursor: "pointer", height: "62px", lineHeight: "29px", borderBottom: index + 1 === scrollmenu.length ? "none" : "2px solid #FFFFFF", paddingTop: "18px", paddingLeft: "36px" }} key={menu.txt}>
                <div style={{ color: selected === index ? "#FF0000" : "#707070", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "300", textAlign: "left" }}>{menu.txt}</div>
              </div>)
            })}
          </div>
        </div>
        {/* form */}
        <div style={{ width: "1422px", marginLeft:"45px", height: "871px", borderRadius: "5px", border: "8px solid #F5F4F4", paddingTop: "46px" }}>
          <form onSubmit={this.submit}>
            {step === 0 && <SectionBasics />}
            {step === 1 && <SectionAdditional/>}
            {step === 2 && <SectionContentEditor/>}
        {/* submit */}
            <div style={{ marginTop: "20.54px", justifyContent: "flex-end", display: "flex" }}>
              <div style={{ width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: "#FF0000", paddingTop: "6px", paddingLeft: "15px", marginRight: "53px" }}>
                <p style={{ width: "74px", padding: "0px", fontFamilty: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", textAlign: "center", fontSize: "20px", color: "#FFFFFF" }}>다음</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>)
  }
}

export default CreateDesign;
