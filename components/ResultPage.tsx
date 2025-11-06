"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { BarChart3, Filter, ListChecks, SlidersHorizontal } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

// Types
export type CsvRow = Record<string, string | number | null | undefined>;

type ResultPageProps = {
  csvData?: CsvRow[]; // optional for demo; component will fall back to example data
  className?: string;
};

// Utility: detect label (x-axis) key — prefer Date/Time or first non-numeric column
function getLabelKey(rows: CsvRow[]): string | null {
  if (!rows.length) return null;
  const keys = Object.keys(rows[0] || {});
  const preferred = ["date", "Date", "time", "Time", "month", "Month"];
  const preferredKey = preferred.find((k) => keys.includes(k));
  if (preferredKey) return preferredKey;
  // Fallback: first non-numeric key
  for (const key of keys) {
    const val = rows[0]?.[key];
    const n = typeof val === "string" ? Number(val) : val;
    if (typeof n !== "number" || Number.isNaN(n)) return key;
  }
  return keys[0] ?? null;
}

// Utility: derive numeric metric keys
function getNumericKeys(rows: CsvRow[], exclude: string[] = []): string[] {
  if (!rows.length) return [];
  const sample = rows[0];
  return Object.keys(sample).filter((k) => {
    if (exclude.includes(k)) return false;
    const v = sample[k];
    const n = typeof v === "string" ? Number(v) : v;
    return typeof n === "number" && !Number.isNaN(n);
  });
}

// Utility: safe number
function toNum(v: unknown): number {
  const n = typeof v === "string" ? Number(v) : (v as number);
  return Number.isFinite(n) ? n : 0;
}

// Utility: color generator (HSL)
function datasetColor(i: number) {
  const hue = (i * 47) % 360; // spread hues
  const bg = `hsl(${hue} 90% 60% / 0.25)`;
  const border = `hsl(${hue} 90% 50%)`;
  return { backgroundColor: bg, borderColor: border };
}

// Demo data (used if no csvData is passed)
const demoData: CsvRow[] = [
  { Month: "Jan", Revenue: 12000, Cost: 8000, Users: 420, Region: "US", Country: "USA" },
  { Month: "Feb", Revenue: 15000, Cost: 9000, Users: 510, Region: "EU", Country: "Germany" },
  { Month: "Mar", Revenue: 18000, Cost: 11000, Users: 560, Region: "US", Country: "USA" },
  { Month: "Apr", Revenue: 17000, Cost: 9500, Users: 590, Region: "APAC", Country: "Japan" },
  { Month: "May", Revenue: 21000, Cost: 12000, Users: 650, Region: "EU", Country: "France" },
  { Month: "Jun", Revenue: 24000, Cost: 14000, Users: 720, Region: "US", Country: "USA" },
];

