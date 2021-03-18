import opendesign_style from 'opendesign_style';
import React from 'react';
// import { connect } from 'react-redux';

function isValidJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

class CodeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { code: [] }
    }
    componentDidMount() {
        const code = localStorage.getItem('code');
        // console.log(code);
        if (isValidJson(code)) {
            this.setState({ code: JSON.parse(code) });
        }
    }
    componentWillUnmount() {
        localStorage.removeItem('code');
    }
    render() {
        const { code } = this.state;
        return (<div
            style={{
                // height: "100%", overflowY: "scroll"
                position: "absolute", left: 0, top: 0,
                width: "100%", height: "100%",
                // backgroundColor: "yellow",
                overflowY: "scroll",
                padding: "25px",
            }}>
            {code && code.length > 0 ? code.map((item, index) => {
                console.log(item.code);
                return (<div style={{ minWidth: "max-content", maxWidth: "100%", padding: "25px" }} key={index}>
                    <h3 style={{ marginLeft: "25px" }}>{item.file_name}</h3>
                    <div style={{ backgroundColor: "#EFEFEF", padding: "15px", color: "#707070", fontSize: "1.25rem", }}>
                        <pre style={{ minWidth: "max-content" }}>{item.code}</pre>
                    </div>
                </div>)
            }) : null}

            <div onClick={() => window.close()} style={{ cursor: "pointer", width: "max-content", margin: "auto", }}>
                <p style={{ padding: "5px 13px", color: "white", borderRadius: "18px", backgroundColor: "red", }}>
                    닫기</p></div>
        </div>)
    }
}
class CodeViewContainer extends React.Component {
    render() {
        return (<CodeView {...this.props} />);
    }
}
// const mapStateToProps = state => {
// return {
// code: state.Problem.code,
// }
// };

export default CodeViewContainer;
// export default connect(mapStateToProps, null)(CodeViewContainer)


