const isDev = import.meta.env.DEV;

export const GRAPHQL_ENDPOINT = isDev
    ? `${window.location.origin}/graphql`
    : "https://climate-reading-api.vercel.app/graphql";
