import { GraphQLResolveInfo } from 'graphql';
import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AnswerFormData = {
  formId: Scalars['String'];
  answers?: Maybe<Array<Maybe<AnswerQuestionData>>>;
};

export type AnswerQuestionData = {
  id: Scalars['String'];
  answer: Scalars['String'];
};

export type AnsweredForm = {
  __typename?: 'AnsweredForm';
  id: Scalars['String'];
  formId: Scalars['String'];
  questions: Array<Maybe<AnsweredQuestion>>;
};

export type AnsweredQuestion = {
  __typename?: 'AnsweredQuestion';
  label: Scalars['String'];
  answer: Scalars['String'];
  placeholder?: Maybe<Scalars['String']>;
};

export type Form = {
  __typename?: 'Form';
  id: Scalars['String'];
  questions: Array<Maybe<Question>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  answerForm?: Maybe<AnsweredForm>;
};


export type MutationAnswerFormArgs = {
  id: Scalars['String'];
  data?: Maybe<AnswerFormData>;
};

export type Query = {
  __typename?: 'Query';
  forms?: Maybe<Array<Maybe<Form>>>;
  form?: Maybe<Form>;
  answeredForms?: Maybe<Array<Maybe<AnsweredForm>>>;
  answeredForm?: Maybe<AnsweredForm>;
};


export type QueryFormArgs = {
  id: Scalars['String'];
};


export type QueryAnsweredFormArgs = {
  id: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  label: Scalars['String'];
  placeholder?: Maybe<Scalars['String']>;
};

export type FormListQueryVariables = Exact<{ [key: string]: never; }>;


export type FormListQuery = (
  { __typename?: 'Query' }
  & { forms?: Maybe<Array<Maybe<(
    { __typename?: 'Form' }
    & Pick<Form, 'id'>
    & { questions: Array<Maybe<(
      { __typename?: 'Question' }
      & Pick<Question, 'placeholder'>
    )>> }
  )>>> }
);


export const FormListDocument = `
    query formList {
  forms {
    id
    questions {
      placeholder
    }
  }
}
    `;
export const useFormListQuery = <
      TData = FormListQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit }, 
      variables?: FormListQueryVariables, 
      options?: UseQueryOptions<FormListQuery, TError, TData>
    ) => 
    useQuery<FormListQuery, TError, TData>(
      ['formList', variables],
      fetcher<FormListQuery, FormListQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FormListDocument, variables),
      options
    );


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AnswerFormData: AnswerFormData;
  String: ResolverTypeWrapper<Scalars['String']>;
  AnswerQuestionData: AnswerQuestionData;
  AnsweredForm: ResolverTypeWrapper<AnsweredForm>;
  AnsweredQuestion: ResolverTypeWrapper<AnsweredQuestion>;
  Form: ResolverTypeWrapper<Form>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AnswerFormData: AnswerFormData;
  String: Scalars['String'];
  AnswerQuestionData: AnswerQuestionData;
  AnsweredForm: AnsweredForm;
  AnsweredQuestion: AnsweredQuestion;
  Form: Form;
  Mutation: {};
  Query: {};
  Question: Question;
  Boolean: Scalars['Boolean'];
};

export type AnsweredFormResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnsweredForm'] = ResolversParentTypes['AnsweredForm']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  formId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  questions?: Resolver<Array<Maybe<ResolversTypes['AnsweredQuestion']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnsweredQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnsweredQuestion'] = ResolversParentTypes['AnsweredQuestion']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  placeholder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormResolvers<ContextType = any, ParentType extends ResolversParentTypes['Form'] = ResolversParentTypes['Form']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  questions?: Resolver<Array<Maybe<ResolversTypes['Question']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  answerForm?: Resolver<Maybe<ResolversTypes['AnsweredForm']>, ParentType, ContextType, RequireFields<MutationAnswerFormArgs, 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  forms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Form']>>>, ParentType, ContextType>;
  form?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<QueryFormArgs, 'id'>>;
  answeredForms?: Resolver<Maybe<Array<Maybe<ResolversTypes['AnsweredForm']>>>, ParentType, ContextType>;
  answeredForm?: Resolver<Maybe<ResolversTypes['AnsweredForm']>, ParentType, ContextType, RequireFields<QueryAnsweredFormArgs, 'id'>>;
};

export type QuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  placeholder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AnsweredForm?: AnsweredFormResolvers<ContextType>;
  AnsweredQuestion?: AnsweredQuestionResolvers<ContextType>;
  Form?: FormResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
