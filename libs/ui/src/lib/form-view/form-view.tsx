import React from 'react';
import { Form } from '@monodemov2/data';
import NextLink from 'next/link';
import { Link, List, ListItem, Stack, Text } from '@chakra-ui/layout';
import { QuestionView } from '../question-view';

interface Props {
  form: Form;
  appUrl: string;
}

export function FormView({ form, appUrl }: Props) {
  return (
    <Stack
      key={form.id}
      w="100%"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      spacing="4"
      p="4"
      bg="gray.100"
    >
      <Link href={appUrl + '/' + form.id}>access link</Link>
      <NextLink href={`/${form.id}/edit`}>edit</NextLink>

      <List spacing="4">
        {form.questions.map((question) => (
          <ListItem
            key={question.label}
            display="flex"
            flexDir="column"
            justifyContent="flex-start"
          >
            <QuestionView question={question} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
