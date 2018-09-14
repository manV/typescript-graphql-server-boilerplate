import { graphqls2s } from 'graphql-s2s';
import glue = require('schemaglue');
import { gql } from 'apollo-server-express';

const { schema } = glue('.', {
  ignore: '**/*.js'
});

export default gql`
  ${graphqls2s.transpileSchema(schema)}
`;
