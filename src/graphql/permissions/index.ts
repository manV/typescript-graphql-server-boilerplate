import { isAuthenticated } from './rules/isAuthenticated';
import { shield } from 'graphql-shield';

export default shield(
  {
    Query: {
      _empty: isAuthenticated
    }
  },
  {
    allowExternalErrors: true
  }
);
