import { useState } from "react";
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { SidebarNavigation } from "../components/organisms/sidebar-navigation";
import { useCountries } from "../hooks/use-countries";
import { useCities } from "../hooks/use-cities";
import { useCountryReadings } from "../hooks/use-country-readings";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";

const YEARS = Array.from({ length: 2013 - 1850 + 1 }, (_, i) => 1850 + i);

export default function Readings() {
    const { countries, loading: countriesLoading, error: countriesError } = useCountries();
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<string>("");
    const { cities, loading: citiesLoading } = useCities(selectedCountry);
    const { data, loading: dataLoading, error, load } = useCountryReadings();

    function handleCountryChange(country: string) {
        setSelectedCountry(country);
        setSelectedCity("");
    }

    function handleLoad() {
        if (selectedCity) load(selectedCity, selectedYear);
    }

    const chartData = data.map((r) => ({
        date: r.date,
        temp: parseFloat(r.averageTemperature.toFixed(2)),
        upper: parseFloat((r.averageTemperature + r.averageTemperatureUncertainty).toFixed(2)),
        lower: parseFloat((r.averageTemperature - r.averageTemperatureUncertainty).toFixed(2)),
    }));

    return (
        <SidebarNavigation>
            <div className="p-8 max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="font-heading text-3xl font-semibold text-foreground">Readings</h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Browse climate data by city and year
                    </p>
                    {countriesError && (
                        <p className="mt-2 text-xs text-destructive">Countries error: {countriesError.message}</p>
                    )}
                </div>

                <div className="mb-8 flex flex-row items-end gap-4 flex-wrap">
                    {/* Country */}
                    <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Country</label>
                        <Select value={selectedCountry} onValueChange={handleCountryChange} disabled={countriesLoading}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder={countriesLoading ? "Loading..." : "Pick a country"} />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {countries.map((c) => (
                                    <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* City */}
                    <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">City</label>
                        <Select
                            value={selectedCity}
                            onValueChange={setSelectedCity}
                            disabled={!selectedCountry || citiesLoading}
                        >
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder={citiesLoading ? "Loading..." : "Pick a city"} />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {cities.map((c) => (
                                    <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Year */}
                    <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Year (optional)</label>
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="All years" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {YEARS.map((year) => (
                                    <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button disabled={!selectedCity || dataLoading} onClick={handleLoad} className="w-36">
                        {dataLoading ? "Loading…" : "Load Data"}
                    </Button>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                    {error ? (
                        <div className="h-80 flex items-center justify-center text-sm text-destructive">
                            Failed to load data: {error.message}
                        </div>
                    ) : dataLoading ? (
                        <div className="h-80 flex items-center justify-center text-sm text-muted-foreground">
                            Fetching readings…
                        </div>
                    ) : chartData.length === 0 ? (
                        <div className="h-80 flex items-center justify-center text-sm text-muted-foreground">
                            Select a country, city, and click Load Data
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={320}>
                            <ComposedChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fill: "#a1a1aa", fontSize: 11 }}
                                    tickLine={false}
                                    axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                                    interval="preserveStartEnd"
                                />
                                <YAxis
                                    tick={{ fill: "#a1a1aa", fontSize: 11 }}
                                    tickLine={false}
                                    axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                                    unit="°C"
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1c1917",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "8px",
                                        fontSize: "12px",
                                        color: "#e7e5e4",
                                    }}
                                    formatter={(value, name) => {
                                        const labels: Record<string, string> = {
                                            temp: "Avg Temperature",
                                            upper: "Upper bound",
                                            lower: "Lower bound",
                                        };
                                        return [`${value}°C`, labels[String(name)] ?? String(name)];
                                    }}
                                />
                                <Legend
                                    wrapperStyle={{ fontSize: "12px", color: "#a1a1aa" }}
                                    formatter={(value) => {
                                        const labels: Record<string, string> = {
                                            temp: "Avg Temperature",
                                            upper: "Uncertainty (upper)",
                                            lower: "Uncertainty (lower)",
                                        };
                                        return labels[value] ?? value;
                                    }}
                                />
                                <Area type="monotone" dataKey="upper" stroke="transparent" fill="rgba(249,115,22,0.12)" legendType="none" />
                                <Area type="monotone" dataKey="lower" stroke="transparent" fill="rgba(249,115,22,0.12)" legendType="none" />
                                <Line type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#f97316" }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </SidebarNavigation>
    );
}
