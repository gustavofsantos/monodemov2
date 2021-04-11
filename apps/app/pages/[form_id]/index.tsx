import {
  Form,
  useFormAnswerMutation,
  useFormItemQuery,
} from '@monodemov2/data';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
    <article>
      <h1>Form page</h1>

      {formQuery.isSuccess && !!formQuery.data.form && (
        <FormAns form={formQuery.data.form} onSubmit={handleSubmit} />
      )}
    </article>
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
  onSubmit(data: { [key: string]: string }): void;
};

function FormAns({ form, onSubmit }: FormProps) {
  const [answers, setAnswers] = useState({});

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit(answers);
  };

  return (
    <section>
      {form.id}

      <div>
        <form onSubmit={handleSubmit}>
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

          <button>Ans</button>
        </form>
      </div>
    </section>
  );
}

function Question({ question, onUpdate }) {
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    onUpdate(answer);
  }, [answer]);

  return (
    <label htmlFor={question.label}>
      <span>{question.label}</span>
      <input
        id={question.label}
        value={answer}
        onChange={(ev) => setAnswer(ev.target.value)}
        placeholder={question.placeholder}
        required
      />
    </label>
  );
}
