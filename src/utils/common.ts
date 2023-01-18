const envVariables = {
    graphqlEndpoint: process.env.NEXT_APP_GRAPHQL_ENDPOINT ?? 'http://server:8000/graphql/',
};

export default envVariables;
