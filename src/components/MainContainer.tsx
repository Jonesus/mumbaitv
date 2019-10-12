import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    overflow-y: scroll;
    background-color: var(--main-400);

    --main-100: hsl(28, 100%, 90%);
    --main-200: hsl(28, 100%, 80%);
    --main-300: hsl(28, 100%, 70%);
    --main-400: hsl(28, 100%, 60%);
    --main-500: hsl(28, 100%, 50%);
    --main-600: hsl(28, 100%, 40%);
    --main-700: hsl(28, 100%, 30%);
    --main-800: hsl(28, 100%, 20%);
    --main-900: hsl(28, 100%, 10%);

    --secondary-100: hsl(210, 100%, 95%);
    --secondary-200: hsl(210, 100%, 90%);
    --secondary-300: hsl(210, 100%, 80%);
    --secondary-400: hsl(210, 100%, 70%);
    --secondary-500: hsl(210, 100%, 60%);
    --secondary-600: hsl(210, 100%, 50%);
    --secondary-700: hsl(210, 100%, 40%);
    --secondary-800: hsl(210, 100%, 30%);
    --secondary-900: hsl(210, 100%, 10%);

    --grey-hue: 28;
    --grey-100: hsl(var(--grey-hue), 5%, 90%);
    --grey-200: hsl(var(--grey-hue), 5%, 80%);
    --grey-300: hsl(var(--grey-hue), 5%, 70%);
    --grey-400: hsl(var(--grey-hue), 5%, 60%);
    --grey-500: hsl(var(--grey-hue), 5%, 50%);
    --grey-600: hsl(var(--grey-hue), 5%, 40%);
    --grey-700: hsl(var(--grey-hue), 5%, 30%);
    --grey-800: hsl(var(--grey-hue), 5%, 20%);
    --grey-900: hsl(var(--grey-hue), 5%, 10%);

    --white: hsl(28, 100%, 97%);
  }

  body {
    --decoration-pad: 1rem;
    --decoration-radius-base: 2rem;

    margin: var(--decoration-pad) auto;
    padding: var(--decoration-pad);
    max-width: 66rem;
    border-radius: calc(var(--decoration-radius-base) * 8);

    font-family: 'Be Vietnam', sans-serif;
    font-size: 16px;
     text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: var(--main-300);
    color: var(--grey-900);

    @media only screen and (max-width: 68em) {
      margin: var(--decoration-pad);
    }
    @media only screen and (max-width: 36em) {
      --decoration-pad: 0.5rem;
      --decoration-radius-base: 1rem;
    }
    @media only screen and (max-width: 24em) {
      --decoration-pad: 0.3rem;
      --decoration-radius-base: 0.6rem;
    }
  }

  #__next {
    padding: var(--decoration-pad);
    border-radius: calc(var(--decoration-radius-base) * 5);

    background-color: var(--main-200);
  }
`;

const Main = styled.main`
  display: grid;
  place-content: center;
  margin: auto;

  background-color: var(--main-100);
  padding: var(--decoration-pad);
  border-radius: calc(var(--decoration-radius-base) * 3);

  & > * + * {
    margin-top: calc(var(--decoration-pad) * 2);
  }
`;

export const MainContainer: React.FC = ({ children }) => (
  <Main>
    {children}
    <GlobalStyles />
  </Main>
);
