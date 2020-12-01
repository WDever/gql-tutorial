import React, { ReactElement, ReactNode } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

export default function Login(): ReactElement {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }): Promise<void> => {
          const response = await login({
            options: { username: '', password: '' },
          });

          console.log(response);
          console.log(toErrorMap(response.data?.login.errors));
        }}
        // onSubmit={async (values, { setErrors }): Promise<void> => {
        //   const response = await login({ options: values });

        //   if (response.data?.login.errors) {
        //     setErrors(toErrorMap(response.data.login.errors));
        //   } else if (response.data?.login.user) {
        //     router.push('/');
        //   }
        // }}
      >
        {({ isSubmitting }): ReactNode => (
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
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
