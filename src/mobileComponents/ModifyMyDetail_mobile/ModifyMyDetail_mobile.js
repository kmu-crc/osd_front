import React, { Component } from "react";
import styled from 'styled-components';
import ContentBox from "components/Commons/ContentBox";
import noimg from "source/noimg.png";
import Loading from "components/Commons/Loading";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";

const Wrapper = styled.div`
  max-width:375px;
  width:100%;
  padding:0px 10px 10px 10px;
  .header{
    width:100%;
    font-size:${market_style.font.size.normal3};
    font-weight:800;
    color:#c1c1c1;
    text-align:center;
    margin-bottom:10px;
    margin-top:1px;
  }
  .row{
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:10px;
    .label{
      width:106px;
      padding-left:10px;
      font-size:${market_style.font.size.small1};
      font-weight:500;
      color:black;
    }
  }
`
const Profile = styled.div`
  width:100%;
  height:170px;
  border-radius:10px;
  padding:10px 15px;
  display:flex;
  align-items:center;
  box-shadow: 2px 2px 5px #00000029;
  border:1px solid #eaeaea;
  border-radius:10px;
  margin-bottom:30px;
  .thumbnail{
    min-width:150px;
    min-height:150px;
    border-radius:50%;
    background-image:url(${props=>props.thumbnail});
    background-size:cover;
  }
  .redButton{
    margin-left:13px;
    width:162px;
    height:30px;
    border-radius:10px;
    border:2px solid red;
    display:flex;
    align-items:center;
    justify-content:center;
    color:red;
    font-size:${market_style.font.size.small1};
  }
`
const InputText = styled.input`
  width:249px;
  max-width:270px;
  height:30px;
  background-color:#E9E9E9;
  border:none;
  border-radius:22px;
  outline:none;
  padding:5px 13px;
`
const RedButton = styled.div`
  width:${props=>props.width==null?"100%":props.width+"%"};
  height:35px;
  display:flex;
  border-radius:10px;
  box-shadow: 2px 2px 3px #00000019;
  justify-content:center;
  align-items:center;
  background-color:red;
  color:white;
  font-size:${market_style.font.size.small1};
  font-weight:800;
  margin-top:30px;
`
class ModifyMyDetail_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      nickName: "",
      password: "",
      passwordCheck: "",
      phone: "",
      thumbnail: null,
      thumbnail_name: null,
      isModify:false,
    }
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
  };
  componentWillUpdate(prevProps) {
    if (this.props.MyDetail !== prevProps.MyDetail) {
      const { MyDetail } = this.props;
      const newInfo = { nickName: MyDetail.nick_name, thumbnail: MyDetail.thumbnail, phone: MyDetail.phone };
      this.setState(newInfo);
    };
    return true;
  };
  checkModify =()=>{
    if(this.props.nick_name != this.state.nickName||
      this.state.password!=""||
      this.props.phone!=this.state.phone||
      this.props.thumbnail!=this.state.thumbnail){
        this.setState({isModify:true});
      }
  }
  async handleOnChangeThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(file);
    }
    await this.checkModify();
  };
  onClickCancel(event) {
    window.location.href = "/mypage"
  };
  onSubmit = async e => {
    this.setState({ loading: true });
    e.preventDefault();

    if (this.state.password !== this.state.passwordCheck) {
      await alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }
    let data = null
    if (this.state.nickName !== this.props.MyDetail.nick_name) {
      data = { ...data, nick_name: this.state.nickName };
    }
    if (this.state.password) {
      data = { ...data, password: this.state.password };
    }
    if (this.state.phone !== this.props.MyDetail.phone) {
      data = { ...data, phone: this.state.phone };
    }
    if (this.state.thumbnail_name != null) {
      let file = { value: this.state.thumbnail, name: this.state.thumbnail_name, key: 0 };
      data = { ...data, files: [] };
      data.files.push(file);
    }
    if (data == null) {
      await alert("변경된사항이 없습니다.");
      this.setState({
        loading: false
      });
      return;
    }
    this.props.ModifyUserDetailRequest(this.props.MyDetail.uid, data, this.props.token)
      .then(async res => {
        if (res.res.success) {
          await alert("정보가 수정되었습니다.");
          window.location.href = `/myPage`;
        } else {
          await alert("다시 시도해주세요");
        }
      })
      .catch(async e => {
        console.log("실패", e);
        await alert("다시 시도해주세요");
      });
    this.setState({
      loading: false
    });
  };
  async onChangeValue(event) {
    await this.setState({ [event.target.id]: event.target.value });
    await this.checkModify();
  };
  async onChangePhone(event) {
    const index = event.target.value.length > 1 ? event.target.value.length - 1 : 0
    "0123456789".includes(event.target.value[index]) ?
    this.onChangeValue(event) :
    await alert("숫자만 입력가능합니다.");
      
  }

  render() {
    console.log("!!!!", this.props.MyDetail);

    return (
      <React.Fragment>
        <Wrapper>
          <div className="header">내 정보</div>
          <Profile thumbnail={this.state.thumbnail}>
            <div className="thumbnail"/>
            <input hidden onChange={this.handleOnChangeThumbnail} id="file_" type="file" />
            <label htmlFor="file_">
            <div className="redButton">썸네일 등록</div>
            </label>
          </Profile>
          <div className="row">
            <div className="label">닉네임</div>
            <InputText id="nickName"
                       value={this.state.nickName || ""}
                       placeholder="닉네임을 입력하세요."
                       onChange={this.onChangeValue}/>
          </div>
          <div className="row">
            <div className="label">비밀번호</div>
            <InputText type="password"
                       id="password"
                       width={"417px"}
                       value={this.state.password || ""}
                       placeholder="비밀번호를 입력하세요."
                       onChange={this.onChangeValue}/>
          </div>
          <div className="row">
            <div className="label">비밀번호 확인</div>
            <InputText id="passwordCheck"
                       width={"417px"}
                       type="password"
                       value={this.state.passwordCheck || ""}
                       placeholder="비밀번호를 한번 더 입력하세요."
                       onChange={this.onChangeValue}/>
          </div>
          <div className="row">
            <div className="label">휴대폰 번호</div>
            <InputText id="phone"
                      width={"417px"}
                      value={this.state.phone || ""}
                      placeholder="휴대폰 번호를 입력하세요."
                      onChange={this.onChangePhone}/>
          </div>
          <RedButton onClick={this.onSubmit}>수정하기</RedButton>
        </Wrapper>
      </React.Fragment>
    );
  };
}

