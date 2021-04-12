import { Button } from '@chakra-ui/button';
import { Stack } from '@chakra-ui/layout';
import { Form, useUpdateFormMutation } from '@monodemov2/data';
import { Input } from '@monodemov2/ui';
import produce from 'immer';
import { useEffect, useState } from 'react';

interface Props {
  form: Form;
  onUpdate(): void;
}

export function UpdateForm({ form, onUpdate }: Props) {
  const updateMutation = useUpdateFormMutation();
  const [state, setState] = useState(form.questions);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    updateMutation.mutate({
      id: form.id,
      questions: state,
    });
  };

  useEffect(() => {
    if (updateMutation.isSuccess) {
      onUpdate();
    }
  }, [updateMutation.isSuccess]);

  return (
    <Stack as="form" onSubmit={handleSubmit}>
      {state.map((question, questionIndex) => (
        <Stack p="4" border="1px" borderColor="gray.200" borderRadius="md">
          <Input
            label="Label"
            value={question.label}
            onChange={(ev) =>
              setState(
                produce(state, (draft) => {
                  const question = draft[questionIndex];
                  question.label = ev.target.value;
                })
              )
            }
          />

          <Input
            label="Placeholder"
            value={question.placeholder}
            onChange={(ev) =>
              setState(
                produce(state, (draft) => {
                  const question = draft[questionIndex];
                  question.placeholder = ev.target.value;
                })
              )
            }
          />
        </Stack>
      ))}

      <Button
        type="submit"
        isLoading={updateMutation.isLoading}
        loadingText="Updating..."
      >
        Save
      </Button>
    </Stack>
  );
}
