import React from 'react';
import {
  Input as ChakraInput,
  InputProps,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

interface Props extends InputProps {
  label: string;
}

export function Input(props: Props) {
  return (
    <FormControl id={props.id} w="100%" {...props}>
      <FormLabel as="label" htmlFor={props.id}>
        {props.label}
      </FormLabel>
      <ChakraInput w="100%" {...props} />
    </FormControl>
  );
}
