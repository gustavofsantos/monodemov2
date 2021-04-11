import { Form } from '@monodemov2/data';
import { env } from '../config';

type Props = {
  form: Form;
};

export function FormView({ form }: Props) {
  return (
    <div key={form.id}>
      <a href={env.appUrl + '/' + form.id}>access link</a>
      <div>
        {form.questions.map((question) => (
          <div key={question.label}>
            <span>Label: {question.label}</span>
            <span>Placeholder: {question.placeholder}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
