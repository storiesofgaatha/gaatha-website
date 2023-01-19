import {
    request,
    Variables,
    RequestDocument,
} from 'graphql-request';
import {
    VariablesAndRequestHeaders,
} from 'graphql-request/dist/types';
import { DocumentNode } from 'graphql';

export const graphqlEndpoint = process.env.NEXT_APP_GRAPHQL_ENDPOINT as string;

// NOTE: this should be imporeted from @graphql-typed-document-node/core instead
export interface TypedDocumentNode<
    Result = { [key: string]: any },
    Variables = { [key: string]: any },
> extends DocumentNode {
    /*
    * This type is used to ensure that the variables you pass in to the query are
    * assignable to Variables and that the Result is assignable to whatever you pass
    * your result to. The method is never actually implemented, but the type is valid
    * because we list it as optional
    */
    __apiType?: (variables: Variables) => Result;
}

export function gaathaRequest<T = any, V extends Variables = Variables>(
    document: RequestDocument | TypedDocumentNode<T, V>,
    ...variablesAndRequestHeaders: VariablesAndRequestHeaders<V>
): Promise<T> {
    return request(graphqlEndpoint, document, ...variablesAndRequestHeaders);
}
