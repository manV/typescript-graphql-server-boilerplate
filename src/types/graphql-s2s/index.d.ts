declare module 'graphql-s2s' {
  export interface graphqls2s {
    transpileSchema(input: string): string;
  }
  export var graphqls2s: graphqls2s;
}
