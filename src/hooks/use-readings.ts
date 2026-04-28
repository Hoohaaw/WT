import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";

import { GRAPHQL_ENDPOINT as ENDPOINT } from "../lib/api";

const GET_READINGS = gql`
  query GetReadings {
    readings {
      id
      date
      averageTemperature
      averageTemperatureUncertainty
    }
  }
`;

export interface Reading {
    id: string;
    date: string;
    averageTemperature: number;
    averageTemperatureUncertainty: number;
}

interface ReadingsData {
    readings: Reading[];
}

export function useReadings() {
    const [readings, setReadings] = useState<Reading[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        request<ReadingsData>(ENDPOINT, GET_READINGS)
            .then((data) => setReadings(data.readings))
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { readings, loading, error };
}
