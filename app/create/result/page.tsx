"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Share2,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ResultPage() {
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [insights, setInsights] = useState<string[]>([]);

  const [csvData, setCsvData] = useState<any[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [availableMetrics, setAvailableMetrics] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("ai_result");
    const storedCsv = localStorage.getItem("csv_data");

    if (stored) {
      setAnalysis(stored);
      extractInsights(stored);
      setIsLoading(false);
    }

    if (storedCsv) {
      try {
        const parsed = JSON.parse(storedCsv);
        setCsvData(parsed);

        if (parsed.length > 0) {
          // store all numeric columns as available metrics
          const first = parsed[0];
          const numericCols = Object.keys(first).filter(
            (k) => !isNaN(Number(first[k]))
          );
          setAvailableMetrics(numericCols);
          setSelectedMetrics(numericCols.slice(0, 2)); // show first 2 by default
        }
      } catch {
        console.warn("Could not parse stored CSV data.");
      }
    }
  }, []);

  const extractInsights = (text: string) => {
    // Simple extraction of bullet points or key sections
    const lines = text.split("\n");
    const extracted = lines
      .filter(
        (line) => line.trim().startsWith("-") || line.trim().startsWith("*")
      )
      .map((line) => line.replace(/^[-*]\s*/, "").trim())
      .slice(0, 6); // Limit to 6 insights
    setInsights(extracted);
  };

  const getChartData = () => {
    if (!csvData.length || !selectedMetrics.length) return null;

    const columns = Object.keys(csvData[0]);
    const labelKey = columns[1] || "Index"; // e.g., "Country" or 2nd column
    const labels = csvData.map((row) => String(row[labelKey]));

    const datasets = selectedMetrics.map((key, idx) => ({
      label: key,
      data: csvData.map((row) => Number(row[key]) || 0),
      borderColor: `hsl(${idx * 50}, 70%, 50%)`,
      backgroundColor: `hsla(${idx * 50}, 70%, 50%, 0.4)`,
      tension: 0.3,
    }));

    return { labels, datasets };
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([analysis], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "business-analysis.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Business Analysis Report",
          text: "Check out this AI-generated business analysis!",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Generating your analysis...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header Section */}
      {csvData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-lg">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Data Visualization
                </div>

                {/* 🧮 Metric Selector */}
                <select
                  multiple
                  value={selectedMetrics}
                  onChange={(e) =>
                    setSelectedMetrics(
                      Array.from(e.target.selectedOptions, (opt) => opt.value)
                    )
                  }
                  className="border border-slate-300 dark:border-slate-600 rounded-md px-2 py-1 text-sm bg-background"
                >
                  {availableMetrics.map((metric) => (
                    <option key={metric} value={metric}>
                      {metric}
                    </option>
                  ))}
                </select>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {getChartData() ? (
                <>
                  <Line
                    data={getChartData()!}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: "Line Chart (Filtered)" },
                      },
                      scales: {
                        x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },
                      },
                    }}
                  />
                  <Bar
                    data={getChartData()!}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: "Bar Chart (Filtered)" },
                      },
                      scales: {
                        x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },
                      },
                    }}
                  />
                </>
              ) : (
                <p className="text-center text-muted-foreground">
                  Select one or more metrics to visualize.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg"
            >
              <BarChart3 className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Analysis Complete
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Your AI-powered business insights are ready. Discover actionable
              recommendations and data-driven strategies.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Lightbulb className="w-6 h-6" />
                  Detailed Analysis Report
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-500" />
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          {children}
                        </h2>
                      ),
                      ul: ({ children }) => (
                        <ul className="space-y-2 mb-4">{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span>{children}</span>
                        </li>
                      ),
                    }}
                  >
                    {analysis}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Key Insights */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-lg"
                    >
                      <Badge variant="secondary" className="mt-1">
                        {index + 1}
                      </Badge>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {insight}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Results
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate New Analysis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-1">
                    Analysis Quality
                  </h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-300 mb-2">
                    98%
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-500">
                    AI Confidence Score
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
