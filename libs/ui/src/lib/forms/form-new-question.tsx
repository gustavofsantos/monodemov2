import React, { useState } from 'react';
import { Button, Stack } from '@chakra-ui/react';
import { Input } from '../input/input';

interface Props {
  onSubmit(data: { label: string; placeholder: string }): void;
}

export function FormNewQuestion(props: Props) {
  const [label, setLabel] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    props.onSubmit({ label, placeholder });

    setLabel('');
    setPlaceholder('');
  };

  return (
    <Stack
      as="form"
      spacing="16px"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      p="4"
      onSubmit={handleSubmit}
    >
      <Input
        label="Question label"
        value={label}
        onChange={(ev) => setLabel(ev.target.value)}
        isRequired
      />

      <Input
        label="Question hint (placeholder)"
        value={placeholder}
        onChange={(ev) => setPlaceholder(ev.target.value)}
        isRequired
      />

      <Button type="submit">Create</Button>
    </Stack>
  );
}
