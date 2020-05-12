import React, { Component } from "react";
// import host from "config";
import styled from "styled-components";
import { StepCard, CreateStep, CreateCard, } from "components/Designs/GridEditor";

const fashion = [
    { order: 0, title: "Ideation" },
    { order: 1, title: "Purpose" },
    { order: 2, title: "Design" },
    { order: 3, title: "Mock-up" },
    { order: 4, title: "Establish" },
];
const software = [
    { order: 0, title: "기획" },
    { order: 1, title: "요구사항 분석" },
    { order: 2, title: "소프트웨어 설계" },
    { order: 3, title: "시스템 구현" },
    { order: 4, title: "시스템 테스트 및 평가" },
];
const engineering = [
    { order: 0, title: "기획" },
    { order: 1, title: "시스템 분석" },
    { order: 2, title: "시스템 설계" },
    { order: 3, title: "시스템 구현" },
    { order: 4, title: "시스템 테스트 및 평가" },
];

const EditorWrapper = styled.div`
    padding-top: 35px;

    .steps {
        display: flex;
    }
    .step {
        margin-right: 10px;
    }
`;
const AsBelowArrow = styled.div`
    margin-left: ${props => props.marginLeft + "px" || "0px"};
    margin-top: ${props => props.marginTop + "px" || "0px"};
    margin-bottom: ${props => props.marginBottom + "px" || "0px"};
    width: ${props => props.percent * 100}px;
    height: ${props => props.percent * 65}px;
    background: #707070 0% 0% no-repeat padding-box;
    opacity: ${props => props.opacity};
    border-top: ${props => props.percent * 65}px solid ${props => props.color || "#707070"};
    border-left: ${props => props.percent * 50}px solid transparent;
    border-right:${props => props.percent * 50}px solid transparent;
    transform: rotate(${props => props.angle}deg);
`;
class TemplateGridEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { steps: [] };
        this.getTempTemplate = this.getTempTemplate.bind(this);
    }
    componentDidMount() {
        // this.getAllTemplate();
        this.getTempTemplate();
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.type != prevProps.type) {
            await this.getTempTemplate();
        }
    }
    getTempTemplate = async () => {
        const { type } = this.props;
        if (type === "empty") {
            await this.setState({ steps: [] });
            this.props.selected && this.props.selected(this.state.steps);
        } else if (type === "fashion") {
            await this.setState({ steps: fashion });
            this.props.selected && this.props.selected(this.state.steps);
        } else if (type === "engineering") {
            await this.setState({ steps: engineering });
            this.props.selected && this.props.selected(this.state.steps);
        } else if (type === "software") {
            await this.setState({ steps: software });
            this.props.selected && this.props.selected(this.state.steps);
        }
    }
    // getAllTemplate = async () => {
    //     const url = `${host}/design/createDesign/getAllTemplate`;
    //     await fetch(url, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             method: "GET"
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(res => res.success ?
    //             this.setState({ templates: res.data }) : alert("템플릿을 가져오지 못했습니다."))
    //         .catch(err => alert("500에러:", err));
    // }

    render() {
        const { type } = this.props;
        const { steps } = this.state;

        return (<EditorWrapper>

            <div>
                {type}</div>

            <div className="steps">
                {(steps && steps.length > 0)
                    ? steps.map((step, index) =>
                        <div key={step + index} className="step">
                            <StepCard title={step.title} />
                            <AsBelowArrow angle={0} percent={.25} marginTop={10} marginRight={0} marginBottom={10} marginLeft={85} />
                            <CreateCard />
                        </div>)
                    : null
                }
                <div style={{ width: "max-content" }}>
                    <CreateStep />
                </div>
            </div>

        </EditorWrapper>);
    }
}

export default TemplateGridEditor;