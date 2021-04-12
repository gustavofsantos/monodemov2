import { AnswerFormData, NewFormData, Resolvers } from '@monodemov2/data';
import { AskService } from '@monodemov2/services';

const ask = new AskService();

export const resolvers: Resolvers = {
  Query: {
    forms: () => ask.allForms(),
    answeredForms: () => ask.allAnsweredForms(),
    form: (args: { id: string }) => ask.formById(args.id),
    answeredForm: (args: { id: string }) => ask.answeredFormById(args.id),
  },
  Mutation: {
    answerForm: async (args: { data: AnswerFormData }) => {
      const formId = await ask.createAnsweredForm(args.data);
      return ask.answeredFormById(formId);
    },
    createForm: async (args: { data: NewFormData }) => {
      const formId = await ask.createForm(args.data);
      return ask.formById(formId);
    },
    updateForm: async (args: { formId: string; data: NewFormData }) => {
      await ask.updateForm(args.formId, args.data);
      return ask.formById(args.formId);
    },
  },
};
