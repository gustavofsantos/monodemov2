import { useEffect, useState } from 'react';
import {
  Form,
  useFormAnswerMutation,
  useFormItemQuery,
} from '@monodemov2/data';
import { Input, PageContents, PageTitle } from '@monodemov2/ui';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/button';
import { Stack } from '@chakra-ui/layout';

export default function FormPage({ formId }) {
  const router = useRouter();
  const formQuery = useFormItemQuery({ id: formId as string });
  const mutation = useFormAnswerMutation();

  const handleSubmit = (answers) =>
    mutation.mutate({
      formId: formQuery.data.form.id,
      answers: Object.entries(answers).map(([key, value]) => ({
        label: key,
        answer: value as string,
      })),
    });

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push('/finish');
    }
  }, [mutation.isSuccess]);

  return (
    <PageContents>
      <PageTitle>Ask!</PageTitle>

      {formQuery.isSuccess && !!formQuery.data.form && (
        <FormAns form={formQuery.data.form} onSubmit={handleSubmit} />
      )}
    </PageContents>
  );
}

export function getServerSideProps(ctx: NextPageContext) {
  return {
    props: {
      formId: ctx.query.form_id as string,
    },
  };
}

type FormProps = {
  form: Form;
  isLoading?: boolean;
  onSubmit(data: { [key: string]: string }): void;
};

function FormAns({ form, onSubmit, isLoading }: FormProps) {
  const [answers, setAnswers] = useState({});

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit(answers);
  };

  return (
    <Stack as="form" spacing="4" onSubmit={handleSubmit}>
      {form.questions.map((question) => (
        <Question
          key={question.label}
          question={question}
          onUpdate={(value) =>
            setAnswers({
              ...answers,
              [question.label]: value,
            })
          }
        />
      ))}

      <Button
        type="submit"
        colorScheme="blue"
        isLoading={isLoading}
        loadingText="Loading..."
      >
        Ans
      </Button>
    </Stack>
  );
}

function Question({ question, onUpdate }) {
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    onUpdate(answer);
  }, [answer]);

  return (
    <Input
      label={question.label}
      placeholder={question.placeholder}
      id={question.label}
      value={answer}
      onChange={(ev) => setAnswer(ev.target.value)}
      isRequired
    />
  );
}