// Metric Selector (multi-select via DropdownMenu checkboxes)
function MetricSelector({
  allMetrics,
  selected,
  onChange,
}: {
  allMetrics: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (k: string) => {
    if (selected.includes(k)) onChange(selected.filter((m) => m !== k));
    else onChange([...selected, k]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 rounded-xl border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60"
        >
          <ListChecks className="size-4" /> Metrics
          {selected.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selected.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl">
        <DropdownMenuLabel className="flex items-center gap-2">
          <SlidersHorizontal className="size-4" /> Select metrics
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {allMetrics.map((m) => (
          <DropdownMenuCheckboxItem
            key={m}
            checked={selected.includes(m)}
            onCheckedChange={() => toggle(m)}
            className="capitalize"
          >
            {m}
          </DropdownMenuCheckboxItem>
        ))}
        {allMetrics.length === 0 && (
          <DropdownMenuItem disabled>No numeric metrics found</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Overview chart — single combined series (sum of selected or all metrics)
function OverviewChart({
  rows,
  labelKey,
  metricKeys,
}: {
  rows: CsvRow[];
  labelKey: string;
  metricKeys: string[];
}) {
  const { labels, data } = useMemo(() => {
    const labels = rows.map((r) => String(r[labelKey] ?? ""));
    const data = rows.map((r) =>
      metricKeys.reduce((acc, k) => acc + toNum(r[k]), 0)
    );
    return { labels, data };
  }, [rows, labelKey, metricKeys]);

  const color = datasetColor(0);

  return (
    <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="size-5 text-blue-600" /> Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: metricKeys.length ? `Total (${metricKeys.join(", ")})` : "Total",
                  data,
                  borderWidth: 2,
                  fill: true,
                  tension: 0.35,
                  ...color,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" as const, labels: { boxWidth: 12 } },
                title: { display: true, text: "Overall Trend", color: "hsl(222 47% 11%)" },
                tooltip: { mode: "index", intersect: false },
              },
              interaction: { mode: "index", intersect: false },
              scales: {
                x: {
                  title: { display: true, text: labelKey },
                  ticks: { color: "hsl(215 20% 30%)" },
                  grid: { color: "rgba(0,0,0,0.05)" },
                },
                y: {
                  title: { display: true, text: "Value" },
                  ticks: { color: "hsl(215 20% 30%)" },
                  grid: { color: "rgba(0,0,0,0.08)" },
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Filtered (customizable) charts — Line + Bar
function FilteredCharts({
  rows,
  labelKey,
  metricKeys,
}: {
  rows: CsvRow[];
  labelKey: string;
  metricKeys: string[];
}) {
  const labels = useMemo(() => rows.map((r) => String(r[labelKey] ?? "")), [rows, labelKey]);

  const datasets = useMemo(
    () =>
      metricKeys.map((k, i) => ({
        label: k,
        data: rows.map((r) => toNum(r[k])),
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        ...datasetColor(i),
      })),
    [metricKeys, rows]
  );

  if (!metricKeys.length) {
    return (
      <Card className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/60 backdrop-blur rounded-2xl">
        <CardContent className="p-8">
          <Empty className="border-0">
            <EmptyMedia variant="icon">
              <Filter className="size-6" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>Select metrics to view data</EmptyTitle>
              <EmptyDescription>
                Choose one or more metrics from the selector to visualize trends.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const, labels: { boxWidth: 12 } },
      title: {
        display: false,
        text: "",
      },
      tooltip: { mode: "index" as const, intersect: false },
    },
    interaction: { mode: "index" as const, intersect: false },
    scales: {
      x: {
        title: { display: true, text: labelKey },
        ticks: { color: "hsl(215 20% 30%)" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      y: {
        title: { display: true, text: "Value" },
        ticks: { color: "hsl(215 20% 30%)" },
        grid: { color: "rgba(0,0,0,0.08)" },
      },
    },
  } satisfies import("chart.js").ChartOptions;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Line Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={{ labels, datasets }} options={commonOptions} />
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Bar Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar
            data={{
              labels,
              datasets: datasets.map((d) => ({
                ...d,
                borderWidth: 0,
                borderRadius: 8,
                barPercentage: 0.7,
              })),
            }}
            options={commonOptions}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResultPageCharts({ csvData, className }: ResultPageProps) {
  // Example usage state
  const data = csvData && csvData.length ? csvData : demoData;

  const labelKey = useMemo(() => getLabelKey(data) ?? "Index", [data]);
  const numericKeys = useMemo(() => getNumericKeys(data, labelKey ? [labelKey] : []), [data, labelKey]);

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(numericKeys.slice(0, 2));
  const [region, setRegion] = useState<string>("all");

  // Country/Region options
  const regionKey = useMemo(() => {
    const keys = Object.keys(data[0] || {});
    if (keys.includes("Country")) return "Country";
    if (keys.includes("country")) return "country";
    if (keys.includes("Region")) return "Region";
    if (keys.includes("region")) return "region";
    return null;
  }, [data]);

  const regions = useMemo(() => {
    if (!regionKey) return [] as string[];
    const set = new Set<string>();
    data.forEach((r) => {
      const v = r[regionKey];
      if (typeof v === "string" && v.trim()) set.add(v);
    });
    return Array.from(set);
  }, [data, regionKey]);

  const filtered = useMemo(() => {
    if (regionKey && region !== "all") {
      return data.filter((r) => String(r[regionKey]) === region);
    }
    return data;
  }, [data, region, regionKey]);

  // Animation variants
  const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className={cn(
      "min-h-[60vh] w-full",
      "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
      "rounded-2xl p-4 sm:p-6 lg:p-8",
      className
    )}>
      {/* Header */}
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Analytics Overview
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Explore metrics with interactive charts and filters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MetricSelector
              allMetrics={numericKeys}
              selected={selectedMetrics}
              onChange={setSelectedMetrics}
            />

            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Optional extra actions */}
            <Button
              variant="default"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
              onClick={() => setSelectedMetrics(numericKeys)}
            >
              Select All
            </Button>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setSelectedMetrics([])}
            >
              Clear
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Overview */}
      <motion.div {...fadeUp} transition={{ delay: 0.05, duration: 0.5 }} className="mb-6">
        <OverviewChart
          rows={filtered}
          labelKey={labelKey}
          metricKeys={selectedMetrics.length ? selectedMetrics : numericKeys}
        />
      </motion.div>

      {/* Customizable charts */}
      <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }}>
        <Card className="border-0 shadow-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Customizable Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <FilteredCharts rows={filtered} labelKey={labelKey} metricKeys={selectedMetrics} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
