import React, { Component } from "react";
// import host from "config";
import styled from "styled-components";
import { StepCard, CreateStep, CreateCard, } from "components/Designs/GridEditor";
import arrow from "source/arrow.svg";

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

    padding-top: ${props => props.mobile ? 0 : 35}px;
    .steps {
        display: flex;
    }
    .step {
        margin-right: 10px;
    }
    .create-step {
        margin-top: 10px;
        width: max-content;
    }
`;
const EditorWrapperMobile = styled.div`
    margin-top: 10px;
    padding-bottom: 5px;
    width: 100%;

    .step-wrapper {
        width: max-content;
        margin: auto;
        position: relative;
        display: flex;
        flex-direction: row;

        .more-button {
          position: absolute;
          right: -50px;
        }
        .more-menu {
          position: absolute;
          border: 2px solid #707070;
          border-radius: 5px;
          box-shadow: 2.5px 2.5px #EFEFEF;
          background-color: white;
          width: 150px;
          right: -50px;
          top: 30px;
          display: none;
          ul {
            text-align: center;
            margin: 0;
            padding: 0;
            list-style: none;
          }
          li {
              padding: 10px;
              font-size: 1rem;
              color: #707070;
              font-weight: 500;
          }
          &.active {
            display: block;
          }
        }
    }
    .navigation {
        position: relative;
        .normal {
            position: absolute;
            top: 50px;
        }
        .left {
            left: 5px;
        }
        .right {
            right: 5px;
        }
    }
    .cards-wrapper {
        width: max-content;
        margin: auto;
        .card {
            margin: 15px;
        }
    }
`;
const Arrow = styled.div`
    width: 17px;
    height: 48px;
    z-index: 831;
    border: none;
    background-image: url(${arrow});
    background-size: cover;
    background-position: 50%;
    transform: rotate(${props => props.angle});
    opacity: 0.9;
    cursor:pointer;

    :hover{
        opacity: 1;
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
        this.state = { steps: [], step: 0 };
        this.getTempTemplate = this.getTempTemplate.bind(this);
        this.changeStep = this.changeStep.bind(this);
    };
    componentDidMount() {
        // this.getAllTemplate();
        this.getTempTemplate();
    }
    // navigation
    changeStep(offset) {
        this.setState({ step: this.state.step + offset, });
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.type !== prevProps.type) {
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

    render() {
        const { mobile } = this.props;
        const { steps, step } = this.state;

        return (<EditorWrapper mobile={mobile}>
            {mobile
                ?
                <EditorWrapperMobile>
                    {/* step */}
                    <div className="step-wrapper">
                        {step === steps.length ?
                            <CreateStep />
                            :
                            <StepCard
                                title={(steps && steps[step].title) || "제목없음"}
                                marginTop={0} marginLeft={0} marginBottom={10} marginRight={0}
                            />}
                    </div>

                    {/* navigation */}
                    <div className="navigation">
                        {step > 0
                            ? <div className="normal left">
                                <Arrow angle="0deg" onClick={() => this.changeStep(-1)} />
                            </div> : null}
                        {step < steps.length - 1 //(steps && steps.length || 0)
                            ? <div className="normal right">
                                <Arrow angle="180deg" onClick={() => this.changeStep(+1)} />
                            </div> : null}
                    </div>

                    {/* cards */}
                    <div id="cards-wrapper" className="cards-wrapper">
                        <div className="card">
                            <CreateCard
                                title={""} step={"카드 "}
                                marginTop={0} marginRight={0} marginBottom={0} marginLeft={0} />
                        </div>
                    </div>
                </EditorWrapperMobile>
                :
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
                    <div className="create-step">
                        <CreateStep />
                    </div>
                </div>}

        </EditorWrapper>);
    }
}

export default TemplateGridEditor;