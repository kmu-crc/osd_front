import React, { Component } from "react";
import styled from "styled-components";
import opendesign_style from "opendesign_style";
import { Icon } from "semantic-ui-react";

const DeleteImg = styled.div`
  width: 100%;
  &::after {
    display: block;
    clear: both;
    content: "";
  }
`;

const Message = styled.div`
  display: block;
  position: absolute;
  color: ${opendesign_style.color.main.basic};
  left: 0;
  bottom: -1.5rem;
`

const DeleteImgItem = styled.div`
  width: 12.5%;
  padding: 10px;
  box-sizing: border-box;
  float: left;
  position: relative;
`;

const ItemImg = styled.div`
  width: 100%;
  height: 100px;
  background-image: url(${props => props.bg});
  background-position: center;
  background-size: cover;
  background-clip: content-box;
`;

const ItemText = styled.p`
  width: 100%;
  height: 36px;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

const DeleteBtn = styled.button`
  display: block;
  background-color: black;
  border: 2px solid white;
  position: absolute;
  color: white;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  top: 0;
  right: 0;
  i.icon {
    width: auto;
    margin: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
`;

export class DeleteItems extends Component {
  state = {
    value: [],
    target: null,
    validates: [],
    images: null
  };

  componentDidMount() {
    this.setState({
      images: this.props.ViewImg
    });
    this.init();
  }

  init = async () => {
    await this.setState({ target: this.input })
    this.returnData();
  }

  onDelete = async index => {
    console.log(index);
    let newValue = [...this.state.value];
    let newArray = [...this.state.images];
    newValue.push(newArray[index]);
    newArray.splice(index, 1);
    await this.setState({
      value: newValue,
      images: newArray
    });
    this.returnData();
  };

  returnData = async (e) => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  }

  render() {
    const { name, id, placeholder } = this.props;
    return (
      <div>
        <DeleteImg>
          {this.state.images &&
            this.state.images.map((item, index) => {
              return (
                <DeleteImgItem key={index}>
                  <ItemImg bg={item.link} />
                  <ItemText>{item.name}</ItemText>
                  <DeleteBtn onClick={() => this.onDelete(index)}><Icon name="close" /></DeleteBtn>
                </DeleteImgItem>
              );
            })}
        </DeleteImg>
        <input type="hidden" name={name && name} id={id ? id : name} placeholder={placeholder && placeholder} ref={ref => this.input = ref} />
        <Message></Message>
      </div>
    );
  }
}
