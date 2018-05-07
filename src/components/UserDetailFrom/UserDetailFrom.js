import React, { Component } from 'react';
import { Field } from "redux-form";
import { Form, Button } from "semantic-ui-react";
import { TextField, RenderField, FileField } from "../RenderField";

class UserDetailFrom extends React.Component {
  render() {
    return (
      <div>
        <Field name="thumbnail" type="file"
          placeholder="썸네일" component={FileField} label="썸네일" />
        <Field name="nick_name" type="text"
          placeholder="닉네임" component={RenderField} label="닉네임" />
        <Field name="about_me"
          placeholder="자기소개" component={TextField} label="자기소개" />
      </div>
    );
  }
}

export default UserDetailFrom;
