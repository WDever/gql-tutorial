import React, { ReactElement } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/core';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';

export default function Register(): ReactElement {
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='username'
              label='Username'
            />
            <Box mt={4}>
              <InputField
                name='password'
                placeholder='password'
                label='Password'
                type='password'
              />
            </Box>
            <Button
              isLoading={isSubmitting}
              type='submit'
              variantColor='teal'
              mt={4}
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
