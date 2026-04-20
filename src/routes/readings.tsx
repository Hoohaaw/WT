import { useState } from "react";
import { SidebarNavigation } from "../components/organisms/sidebar-navigation";
import { useCountries } from "../hooks/use-countries";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";

const YEARS = Array.from({ length: 2013 - 1743 + 1 }, (_, i) => 1743 + i);

export default function Readings() {
    const { countries, loading } = useCountries();
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string>("");

    return (
        <SidebarNavigation>
            <div className="p-8 max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-heading text-3xl font-semibold text-foreground">Readings</h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Browse climate data by year and country
                    </p>
                </div>

            <div className="mb-8 flex flex-row items-end gap-6">
                {/* Year selector */}
                <div className="w-80">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                        Select Year
                    </label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="w-80">
                            <SelectValue placeholder="Pick a year" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {YEARS.map((year) => (
                                <SelectItem key={year} value={String(year)}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Country selector */}
                <div className="w-80">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                        Select Country
                    </label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry} disabled={loading}>
                        <SelectTrigger className="w-80">
                            <SelectValue placeholder={loading ? "Loading..." : "Pick a country"} />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {countries.map((country) => (
                                <SelectItem key={country.id} value={country.id}>
                                    {country.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="">
                    <Button disabled={!selectedYear || !selectedCountry} className="w-40">
                        Load Data
                    </Button>
                </div>
            </div>
                {/* Graph placeholder */}
                <div className="rounded-xl border border-dashed border-border bg-card/50 h-72 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Graph</p>
                </div>
           
            </div>
        </SidebarNavigation>
    );
}
