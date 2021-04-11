import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { readFileSync } from 'fs';
import * as path from 'path';

const port = process.env.PORT || 3333;

const loadSchema = () => {
  const filePath = path.join(
    __dirname,
    '../../../libs/data/src/schema.graphql'
  );
  return readFileSync(filePath, {
    encoding: 'utf-8',
  }).toString();
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(loadSchema()),
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`API listening at ${port}`);
});
