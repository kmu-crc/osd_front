import React, { Component } from "react";
import styled from 'styled-components';
import ContentBox from "components/Commons/ContentBox";
import noimg from "source/noimg.png";
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import Loading from "components/Commons/Loading";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";


const Wrapper = styled(ContentBox)`
  width:100%;
  position: relative;
  padding-left:54px;
  padding-right:54px;
  z-index:3;
`;
const MainBox = styled.div`
  width:100%;
  .title{
    width:170px;
    height:29px;
    font-family:Noto Sans KR, Medium;
    font-size:${market_style.font.size.normal1};
    font-weight:500;
  }
  .contentsBox{
    width:100%;
    display:flex;
    justify-content:flex-end;
    margin-top:15px;
  }
`;
const InputTextBox = styled.input`
  border:none;
  width: ${props => props.width || "100%"};
  height:30px;
  padding:9px 20px;
  background-color:#E9E9E9;
  border-radius:26px;
  display:flex;
  justify-content:center;
  outline:none;
  color:#060000;
`;
const ThumbnailBox = styled.div`
  *{
    font-family:Noto Sans KR;
  }
  width:300px;
  height:300px;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding:24px 40px 24px 40px;
  .label{
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:${market_style.font.size.small1}
    color:black;
    font-weight:500;
    margin-bottom:10px;
  }
  .thumbnail{
    cursor:pointer;
    width:220px;
    height:220px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#E9E9E9;
    border-radius:50%;
    margin-left:auto;
    margin-right:auto;
  }
`;
const Thumbnail = styled.div`
  cursor:pointer;
  width:220px;
  height:220px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-image: ${props => `url(${props.imageURL == null ? noimg : props.imageURL})`};
  background-size: cover;
  background-position: center center;
  border-radius:50%;
`;
const FormBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-size:${market_style.font.size.small1};
  }
  margin-left:102px;
  margin-top:85px;
  .wrapper{
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:10px;
  }
  .wrapper_noflex{
    width:100%;
    margin-bottom:70px;
  }
  .margin_zero{
    margin:0px;
  }
  .margin_bottom{
    margin-bottom:30px;
  }
  .flex{
    display:flex;
  }
  .innerWraper{
    width:100%;
    margin-bottom:26px;
    display:flex;
  }
  .label{
    min-width:136px;
    height:29px;
  }
  .label_centering{
    text-align:center;
  }
  .index{
    width:30px;
    height:30px;
    color:#707070;
  }

`;
const Margin = styled.div`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"}
`;

class ModifyMyDetail extends Component {
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

      <Wrapper>

        {this.state.loading ? <Loading /> : null}

        <MainBox>
          <div className="title">내 정보 수정</div>
          <div className="contentsBox">
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
                  width={"300px"}
                  value={this.state.nickName || ""}
                  placeholder="닉네임을 입력하세요."
                  onChange={this.onChangeValue} />
              </div>
              <div className="wrapper flex">
                <div className="label">비밀번호</div>
                <InputTextBox type="password"
                  id="password"
                  width={"300px"}
                  value={this.state.password || ""}
                  placeholder="비밀번호를 입력하세요."
                  onChange={this.onChangeValue} />
              </div>
              <div className="wrapper flex">
                <div className="label">비밀번호 확인</div>
                <InputTextBox
                  id="passwordCheck"
                  width={"300px"}
                  type="password"
                  value={this.state.passwordCheck || ""}
                  placeholder="비밀번호를 한번 더 입력하세요."
                  onChange={this.onChangeValue} />
              </div>
              <div className="wrapper flex">
                <div className="label">휴대폰</div>
                <InputTextBox
                  id="phone"
                  width={"300px"}
                  value={this.state.phone || ""}
                  placeholder="휴대폰 번호를 입력하세요."
                  onChange={this.onChangePhone} />
              </div>
            </FormBox>

          </div>

          <div className="contentsBox">
            {/* <RedButton onClick={this.onSubmit} left={223} bottom={0}><div>적용</div></RedButton> */}
            {/* <RedButton disabled={!this.state.isModify} text="수정된 내용을 저장합니다." okText="확인" cancelText="취소" value={"저장하기"} onClick={this.onSubmit} isConfirm={this.state.isModify} /> */}
            {/* <GrayButton text={"수정된 내용이 저장되지 않습니다."} okText="확인" cancelText="취소" value={"취소하기"} onClick={this.onClickCancel} isConfirm={this.state.isModify} /> */}
          </div>
        </MainBox>
      </Wrapper>
    );
  };
}

export default ModifyMyDetail;
