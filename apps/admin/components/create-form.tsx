import { Question, useFormCreatorMutation } from '@monodemov2/data';
import { useEffect, useState } from 'react';

export function CreateForm() {
  const [questions, setQuestions] = useState([]);
  const creatorMutation = useFormCreatorMutation();

  const handleCreateQuestion = ({ label, placeholder }) =>
    setQuestions([...questions, { label, placeholder }]);

  const handleDone = () =>
    creatorMutation.mutate({
      questions: questions,
    });

  useEffect(() => {
    if (creatorMutation.isSuccess) {
      setQuestions([]);
    }
  }, [creatorMutation.isSuccess]);

  return (
    <div>
      <CreateQuestion onCreate={handleCreateQuestion} />

      {questions.map((question) => (
        <QuestionItem question={question} />
      ))}

      <button onClick={handleDone}>Done</button>
    </div>
  );
}

function CreateQuestion({ onCreate }) {
  const [label, setLabel] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onCreate({ label, placeholder });
    setLabel('');
    setPlaceholder('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Label</span>
        <input
          value={label}
          onChange={(ev) => setLabel(ev.target.value)}
          required
        />
      </label>

      <label>
        <span>Placeholder</span>
        <input
          value={placeholder}
          onChange={(ev) => setPlaceholder(ev.target.value)}
        />
      </label>

      <button>Create</button>
    </form>
  );
}

function QuestionItem({ question }: { question: Question }) {
  return (
    <div>
      <span>Label: {question.label}</span>
      <span>Placeholder: {question.placeholder}</span>
    </div>
  );
}
