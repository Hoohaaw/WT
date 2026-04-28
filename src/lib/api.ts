export const GRAPHQL_ENDPOINT = import.meta.env.PROD
    ? `${window.location.origin}/api/graphql`
    : `${window.location.origin}/graphql`;
