declare module 'schemaglue' {
  function glue(
    path: string,
    options: {
      ignore: string;
    }
  ): {
    schema: string;
  };

  export = glue;
}
