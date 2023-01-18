const envVariables = {
    // FIXME: This has to be fixed
    graphqlEndpoint: process.env.NEXT_APP_GRAPHQL_ENDPOINT ?? 'http://server:8020/graphql/',
};

export default envVariables;
