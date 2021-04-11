import { AnswerFormData, NewFormData, Resolvers } from '@monodemov2/data';
import { AskMongoRepo } from './repo/mongo-repo';

const repo = new AskMongoRepo();

export const resolvers: Resolvers = {
  Query: {
    forms: () => repo.allForms(),
    answeredForms: () => repo.allAnsweredForms(),
    form: (args: { id: string }) => repo.formById(args.id),
    answeredForm: (args: { id: string }) => repo.answeredFormById(args.id),
  },
  Mutation: {
    answerForm: async (args: { data: AnswerFormData }) => {
      const formId = await repo.createAnsweredForm(args.data);
      return repo.answeredFormById(formId);
    },
    createForm: async (args: { data: NewFormData }) => {
      const formId = await repo.createForm(args.data);
      return repo.formById(formId);
    },
  },
};
