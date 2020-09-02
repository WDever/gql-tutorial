import React, { ReactElement } from 'react';
import { Provider, createClient } from 'urql';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import theme from '../theme';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: { credentials: 'include' },
});

function MyApp({ Component, pageProps }: AppPropsType): ReactElement {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
