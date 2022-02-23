import React, { Component } from 'react'
import { usePromiseTracker } from "react-promise-tracker"; 
import { css } from "@emotion/react";
import { BeatLoader } from 'react-spinners';

type Props = {
color: string,
}


const override = css`
  display: block;
  margin: 0 auto;
  border-color: #df2b7c;
`;

export const Spinner: React.FC<Props> = ({color}) => {
    const { promiseInProgress } = usePromiseTracker();
    console.log('promise in progress', promiseInProgress)
  return (
    <div>
    {
    (promiseInProgress === true) ?
        <div><BeatLoader color={color} css={override} size={150}/></div>
      :
        null
    }
  </div>
  )
}

export default Spinner