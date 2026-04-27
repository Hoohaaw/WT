import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";

const ENDPOINT = `${window.location.origin}/graphql`;

const GET_CITIES = gql`
  query GetCities($country: String!) {
    cities(country: $country) {
      id
      name
    }
  }
`;

export interface City {
    id: string;
    name: string;
}

interface CitiesData {
    cities: City[];
}

export function useCities(country: string) {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!country) {
            setCities([]);
            return;
        }
        setLoading(true);
        request<CitiesData>(ENDPOINT, GET_CITIES, { country })
            .then((data) => setCities(data.cities))
            .finally(() => setLoading(false));
    }, [country]);

    return { cities, loading };
}
