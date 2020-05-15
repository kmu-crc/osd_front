import React, { Component } from 'react';
import styled, { keyframes } from "styled-components";
import { setCookie, getCookie /*, SetSession*/ } from "modules/Sessions";
import StyleGuide from "opendesign_style";
import host, { geturl } from "config";

const keyframe = keyframes`
  0% {
    height: 0px;
  }
  100% {
    height: 75px;
  }
`;
const NoticeWrapper = styled.header`
  animation: ${keyframe} 0.4s ease-in-out;
  visibility: ${props => props.visible};
  width: 100%;
  top: 0;
  position: fixed;
  z-index: 1001;
  color: ${StyleGuide.color.grayScale.scale9};
  background-color: #F2A3A9;
  .buttons{
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 3px 3px 3px 3px;
    color: white;
  }
  .text {
    color: white;
    text-align: center;
    padding: 5px;
  }
  button{
    border: none;
    color: white;
    background-color:${StyleGuide.color.main.dark};
  }
`;

class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = { notice: [], blacklist: ["SignIn", "SignUp"] }
        this.close = this.close.bind(this);
        this.getNotice = this.getNotice.bind(this);
    }
    componentDidMount() {
        this.getNotice();
    }
    getNotice = () => {
        return new Promise((resolve) => {
            const url = `${host}/common/notice`;
            fetch(url,
                { headers: { "Content-Type": "application/json" }, method: "get" })
                .then(res =>
                    res.json())
                .then(data =>
                    this.setState({ notice: data || [] }))
                .catch(err =>
                    console.error(err));
            resolve(true);
        });
    }
    close = (noti) => (e) => {
        var dif = Math.abs(new Date(noti.expiry_time) - new Date()) / (1000 * 60 * 60 * 24)
        this.refs[noti.uid].checked && setCookie('noti_' + noti.uid, 'hidden' + noti.uid, parseInt(dif, 10) + 1)
        const { notice } = this.state;
        for (var i = 0; i < notice.length; i++) {
            if (notice[i].uid === noti.uid) {
                notice[i].visible = "hidden";
            }
        }
        this.setState({ notice: notice });
    }
    render() {
        const { notice, blacklist } = this.state;
        const whereami = window.location.href.replace(`${geturl()}/`, "");
        console.log(this.state.notice);
        // const now = new Date();
        // console.log(// new Date().getTime() // new Date(notifi.expiry_time).getTime());

        return (
            <React.Fragment>
                {notice && notice.length > 0
                    && blacklist.includes(whereami) === false
                    && notice.map(notifi => {
                        let startDif = Math.floor((new Date()-new Date(notifi.start_time)) / (1000 * 60 * 60 * 24));
                        let endDif = Math.ceil((new Date(notifi.expiry_time)-new Date()) / (1000 * 60 * 60 * 24));
                        console.log(startDif,endDif);

                        return (getCookie('noti_' + notifi.uid)) ? null :
                        startDif>=0&&endDif>=0&&(
                            <NoticeWrapper visible={notifi.visible || "visible"} key={notifi.uid} >
                                <div className="text" dangerouslySetInnerHTML={{ __html: notifi.content }}></div>
                                <div className="buttons">
                                    <label>
                                        <input type="checkbox" name={notifi.uid} ref={notifi.uid} /> 그만보기
                                    </label>
                                    <button type="button" onClick={this.close(notifi)} >닫기</button>
                                </div>
                            </NoticeWrapper>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}
export default Notice; 