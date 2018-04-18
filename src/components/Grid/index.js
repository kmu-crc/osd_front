import React, { Component } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  @media only screen and (min-width: 768px){
      ${(props) => props.container ? `width: 768px` : null}
  }

  @media only screen and (min-width: 992px){
      ${(props) => props.container ? `width: 992px` : null}
  }

  @media only screen and (min-width: 1200px){
      ${(props) => props.container ? `width: 1200px` : null}
  }
`

export const Row = styled.div`
  width: 100%;
  &:after{
    display: block;
    content: "";
    clear: both;
  }
`;

function getWidthString(span) {
  if (span === "none") return `display: none;`;
  if (!span) return;
  let width = span / 12 * 100;
  return `width: ${width}%; display:block;`;
}

function getPercent(span) {
  if (!span) return;
  let width = span / 12 * 100;
  return `${width}%`;
}

export const Columns = styled.div`
  box-sizing: border-box;
  float: left;
  ${(props) => (props.xs ? getWidthString(props.xs) : props.width ? getWidthString(props.width) : `width: 100%`)};
  ${(props) => props.xsPush && `margin-left:${getPercent(props.xsPush)}`};

  @media only screen and (min-width: 768px){
      ${(props) => props.sm ? getWidthString(props.sm) : props.width ? getWidthString(props.width) : null};
      ${(props) => props.smPush && `margin-left:${getPercent(props.smPush)}`};
  }

  @media only screen and (min-width: 992px){
      ${(props) => props.md ? getWidthString(props.md) : props.width ? getWidthString(props.width) : null};
      ${(props) => props.mdPush && `margin-left:${getPercent(props.mdPush)}`};
  }

  @media only screen and (min-width: 1200px){
      ${(props) => props.lg ? getWidthString(props.lg) : props.width ? getWidthString(props.width) : null};
      ${(props) => props.lgPush && `margin-left:${getPercent(props.lgPush)}`};
  }
`
