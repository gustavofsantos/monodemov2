import { Stack } from '@chakra-ui/layout';
import { PageContents, PageTitle } from '@monodemov2/ui';
import { useRouter } from 'next/router';
import { CreateForm } from '../../components/create-form';

export default function NewFormPage() {
  const router = useRouter();
  const redirecOnSuccess = () => router.push('/');

  return (
    <PageContents>
      <Stack>
        <PageTitle>New form</PageTitle>
        <CreateForm onSuccess={redirecOnSuccess} />
      </Stack>
    </PageContents>
  );
}
