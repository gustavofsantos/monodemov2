import {
  AnsweredForm,
  AnswerFormData,
  Form,
  NewFormData,
} from '@monodemov2/data';
import { MongoClient, ObjectId } from 'mongodb';

const defaultConnectionUrl =
  'mongodb://localhost:27017/ask-dev?retryWrites=true&writeConcern=majority';
const formsCollection = 'forms';
const answersCollection = 'answers';

class BaseMongoRepo {
  async formsCollection(client: MongoClient) {
    if (!client.isConnected()) {
      await client.connect();
    }

    return client.db().collection(formsCollection);
  }

  async answersCollection(client: MongoClient) {
    if (!client.isConnected()) {
      await client.connect();
    }

    return client.db().collection(answersCollection);
  }
}

export class AskService extends BaseMongoRepo {
  private client: MongoClient;

  constructor(url = defaultConnectionUrl) {
    super();
    this.client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  createForm(data: NewFormData): Promise<string> {
    return this.formsCollection(this.client)
      .then((coll) => coll.insertOne(data))
      .then((result) => result.insertedId)
      .catch((err) => {
        throw err;
      });
  }

  updateForm(id: string, data: NewFormData) {
    return this.formsCollection(this.client)
      .then((coll) =>
        coll.updateOne({ _id: new ObjectId(id) }, { $set: { ...data } })
      )
      .catch((err) => {
        throw err;
      });
  }

  createAnsweredForm(data: AnswerFormData): Promise<string> {
    return this.answersCollection(this.client)
      .then((coll) => coll.insertOne(data))
      .then((result) => result.insertedId)
      .catch((err) => {
        throw err;
      });
  }

  formById(formId: string): Promise<Form> {
    return this.formsCollection(this.client)
      .then((coll) => coll.findOne({ _id: new ObjectId(formId) }))
      .then(
        (doc): Form => ({
          id: doc._id.toString(),
          questions: doc.questions,
        })
      );
  }

  answeredFormById(formId: string): Promise<AnsweredForm> {
    return this.answersCollection(this.client)
      .then((coll) => coll.findOne({ _id: new ObjectId(formId) }))
      .then(
        (doc): AnsweredForm => ({
          id: doc._id.toString(),
          formId: doc.formId,
          questions: doc.answers,
        })
      );
  }

  allForms(): Promise<Form[]> {
    return this.formsCollection(this.client)
      .then((coll) => coll.find())
      .then((cursor) =>
        cursor.map(
          (form): Form => ({
            id: form._id.toString(),
            questions: form.questions,
          })
        )
      )
      .then((cursor) => cursor.toArray());
  }

  allAnsweredForms(): Promise<AnsweredForm[]> {
    return this.answersCollection(this.client)
      .then((coll) => coll.find())
      .then((cursor) => cursor.toArray());
  }
}
