import Link from 'next/link';
import { useFormListQuery } from '@monodemov2/data';
import { FormView, PageContents } from '@monodemov2/ui';
import { env } from '../config';
import { Box, List, ListItem, Stack, Text } from '@chakra-ui/layout';

export default function IndexPage() {
  const formsQuery = useFormListQuery();

  return (
    <PageContents>
      <Text fontSize="xl" fontWeight="bold" textAlign="center">
        Ask!
      </Text>

      <Stack spacing="4">
        <Link href="/new">New</Link>

        {formsQuery.isLoading && <Text>Loading...</Text>}

        {formsQuery.isSuccess && (
          <List spacing="4">
            {formsQuery.data.forms.map((form) => (
              <ListItem key={form.id}>
                <FormView form={form} appUrl={env.appUrl} />
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
    </PageContents>
  );
}
