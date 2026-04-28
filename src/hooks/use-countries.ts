import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";

import { GRAPHQL_ENDPOINT as ENDPOINT } from "../lib/api";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      name
    }
  }
`;

export interface Country {
    id: string;
    name: string;
}

interface CountriesData {
    countries: Country[];
}

export function useCountries() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        request<CountriesData>(ENDPOINT, GET_COUNTRIES)
            .then((data) => setCountries(data.countries))
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { countries, loading, error };
}
