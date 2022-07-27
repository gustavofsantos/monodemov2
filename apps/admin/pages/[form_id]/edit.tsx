import { PageContents, PageTitle } from '@monodemov2/ui';
import { UpdateForm } from '../../components/update-form';
import { NextPageContext } from 'next';
import { useFormItemQuery } from '@monodemov2/data';
import { Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';

export default function EditForm({ formId }) {
  const formQuery = useFormItemQuery({ id: formId });
  const router = useRouter();

  const handleUpdate = () => router.push('/');

  return (
    <PageContents>
      <PageTitle>Edit</PageTitle>

      {formQuery.isLoading && <Text>Loading...</Text>}

      {formQuery.isSuccess && (
        <UpdateForm form={formQuery.data.form} onUpdate={handleUpdate} />
      )}
    </PageContents>
  );
}

export function getServerSideProps(ctx: NextPageContext) {
  const formId = ctx.query.form_id;

  return {
    props: {
      formId,
    },
  };
}
