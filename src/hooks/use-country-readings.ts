import { useState, useCallback } from "react";
import { request, gql } from "graphql-request";
import type { Reading } from "./use-readings";

const ENDPOINT = `${window.location.origin}/graphql`;

const GET_READINGS = gql`
  query GetCityReadings($city: String!, $limit: Int!) {
    readings(city: $city, limit: $limit) {
      id
      date
      averageTemperature
      averageTemperatureUncertainty
    }
  }
`;

interface RawReading {
    id: string;
    date: string;
    averageTemperature: number;
    averageTemperatureUncertainty: number;
}

interface ReadingsData {
    readings: RawReading[];
}

export interface AggregatedReading {
    date: string;
    averageTemperature: number;
    averageTemperatureUncertainty: number;
}

function toYear(timestamp: string): string {
    return new Date(Number(timestamp)).getUTCFullYear().toString();
}

function toDateString(timestamp: string): string {
    const d = new Date(Number(timestamp));
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function aggregateByYear(readings: RawReading[]): AggregatedReading[] {
    const byYear = new Map<string, number[]>();
    const uncByYear = new Map<string, number[]>();

    for (const r of readings) {
        const year = toYear(r.date);
        if (!byYear.has(year)) {
            byYear.set(year, []);
            uncByYear.set(year, []);
        }
        byYear.get(year)!.push(r.averageTemperature);
        uncByYear.get(year)!.push(r.averageTemperatureUncertainty);
    }

    return Array.from(byYear.entries())
        .map(([year, temps]) => ({
            date: year,
            averageTemperature: temps.reduce((a, b) => a + b, 0) / temps.length,
            averageTemperatureUncertainty:
                uncByYear.get(year)!.reduce((a, b) => a + b, 0) / uncByYear.get(year)!.length,
        }))
        .sort((a, b) => a.date.localeCompare(b.date));
}

export function useCountryReadings() {
    const [data, setData] = useState<AggregatedReading[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const load = useCallback(async (city: string, year: string) => {
        setLoading(true);
        setError(null);
        setData([]);

        try {
            const result = await request<ReadingsData>(ENDPOINT, GET_READINGS, {
                city,
                limit: 3000,
            });
            const all = result.readings;

            if (year) {
                const filtered = all
                    .filter((r) => toYear(r.date) === year)
                    .map((r) => ({ ...r, date: toDateString(r.date) }))
                    .sort((a, b) => a.date.localeCompare(b.date));
                console.log(`Filtered to ${filtered.length} readings for year ${year}`);
                setData(filtered);
            } else {
                const aggregated = aggregateByYear(all);
                console.log(`Aggregated to ${aggregated.length} yearly points`);
                setData(aggregated);
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, load };
}

export type { Reading };
