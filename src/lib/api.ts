export const GRAPHQL_ENDPOINT = import.meta.env.PROD
    ? "https://climate-reading-api.vercel.app/graphql"
    : `${window.location.origin}/graphql`;
