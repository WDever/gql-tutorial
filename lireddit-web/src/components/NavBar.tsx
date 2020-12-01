import React, { ReactElement, ReactNode } from 'react';
import { Box, Link, Flex, Button } from '@chakra-ui/core';
import NextLink from 'next/link';

export default function NavBar(): ReactElement {
  let body: ReactNode = null;
  return (
    <Flex bg='tan' p={4}>
      <Box ml='auto'>{body}</Box>
    </Flex>
  );
}
