import React, { ReactElement } from 'react';
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import theme from '../theme';
// import {
//   MeDocument,
//   LoginMutation,
//   MeQuery,
//   RegisterMutation,
//   LogoutMutation,
// } from '../generated/graphql';

function betterUpateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query,
): void {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: 'http://localhost:4000/graphql/',
  fetchOptions: { credentials: 'same-origin' },
  // exchanges: [
  //   dedupExchange,
  //   cacheExchange({
  //     updates: {
  //       Mutation: {
  //         logout: (_result, args, cache, info): void => {
  //           betterUpateQuery<LogoutMutation, MeQuery>(
  //             cache,
  //             { query: MeDocument },
  //             _result,
  //             () => ({ me: null }),
  //           );
  //         },
  //         login: (_result, args, cache, info): void => {
  //           betterUpateQuery<LoginMutation, MeQuery>(
  //             cache,
  //             { query: MeDocument },
  //             _result,
  //             (result, query) => {
  //               if (result.login.errors) {
  //                 return query;
  //               }

  //               return {
  //                 me: result.login.user,
  //               };
  //             },
  //           );
  //         },
  //         register: (_result, args, cache, info): void => {
  //           betterUpateQuery<RegisterMutation, MeQuery>(
  //             cache,
  //             { query: MeDocument },
  //             _result,
  //             (result, query) => {
  //               if (result.register.errors) {
  //                 return query;
  //               }

  //               return {
  //                 me: result.register.user,
  //               };
  //             },
  //           );
  //         },
  //       },
  //     },
  //   }),
  //   fetchExchange,
  // ],
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
