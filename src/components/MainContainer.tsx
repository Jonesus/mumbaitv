import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const Main = styled.main`
  display: grid;
  place-content: center;
  max-width: 60rem;
  margin: auto;

  background-color: var(--WHITE);
  padding: 2rem;
`;

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    min-height: 100%;
    margin: 0;
    font-family: 'Be Vietnam', sans-serif;
    font-size: 16px;
     text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;


    --MAIN-100: #ffcda2;
    --MAIN-300: #ffb26f;
    --MAIN-500: #ff851a;
    --MAIN-700: #c45c00;
    --MAIN-900: #6f3400;

    --SECONDARY-100: #94c9ff;
    --SECONDARY-300: #61afff;
    --SECONDARY-500: #001f3f;
    --SECONDARY-700: #005ab6;
    --SECONDARY-900: #003061;

    --GREY-100: #c2c1bf;
    --GREY-300: #a9a8a4;
    --GREY-500: #807e79;
    --GREY-700: #545350;
    --GREY-900: #292826;


    --WHITE: #f4f4f2;
    --BLACK: #171714;

    background-color: var(--MAIN-300);
    color: var(--GREY-900);

    display: flex;
    place-content: center;
    padding: 2rem;
  }

  #__next {
    display: flex;

  }
`;

export const MainContainer: React.FC = ({ children }) => (
  <Main>
    {children}
    <GlobalStyles />
  </Main>
);
