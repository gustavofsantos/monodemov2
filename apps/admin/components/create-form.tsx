import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/button';
import { List, ListItem, Stack } from '@chakra-ui/layout';
import { useFormCreatorMutation } from '@monodemov2/data';
import { FormNewQuestion, QuestionView } from '@monodemov2/ui';

export function CreateForm({ onSuccess }) {
  const [questions, setQuestions] = useState([]);
  const creatorMutation = useFormCreatorMutation();

  const handleCreateQuestion = ({ label, placeholder }) => {
    console.log('handleCreateQuestion', { label, placeholder });
    setQuestions([...questions, { label, placeholder }]);
  };

  const handleDone = () =>
    creatorMutation.mutate({
      questions: questions,
    });

  useEffect(() => {
    if (creatorMutation.isSuccess) {
      setQuestions([]);
      onSuccess();
    }
  }, [creatorMutation.isSuccess]);

  return (
    <Stack>
      <FormNewQuestion onSubmit={handleCreateQuestion} />

      <List>
        {questions.map((question) => (
          <ListItem key={question.label + question.placeholder}>
            <QuestionView question={question} />
          </ListItem>
        ))}
      </List>

      <Button onClick={handleDone}>Done</Button>
    </Stack>
  );
}
