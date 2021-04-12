import React from 'react';
import { Question } from '@monodemov2/data';
import { Stack, Text } from '@chakra-ui/layout';

interface Props {
  question: Question;
}

export function QuestionView({ question }: Props) {
  return (
    <Stack spacing="2">
      <Text>Label: {question.label}</Text>
      <Text>Placeholder: {question.placeholder}</Text>
    </Stack>
  );
}
