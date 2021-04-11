import {
  AnsweredForm,
  Form,
  NewFormData,
  AnswerFormData,
} from '@monodemov2/data';

export interface AskRepo {
  createForm(data: NewFormData): Promise<string>;
  createAnsweredForm(data: AnswerFormData): Promise<string>;
  allForms(): Promise<Form[]>;
  formById(formId: string): Promise<Form>;
  allAnsweredForms(): Promise<AnsweredForm[]>;
  answeredFormById(formId: string): Promise<AnsweredForm>;
}
