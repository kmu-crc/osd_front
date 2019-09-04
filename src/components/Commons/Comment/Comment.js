import React, { Component, Fragment } from 'react';
import noface from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";

class Comment extends Component {
    state = { reply: false };
    reply = () => {
        this.setState({ reply: true });
    };
    requestReply = (data) => { };
    render() {
        const { reply } = this.state;
        return (<>
            {this.props.comment.map((item, index) => {
                return (<Fragment key={item.nick_name + index}>
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "58px", height: "58px", backgroundImage: `url(${item.s_img || noface})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "50%", backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%" }} />
                        <div style={{ marginLeft: "24px" }}>
                            <div style={{ fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR" }}>{item.nick_name}</div>
                            <div style={{ marginTop: "8px", fontSize: "20px", fontWeight: "300", fontFamily: "Noto Sans KR" }}>{item.comment}</div>
                        </div>
                        <div style={{ marginLeft: "26px", marginTop: "41px", display: "flex" }}>
                            <div style={{ height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070" }}>{DateFormat(item.create_time)}</div>
                            {!reply && <div onClick={this.reply} style={{ marginLeft: "18px", height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070", cursor: "pointer" }}>답글 달기</div>}
                        </div>
                    </div>
                    <div>
                        {reply && <div onClick={this.requestReply}>
                            <input style={{ width: "750px", height: "29px" }} />
                        </div>}
                    </div>
                </Fragment>)
            })
            }
            <div><input /></div>
        </>)
    }
}
export default Comment;
