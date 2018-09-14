// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    _empty: string | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    _empty: string | null;
    login: ILoginResponse;
  }

  interface ILoginOnMutationArguments {
    input: ILoginInput;
  }

  interface ILoginInput {
    email: string;
    password: string;
  }

  interface ILoginResponse {
    __typename: 'LoginResponse';
    token: string;
    user: IUser;
  }

  interface IUser {
    __typename: 'User';
    id: number;
    name: string;
    email: string;
    createdAt: string | null;
    updatedAt: string | null;
  }
}

// tslint:enable
