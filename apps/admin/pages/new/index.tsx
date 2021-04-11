import { useRouter } from 'next/router';
import { CreateForm } from '../../components/create-form';

export default function NewFormPage() {
  const router = useRouter();
  const redirecOnSuccess = () => router.push('/');

  return <CreateForm onSuccess={redirecOnSuccess} />;
}
