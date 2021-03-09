import React, { Component } from 'react';
import styled from "styled-components";

import icon_goto_first from "source/page-left-double-arrow.svg";
import icon_goto_prev from "source/page-left-single-arrow.svg";
import icon_goto_next from "source/page-right-single-arrow.svg";
import icon_goto_end from "source/page-right-double-arrow.svg";

const PaginationContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;

// *{border: 1px solid red;}
*{cursor: default;}

.arrows {
  width: 62px;
  display: flex;
  flex-direction: row;
  *{
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .ll{
    margin-right: 22px;
  }
  .r {
    margin-left: 20px;
    margin-right: 22px;
  }
  .blank{
    background-image: none;
  }
}
.pages {
  width: 146px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;

  .page {
    width: 10px;
    height: 26px;
    text-align: left;
    font-size: 17px;
    // line-height: 35px;
    font-weight: medium;
    font-family: Noto Sans KR;
    letter-spacing: 0px;
    opacity: 1;
    color: #707070;

    &.active{
      color: #FF0000;
      text-decoration: underline;
    }
    margin-right: 38px;
    &.last{
      margin-right: 0px;
    }
  }
}




.ll {
  width: 14px;
  height: 13px;
  background-image: url(${icon_goto_first});
}
.l {
  width: 6px;
  height: 13px;
  background-image: url(${icon_goto_prev});
}
.r {
  width: 6px;
  height: 13px;
  background-image: url(${icon_goto_next});
}
.rr {
  width: 15px;
  height: 13px;
  background-image: url(${icon_goto_end});
}
`;
export default class PaginationOpenDesign extends Component {
    constructor(props) {
        super(props);
        this.state = { active: 1, group: 0, per: 3, pages: 1, groups: 1, refresh: false };
        this.gotoFirstGroup = this.gotoFirstGroup.bind(this);
        this.gotoFinalGroup = this.gotoFinalGroup.bind(this);
        this.prevGroup = this.prevGroup.bind(this);
        this.nextGroup = this.nextGroup.bind(this);
        this.selectedPage = this.selectedPage.bind(this);
        this.cb = this.cb.bind(this);
    }
    componentDidMount() {
        const pages = { pages: Math.ceil((this.props.count / this.props.per)) };
        const groups = { groups: Math.ceil(((this.props.count / this.props.per) / this.state.per)) };
        // console.log(pages, groups, this.props, this.state);
        this.setState(pages);
        this.setState(groups);
    }
    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.count) !== JSON.stringify(this.props.count)) {
            this.setState({ refresh: !this.state.refresh });
        }
    }

    cb() {
        this.props.onChange && this.props.onChange(this.state.active + (this.state.group * this.state.per));
    }
    async gotoFinalGroup() {
        await this.setState({ group: this.state.groups - 1, active: this.state.pages % this.state.per });
        this.cb();
    }
    async gotoFirstGroup() {
        await this.setState({ group: 0, active: 1 });
        this.cb();
    }
    async prevGroup() {
        await this.setState({ group: this.state.group - 1, active: 1 });
        this.cb();
    }
    async nextGroup() {
        await this.setState({ group: this.state.group + 1, active: 1 });
        this.cb();
    }
    async selectedPage(nth) {
        await this.setState({ active: nth + 1 });
        this.cb();
    }

    render() {
        // console.log(this.state);

        return (<PaginationContainer refresh={this.state.refresh}>

            <div className="arrows">
                {/* << */}
                {this.state.group > 0
                    ? <div onClick={this.gotoFirstGroup} className="ll"></div>
                    : <div className="ll blank"></div>}
                {/* < */}
                {this.state.group > 0
                    ? <div onClick={this.prevGroup} className="l"></div>
                    : <div className="l blank"></div>}
            </div>

            {/* page */}
            <div className="pages">
                {Array.from(Array(this.state.per), (_, i) => {
                    const { group, per, pages, active } = this.state;
                    const num = i + (group * per);
                    const cssactive = active === i + 1 ? " active" : "";
                    const csslast = per === i + 1 ? " last" : "";
                    const css = `page${cssactive}${csslast}`;

                    return (num < pages)
                        ? <div key={i} onClick={() => this.selectedPage(i)} className={css}>{num + 1}</div>
                        : <div key={i} className={css}></div>
                })
                }
            </div>

            <div className="arrows">
                {/* > */}
                {this.state.groups - 1 !== this.state.group
                    ? <div onClick={this.nextGroup} className="r"></div>
                    : <div className="r blank"></div>}

                {/* >> */}
                {this.state.groups - 1 !== this.state.group ?
                    <div onClick={this.gotoFinalGroup} className="rr"></div>
                    : <div className="rr blank"></div>}
            </div>

        </PaginationContainer >);
    }
}