// Loading.js
import React from 'react';
import {Background, LoadingText} from './styles';
import Spinner from 'css/images/loading.gif';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={Spinner} alt="로딩중"  />
    </Background>
  );
};