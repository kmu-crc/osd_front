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
        return (<React.Fragment>
            {code && code.length > 0 ? code.map((item, index) => {
                console.log(item.code);
                return (<div key={index}>
                    <h3 style={{ marginTop: "25px", marginLeft: "25px" }}>{item.file_name}</h3>
                    <div style={{ backgroundColor: "#EFEFEF", padding: "15px", margin: "25px", color: "#707070", fontSize: "1.25rem" }}>
                        <pre>{item.code}</pre>
                    </div>
                </div>)
            }) : null}

            <div onClick={() => window.close()} style={{ width: "max-content", margin: "auto", }}>
                <p style={{ padding: "5px 13px", color: "white", borderRadius: "18px", backgroundColor: "red", }}>
                    닫기</p></div>
        </React.Fragment >)
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
