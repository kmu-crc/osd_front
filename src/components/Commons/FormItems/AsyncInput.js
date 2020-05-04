import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import { Icon } from "semantic-ui-react";
import { FormInput } from "./FormInput";

const InputWrap = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
  width: 85%;
  float: left;
  .hidden {
    width: 1px;
    height: 1px;
    margin: -1px;
    position: absolute;
    clip: rect(0, 0, 0, 0);
    overflow: hidden;
    outline: 0;
    border: 0;
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const Message = styled.div`
  display: block;
  position: absolute;
  color: ${StyleGuide.color.main.basic};
  left: 0;
  bottom: -1.5rem;
`;
const SearchBox = styled.div`
  width: 100%;
  position: relative;
`;

const InputBox = styled.div`
  display: block;
  width: calc(100% - 60px);
  float: left;
  border-right: 0;
  & input {
    border-radius: 0.3rem 0 0 0.3rem;
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const SearchBtn = styled.button`
  width: 60px;
  height: 100%;
  display: block;
  box-sizing: border-box;
  background-color: ${StyleGuide.color.geyScale.scale3};
  border: 1px solid ${StyleGuide.color.geyScale.scale2};
  border-left: 0;
  border-radius: 0 0.3rem 0.3rem 0;
  padding: 0.67857143em 1em;
  position: relative;
  z-index: 10;
  i.icon {
    font-size: 1rem;
  }
`;

const List = styled.div`
  width: 100%;
  min-height: 50px;
  max-height: 200px;
  border: 1px solid ${StyleGuide.color.geyScale.scale4};
  background-color: ${StyleGuide.color.geyScale.scale0};
  border-radius: 3px;
  position: absolute;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const ListItem = styled.div`
  width: 100%;
  padding: 0.5em 1em;
  height: 4.5em;
  cursor: pointer;
  &:nth-child(2n) {
    background-color: ${StyleGuide.color.geyScale.scale2};
  }
  &:hover {
    background-color: ${StyleGuide.color.sub.bule.light};
    .email {
      color: ${StyleGuide.color.geyScale.scale9};
    }
    .name {
      color: ${StyleGuide.color.geyScale.scale0};
    }
  }
  .email {
    font-size: ${StyleGuide.font.size.paragraph};
    color: ${StyleGuide.color.geyScale.scale7};
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  .name {
    font-size: ${StyleGuide.font.size.small};
    color: ${StyleGuide.color.geyScale.scale5};
  }
`;

const NoneList = styled.div`
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: center;
`;

const AddList = styled.div`
  position: relative;
  margin-top: 1rem;
  width: 100%;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const AddItem = styled.div`
  font-size: ${StyleGuide.font.size.small};
  background-color: ${StyleGuide.color.geyScale.scale7};
  color: white;
  width: auto;
  display: inline-block;
  padding: 0.5em 1em;
  margin-right: 1em;
  margin-bottom: 10px;
  border-radius: 3px;
  position: relative;
`;

const DeleteBtn = styled.button`
  background-color: transparent;
  border: 0;
  padding: 0;
  font-size: 12px;
  color: white;
  margin-left: 5px;
  i.icon {
    margin: 0;
  }
`;

export class AsyncInput extends Component {
  state = {
    value: [],
    target: null,
    validates: [],
    textValue: "",
    members: [],
    render: false,
    top: false
  };

  componentDidMount() {
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
    if (this.props.list) {
      this.setState({ members: this.props.list });
    }
    this.init();
  }

  async shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props.list) !== JSON.stringify(nextProps.list)) {
      if (nextProps.list) {
        let newArr = [...nextProps.list];
        console.log("1", newArr);
        if (this.state.value && this.state.value.length > 0)
          newArr = await this.createNewMember(this.state.value, newArr);
        console.log("2", newArr);
        await this.setState({ members: newArr });
      } else {
        await this.setState({ members: [] });
      }
    }
    return true;
  }

  init = async () => {
    this.returnData();
  };

  onChangeValue = async (data, e) => {
    await this.setState({
      target: data.target,
      validates: data.validates,
      textValue: data.value
    });
    if (e && e.key === "Enter") {
      this.SearchList();
    }
    this.returnData();
  };

  SearchList = async () => {
    const body = window.document.body.offsetHeight;
    if (this.props.asyncFn && (this.state.textValue.length >= 1)) this.props.asyncFn(this.state.textValue);
    if (body < this.state.target.getBoundingClientRect().y + 350) {
      await this.setState({ top: true });
    } else {
      await this.setState({ top: false });
    }
    await setTimeout(() => {
      this.setState({ render: true });
    }, 200);
    this.listInput.focus();
  };

  ListBlur = async () => {
    setTimeout(() => {
      this.setState({ render: false });
    }, 200);
  };

  addMember = async (data, index) => {
    console.log("add");
    let newArr = [...this.state.value];
    let newMembers = [...this.state.members];
    newMembers.splice(index, 1);
    newArr.push(data);
    await this.setState({ value: newArr, members: newMembers });
    this.returnData();
  };

  deleteItem = async (data, index) => {
    let newArr = [...this.state.value];
    newArr.splice(index, 1);
    let newMembers = await this.createNewMember(newArr, this.props.list);
    console.log(newMembers);
    await this.setState({ value: newArr, members: newMembers });
    this.returnData();
  };

  createNewMember = async (arr, origin) => {
    console.log("creaeNewMember", arr, origin);
    if (origin && origin.length > 0) {
      let newArr = [...origin];
      if (arr && arr.length > 0) {
        for (let item of arr) {
          for (let i = 0; i < origin.length; i++) {
            console.log(item.uid, newArr[i].uid);
            if (item.uid === newArr[i].uid) {
              console.log("index", i);
              await newArr.splice(i, 1);
              i = 0;
              break;
            }
          }
        }
      }
      return newArr;
    } else {
      return [];
    }
  };

  returnData = async e => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  };
  render() {
    const { type, name, value, style, id } = this.props;
    return (
      <InputWrap>
        <SearchBox>
          <InputBox>
            <FormInput
              type={type ? type : "text"}
              name={name && name}
              defaultValue={value && value}
              placeholder="찾고자 하는 회원의 닉네임을 입력해 주세요."
              style={style && style}
              id={id ? id : name}
              value={this.state.value}
              getValue={this.onChangeValue}
              prevent={true}
              minLength="1"
              className=""
            />
          </InputBox>
          <Message />
          <SearchBtn type="button" onClick={this.SearchList}>
            <Icon name="search" />
          </SearchBtn>
          {this.state.render && (
            <List
              style={{
                overflowY: this.state.members.length > 3 ? "scroll" : "hidden",
                top: this.state.top
                  ? this.state.members.length > 3
                    ? "-201px"
                    : this.state.members.length === 0
                      ? "-51px"
                      : `-${this.state.members.length * 4.5}em`
                  : "inherit"
              }}
              ref={ref => (this.listBox = ref)}
            >
              {this.state.members &&
                (this.state.members.length > 0 ? (
                  this.state.members.map((item, index) => {
                    return (
                      <ListItem
                        key={`listItem${index}`}
                        onClick={() => this.addMember(item, index)}
                      >
                        <p className="email">{item.email}</p>
                        <p className="name">{item.nick_name}</p>
                      </ListItem>
                    );
                  })
                ) : (
                  <NoneList>검색 결과가 없습니다.</NoneList>
                ))}
            </List>
          )}
          <input
            name="listInput"
            type="text"
            ref={ref => (this.listInput = ref)}
            onBlur={this.ListBlur}
            className="hidden"
          />
        </SearchBox>
        <AddList>
          {this.state.value.constructor.name === "Array" &&
            this.state.value.length > 0 &&
            this.state.value.map((item, index) => {
              return (
                <AddItem key={`additem${index}`}>
                  {item.nick_name}
                  <DeleteBtn
                    type="button"
                    onClick={() => this.deleteItem(item, index)}
                  >
                    <Icon name="close" />
                  </DeleteBtn>
                </AddItem>
              );
            })}
        </AddList>
      </InputWrap>
    );
  }
}

AsyncInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func
};
