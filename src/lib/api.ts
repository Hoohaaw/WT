const isDev = import.meta.env.DEV;

export const GRAPHQL_ENDPOINT = isDev
    ? `${window.location.origin}/graphql`
    : "/api/graphql";