export default ModifyMyDetail_mobile;



{/* <Wrapper>

{this.state.loading ? <Loading /> : null}

<MainBox>
  <div className="title_">내 정보 수정</div>
  <div className="lineBox"><div className="line"/></div>
  <div className="contentsBox_">
    <ThumbnailBox>
      <input hidden onChange={this.handleOnChangeThumbnail} id="file_" type="file" />
      <div className="label">썸네일 등록</div>
      <label htmlFor="file_">
        {this.state.thumbnail == null ?
          <div className="thumbnail"><div>첨부</div></div>
          :
          <Thumbnail imageURL={this.state.thumbnail} />
        }
      </label>
    </ThumbnailBox>
    <FormBox>

      <div className="wrapper flex">
        <div className="label">닉네임</div>
        <InputTextBox
          id="nickName"
          width={"417px"}
          value={this.state.nickName || ""}
          placeholder="닉네임을 입력하세요."
          onChange={this.onChangeValue} />
      </div>
      <div className="wrapper flex">
        <div className="label">비밀번호</div>
        <InputTextBox type="password"
          id="password"
          width={"417px"}
          value={this.state.password || ""}
          placeholder="비밀번호를 입력하세요."
          onChange={this.onChangeValue} />
      </div>
      <div className="wrapper flex">
        <div className="label">비밀번호 확인</div>
        <InputTextBox
          id="passwordCheck"
          width={"417px"}
          type="password"
          value={this.state.passwordCheck || ""}
          placeholder="비밀번호를 한번 더 입력하세요."
          onChange={this.onChangeValue} />
      </div>
      <div className="wrapper flex">
        <div className="label">휴대폰</div>
        <InputTextBox
          id="phone"
          width={"417px"}
          value={this.state.phone || ""}
          placeholder="휴대폰 번호를 입력하세요."
          onChange={this.onChangePhone} />
      </div>
    </FormBox>

  </div>

  <div className="contentsBox_ flexEnd marginTop">
    <RedButton width={150} height={30} fontSize={market_style.font.size.normal1} marginRight={0} disabled={!this.state.isModify} text="수정된 내용을 저장합니다." okText="확인" cancelText="취소" value={"수정하기"} onClick={this.onSubmit} isConfirm={this.state.isModify} />
  </div>
</MainBox>
</Wrapper> */}
