import { SidebarNavigation } from "../components/organisms/sidebar-navigation";

const examples = [
    {
        country: "Sweden",
        readings: [
            { date: "1900-01", averageTemperature: -2.4, averageTemperatureUncertainty: 0.8 },
            { date: "1950-07", averageTemperature: 14.1, averageTemperatureUncertainty: 0.5 },
            { date: "2000-01", averageTemperature: -1.1, averageTemperatureUncertainty: 0.3 },
        ],
    },
    {
        country: "Brazil",
        readings: [
            { date: "1900-01", averageTemperature: 24.3, averageTemperatureUncertainty: 1.1 },
            { date: "1950-07", averageTemperature: 26.8, averageTemperatureUncertainty: 0.6 },
            { date: "2000-01", averageTemperature: 27.5, averageTemperatureUncertainty: 0.2 },
        ],
    },
    {
        country: "Japan",
        readings: [
            { date: "1900-01", averageTemperature: 5.2, averageTemperatureUncertainty: 0.9 },
            { date: "1950-07", averageTemperature: 25.6, averageTemperatureUncertainty: 0.4 },
            { date: "2000-01", averageTemperature: 6.8, averageTemperatureUncertainty: 0.2 },
        ],
    },
];

export default function Dashboard() {
    return (
        <SidebarNavigation>
            <div className="p-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="font-heading text-4xl font-semibold text-foreground mb-3">
                        Global Climate Readings
                    </h1>
                    <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
                        This dataset contains historical average land surface temperatures recorded across
                        countries and cities worldwide, spanning from the early 1800s to the present day.
                        Each reading includes an average temperature and an uncertainty margin, reflecting
                        the confidence level of the measurement at that point in time.
                    </p>
                </div>

                {/* Country cards */}
                <h2 className="font-heading font-semibold text-foreground mb-4 text-lg">
                    Example Readings by Country
                </h2>
                <div className="grid gap-5 sm:grid-cols-3">
                    {examples.map(({ country, readings }) => (
                        <div key={country} className="rounded-xl border border-border bg-card overflow-hidden">
                            <div className="px-5 py-4 border-b border-border">
                                <h3 className="font-heading font-semibold text-foreground">{country}</h3>
                            </div>
                            <div className="divide-y divide-border">
                                {readings.map((r) => (
                                    <div key={r.date} className="px-5 py-3">
                                        <p className="text-xs text-muted-foreground mb-1">{r.date}</p>
                                        <p className="text-foreground font-medium">
                                            {r.averageTemperature.toFixed(1)}°C
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            ±{r.averageTemperatureUncertainty.toFixed(1)}°C uncertainty
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SidebarNavigation>
    );
}
