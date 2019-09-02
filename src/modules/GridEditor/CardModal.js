import React, { Component } from 'react'
import styled from 'styled-components'
import arrow from "source/arrow.svg"
import Cross from "components/Commons/Cross"
import { Modal } from 'semantic-ui-react'
import CardSourceDetailContainer from 'containers/Designs/CardSourceDetailContainer';
import DateFormat from "modules/DateFormat";


const CardDialog = styled(Modal)`
    min-width: 1530px;
    height: max-content;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #000000;
    border: 1px solid #EFEFEF;
    border-radius: 10px;
    opacity: 1;
    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    } 
    .content{
        padding: 25px;
        line-height: 17px;
    }
`
class CardModal extends Component {
    constructor(props) {
        super(props);
        this.state = { sroll: false };
        this.moveCard = this.moveCard.bind(this);
    }
    componentDidMount() {
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }
    moveCard() {
        // this.props.
    }
    onSubmit = () => { }
    onClose = () => { this.props.close() }
    render() {
        console.log("card-data:", this.props, this.props.row, this.props.maxRow)
        const card = this.props.card || { title: "사용자 메뉴얼 디자인 등록 01", userName: "진아진아진아" }
        const movablePrev = this.props.row > 0
        const movableNext = this.props.row < this.props.maxRow - 1
        return (
            <>
                <CardDialog open={this.props.open} onClose={this.onClose}>
                    {movablePrev && <div style={{ width: "115px", height: "813.28px", position: "fixed", left: "0%", marginLeft: "-195px", marginTop: "75.7px", borderRadius: "0px 10px 10px 0px", backgroundColor: "#FFFFFF" }} />}
                    {movablePrev && <div style={{ position: "absolute", left: "0%", marginTop: "409.81px", marginLeft: "-47px", width: "14px", height: "47px", backgroundImage: `url(${arrow})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>}
                    {movableNext && <div style={{ width: "115px", height: "813.28px", position: "absolute", left: "100%", marginLeft: "80px", marginTop: "75.7px", borderRadius: "10px 0px 0px 10px", backgroundColor: "#FFFFFF" }} />}
                    {movableNext && <div style={{ position: "absolute", left: "100%", marginTop: "409.81px", marginLeft: "33px", width: "14px", height: "47px", backgroundImage: `url(${arrow})`, WebkitTransform: "rotate(180deg)", transform: "rotate(180deg)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>}
                    <div onClick={this.onClose} style={{ position: "absolute", left: "100%", marginTop: "-32.07px", marginLeft: "111.85px" }}>
                        <Cross angle={45} color={"#707070"} weight={3} width={22.33} height={22.33} />
                    </div>
                    <div style={{ width: "1000px", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px", marginLeft: "52px", marginTop: "29.78px" }}>{card.title}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "300", lineHeight: "29px", paddingLeft: "52px", marginTop: "30px" }}>
                        <div>{card.nick_name}</div><div style={{ marginRight: "75px" }}>({DateFormat(card.update_time)})</div>
                    </div>
                    <div style={{ width: "1492px", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px", marginLeft: "52px", marginTop: "30.5px", paddingRight: "25px" }}><div style={{ borderBottom: "1px solid #707070", width: "1400px" }} /></div>
                    <div className="content" >
                        <CardSourceDetailContainer
                            uid={card.uid}
                            isTeam={this.props.isTeam}
                            edit={this.state.edit}
                            closeEdit={this.onCloseEditMode}
                            openEdit={this.onChangeEditMode} />
                    </div>
                    {/* <div className="card-content" onMouseOut={() => { this.setState({ scroll: false }) }} onMouseOver={() => { this.setState({ scroll: true }) }} style={{ width: "100%", overflowY: this.state.scroll ? "scroll" : "hidden", overflowX: "hidden" }}> */}
                    <div style={{ width: "1492px", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px", marginLeft: "52px", marginTop: "30.5px", paddingRight: "25px" }}><div style={{ borderBottom: "1px solid #707070", width: "1400px" }} /></div>
                    <div style={{ fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px", marginLeft: "52px", marginTop: "43.5px" }}>
                        <div style={{ display: "flex" }}>
                            <div style={{ backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%", width: "58px", height: "58px" }} />
                            <div style={{ marginLeft: "24px" }}>
                                <div style={{ fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR" }}>진아진아진아</div>
                                <div style={{ marginTop: "8px", fontSize: "20px", fontWeight: "300", fontFamily: "Noto Sans KR" }}>잘 봤습니다.</div>
                            </div>
                            <div style={{ marginLeft: "26px", marginTop: "41px", display: "flex" }}>
                                <div style={{ height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070" }}>2시간</div>
                                <div style={{ marginLeft: "18px", height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070" }}>답글 달기</div></div>
                        </div>
                        <div style={{ marginBottom: "37px", display: "flex" }}>
                            <div style={{ backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%", width: "58px", height: "58px" }} />
                            <div style={{ marginLeft: "24px" }}>
                                <div style={{ fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR" }}>진아진아진아</div>
                                <div style={{ marginTop: "8px", fontSize: "20px", fontWeight: "300", fontFamily: "Noto Sans KR" }}>잘 봤습니다.</div>
                            </div>
                            <div style={{ marginLeft: "26px", marginTop: "41px", display: "flex" }}>
                                <div style={{ height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070" }}>2시간</div>
                                <div style={{ marginLeft: "18px", height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070" }}>답글 달기</div>
                            </div>
                        </div>
                        <div style={{ marginBottom: "30px", display: "flex" }}>
                            <div style={{ backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%", width: "58px", height: "58px" }} />
                            <div style={{ marginLeft: "24px" }}>
                                <div style={{ fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR" }}>진아진아진아</div>
                                <div style={{ marginTop: "8px", fontSize: "20px", fontWeight: "300", fontFamily: "Noto Sans KR" }}>잘 봤습니다.</div>
                            </div>
                            <div style={{ marginLeft: "26px", marginTop: "41px", display: "flex" }}>
                                <div style={{ height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070" }}>2시간</div>
                                <div style={{ marginLeft: "18px", height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070" }}>답글 달기</div>
                            </div>
                        </div>
                        <div style={{ marginBottom: "30px", marginLeft: "75px" }}>
                            <div style={{ display: "flex" }}>
                                <div style={{ backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%", width: "40px", height: "40px" }} />
                                <div style={{ marginLeft: "24px" }}>
                                    <div style={{ fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR" }}>진아진아진아</div>
                                    <div style={{ marginTop: "8px", fontSize: "20px", fontWeight: "300", fontFamily: "Noto Sans KR" }}>잘 봤습니다.</div>
                                </div>
                                <div style={{ marginLeft: "26px", marginTop: "41px", display: "flex" }}>
                                    <div style={{ height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070" }}>2시간</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginBottom: "30px", marginLeft: "75px" }}>
                            <div style={{ display: "flex" }}>
                                <div style={{ backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%", width: "40px", height: "40px" }} />
                                <div style={{ marginLeft: "24px" }}>
                                    <div style={{ fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR" }}>진아진아진아</div>
                                    <div style={{ marginTop: "8px", fontSize: "20px", fontWeight: "300", fontFamily: "Noto Sans KR" }}>잘 봤습니다.</div>
                                </div>
                                <div style={{ marginLeft: "26px", marginTop: "41px", display: "flex" }}>
                                    <div style={{ height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070" }}>2시간</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginBottom: "40px", marginLeft: "75px" }}>
                            <div style={{ display: "flex" }}>
                                <div style={{ backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%", width: "40px", height: "40px" }} />
                                <div style={{ marginLeft: "24px" }}>
                                    <div style={{ fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR" }}>답글 다는 중...</div>
                                    <div style={{ marginTop: "8px", fontSize: "20px", fontWeight: "300", backgroundColor: "#EFEFEF", borderRadius: "5px", fontFamily: "Noto Sans KR" }}>
                                        <input style={{ width: "100%", height: "100%", background: "transparent", border: "none", padding: "10px" }} />
                                    </div>
                                </div>
                                <div style={{ marginLeft: "26px", marginTop: "41px", display: "flex" }}>
                                    <div style={{ height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070" }}>게시</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginBottom: "37px", display: "flex" }}>
                            <div style={{ backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%", width: "58px", height: "58px" }} />
                            <div style={{ marginLeft: "26px", display: "flex" }}>
                                <div style={{ width: "827px", height: "58px", marginTop: "8px", fontSize: "20px", fontWeight: "300", backgroundColor: "#EFEFEF", borderRadius: "5px", fontFamily: "Noto Sans KR" }}>
                                    <input style={{ width: "100%", height: "100%", background: "transparent", border: "none", padding: "10px" }} />
                                </div><div style={{ marginLeft: "30px", height: "22px", fontSize: "20px", fontWeight: "300", textAlign: "left", color: "#707070" }}>게시</div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </CardDialog>
                <div style={{ width: "250px", height: "250px", backgroundColor: "white", borderRadius: "15px" }}></div>
            </>)
    }
}

export default CardModal;