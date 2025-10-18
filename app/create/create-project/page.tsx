"use client";

import { JSX, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sparkles, ShieldCheck, Brain, Check } from "lucide-react";
import { motion } from "framer-motion";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FileUpload } from "@/components/FileUpload"; // 👈 import your backend-style FileUpload

type CsvRow = Record<string, string | number>;

export default function CreateProjectPage(): JSX.Element {
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [showGraphs, setShowGraphs] = useState<boolean>(false);
  const [csvData, setCsvData] = useState<CsvRow[]>([]);

  // handle submit
  const handleSubmit = (): void => {
    console.log("✅ Action:", selectedAction);
    console.log("✅ CSV Data Rows:", csvData.length);

    if (!csvData.length) {
      alert("Please upload a CSV file before continuing.");
      return;
    }

    alert(`Action: ${selectedAction || "None"}\nRows: ${csvData.length}`);
    // ⚙️ Here you can trigger a backend API call (e.g., POST /api/analyze)
  };

  return (
    <div className="min-h-screen w-full bg-surface/60 py-10 px-6">
      <MaxWidthWrapper>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 text-sm text-primary font-semibold bg-accent px-2 py-1 rounded">
              <Sparkles className="h-4 w-4" /> New Project
            </div>
            <h1 className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
              Create project
            </h1>
            <p className="mt-1 text-muted-foreground max-w-2xl">
              Upload a CSV, choose an action, and optionally include charts.
              We’ll process your data and prepare a concise report.
            </p>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main column */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Data & Options</CardTitle>
                <CardDescription>
                  Upload your CSV and configure how to analyze it.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* File Upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Upload CSV</Label>
                  <FileUpload
                    onParsed={(data: CsvRow[]) => setCsvData(data)} // 👈 custom event
                  />
                </div>

                {/* Action Selection */}
                <div className="space-y-2">
                  <Label htmlFor="action" className="text-sm font-medium">
                    Select action
                  </Label>
                  <select
                    id="action"
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="" disabled>
                      Choose an option
                    </option>
                    <option value="analyze">Analyze</option>
                    <option value="advice">Give Advice</option>
                    <option value="summarize">Summarize</option>
                    <option value="predict">Predict Trends</option>
                  </select>
                </div>

                {/* Graph Switch */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Include charts
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Add visualizations to your report (optional)
                    </p>
                  </div>
                  <Switch
                    checked={showGraphs}
                    onCheckedChange={setShowGraphs}
                  />
                </div>

                {/* Continue */}
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleSubmit}
                      className="bg-primary px-10 py-4 hover:bg-primary/90 text-primary-foreground"
                      size="lg"
                    >
                      <Brain className="mr-2" width={20} hanging={20} />
                      Generate
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Side helper */}
            <Card>
              <CardHeader>
                <CardTitle>Tips & Guidance</CardTitle>
                <CardDescription>
                  Make the most of your analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-muted-foreground">
                    Files are processed securely. Only metadata and aggregated
                    insights are stored.
                  </p>
                </div>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  {[
                    "Ensure data is clean and well-formatted.",
                    "Accepted format: CSV (comma-separated)",
                    "For large datasets, consider smaller batches.",
                  ].map((item, index) => (
                    <div
                      className="flex justify-start items-center"
                      key={index}
                    >
                      <Check className="h-4 w-4 text-primary mt-0.5" />
                      <li className="list-none ml-2">{item}</li>
                    </div>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
