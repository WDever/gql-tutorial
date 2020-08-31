import React, { InputHTMLAttributes, ReactElement } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/core';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export default function InputField({
  label,
  size: _,
  ...props
}: InputFieldProps): ReactElement {
  const [field, { error }] = useField(props);

  const { placeholder } = props;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor='name'>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} placeholder={placeholder} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}
