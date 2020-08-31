import React, { ReactChild, ReactElement } from 'react';
import { Box } from '@chakra-ui/core';

interface Props {
  children: ReactChild;
  variant?: 'small' | 'regular';
}

export default function Wrapper({
  children,
  variant = 'regular',
}: Props): ReactElement {
  return (
    <Box
      mt={8}
      mx='auto'
      maxW={variant === 'regular' ? '800px' : '400px'}
      w='100%'
    >
      {children}
    </Box>
  );
}
