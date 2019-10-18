import React from 'react';
import App from 'next/app';

import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  clips: [] as string[],
  vintage: [] as string[],
  subStubs: {} as { [key: string]: string },
  showNew: true,
};
const { GlobalStateProvider, useGlobalState } = createGlobalState(initialState);

class StatefulApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <GlobalStateProvider>
        <Component {...pageProps} />
      </GlobalStateProvider>
    );
  }
}

export { useGlobalState };

export default StatefulApp;
