const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const schema = require('./schema');

const app = express();

//Allow cross origin
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(5000, () => console.log(`Server started on ${PORT}`));
