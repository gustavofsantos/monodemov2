import Link from 'next/link';
import { useFormListQuery } from '@monodemov2/data';
import { FormView } from '../components/form-view';

export default function IndexPage() {
  const formsQuery = useFormListQuery();

  return (
    <article>
      <h1>Admin index page</h1>

      <Link href="/new">New</Link>

      {formsQuery.isLoading && <span>Loading...</span>}
      {formsQuery.isSuccess &&
        formsQuery.data.forms.map((form) => <FormView form={form} />)}
    </article>
  );
}
