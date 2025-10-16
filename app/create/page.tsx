"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileUpload } from "@/components/FileUpload";
import { GenerateButton } from "@/components/GenerateButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Download,
  Copy,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  Brain,
  Sparkles,
  Zap,
  BarChart3,
  TrendingUp,
} from "lucide-react";
// import { useToast } from '@/hooks/use-toast';

type ViewState = "input" | "loading" | "success" | "error";

interface GeneratedResult {
  summary: string;
  keyInsights: string[];
  suggestedActions: string[];
}

export default function MainPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [context, setContext] = useState("");
  const [includeCharts, setIncludeCharts] = useState(false);
  const [viewState, setViewState] = useState<ViewState>("input");
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState("");
  // const { toast } = useToast();

  const examplePrompts = [
    "Revenue trends and growth opportunities",
    "Customer churn analysis",
    "Top performing products",
    "Operational efficiency metrics",
  ];

  const handleGenerate = async () => {
    setViewState("loading");
    setError("");

    try {
      // TODO: Replace with actual API call
      // Example API integration:
      // const formData = new FormData();
      // files.forEach(file => formData.append('files', file));
      // formData.append('context', context);
      // formData.append('includeCharts', includeCharts.toString());
      //
      // const response = await fetch('/api/generate', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();

      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock result
      const mockResult: GeneratedResult = {
        summary: `Based on the uploaded data${
          context ? ` with focus on "${context}"` : ""
        }, here's your executive summary:`,
        keyInsights: [
          "Revenue increased 23% quarter-over-quarter, driven primarily by enterprise tier subscriptions",
          "Customer retention improved to 94%, with the strongest retention in mid-market segment",
          "Top 10% of customers contribute 45% of total revenue, indicating healthy concentration",
        ],
        suggestedActions: [
          "Expand enterprise sales team to capitalize on momentum",
          "Invest in customer success programs for mid-market segment",
          "Develop targeted upsell strategies for high-value customers",
        ],
      };

      setResult(mockResult);
      setViewState("success");
      alert("Report generated successfully");
      // toast({
      //   title: 'Report generated successfully',
      //   description: 'Your AI summary is ready to review.',
      // });
    } catch (err) {
      setError("Failed to generate report. Please try again.");
      setViewState("error");
      alert("There was an error processing your request.");
      // toast({
      //   title: 'Generation failed',
      //   description: 'There was an error processing your request.',
      //   variant: 'destructive',
      // });
    }
  };

  const handleClear = () => {
    setFiles([]);
    setContext("");
    setIncludeCharts(false);
    setViewState("input");
    setResult(null);
    setError("");
  };

  const handleCopySummary = () => {
    if (!result) return;

    const fullText = `${result.summary}\n\nKey Insights:\n${result.keyInsights
      .map((i, idx) => `${idx + 1}. ${i}`)
      .join("\n")}\n\nSuggested Actions:\n${result.suggestedActions
      .map((a, idx) => `${idx + 1}. ${a}`)
      .join("\n")}`;

    navigator.clipboard.writeText(fullText);
    alert("Summary copied to clipboard");
    // toast({
    //   title: 'Copied to clipboard',
    //   description: 'Summary copied successfully.',
    // });
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation
    alert("PDF generation will be implemented with backend integration.");
    // toast({
    //   title: 'PDF download',
    //   description: 'PDF generation will be implemented with backend integration.',
    // });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/30 to-primary/5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent-foreground/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Hero Section */}
      <div className="relative border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 glass-card rounded-full mb-6 shadow-lg"
            >
              <Brain className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                AI Dashboard
              </span>
              <Sparkles className="w-4 h-4 text-primary animate-glow" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-foreground via-primary to-accent-foreground bg-clip-text text-transparent">
                Upload data. Get
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                concise AI summaries.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Transform your business data into actionable insights with
              AI-powered analysis
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mt-6"
            >
              {[
                { icon: Zap, text: "Instant Analysis" },
                { icon: BarChart3, text: "Smart Insights" },
                { icon: TrendingUp, text: "Action Items" },
              ].map((feature) => (
                <motion.div
                  key={feature.text}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center space-x-2 px-4 py-2 glass-card rounded-full shadow-md"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass-card p-6 rounded-2xl shadow-elevated border-2 border-primary/10"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <span>How it works</span>
              </h2>
              <div className="space-y-5">
                {[
                  {
                    num: 1,
                    title: "Upload your data",
                    desc: "Drag and drop CSV or Excel files containing your business data",
                    icon: BarChart3,
                  },
                  {
                    num: 2,
                    title: "Add context",
                    desc: "Tell us what you want to focus on for more targeted insights",
                    icon: Brain,
                  },
                  {
                    num: 3,
                    title: "Generate report",
                    desc: "AI analyzes your data and creates an executive summary with action items",
                    icon: Zap,
                  },
                ].map((step) => (
                  <motion.div
                    key={step.num}
                    whileHover={{ x: 4 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                        {step.num}
                      </div>
                      <motion.div
                        className="absolute -inset-1 bg-primary/30 rounded-xl blur-md -z-10"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: step.num * 0.3,
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <step.icon className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass-card p-6 rounded-2xl border-2 border-primary/20 shadow-lg"
            >
              <div className="flex items-start space-x-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Lightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                </motion.div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3">
                    Example use cases
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {[
                      "Financial performance analysis",
                      "Customer behavior patterns",
                      "Sales pipeline optimization",
                      "Operational KPI tracking",
                    ].map((useCase) => (
                      <motion.li
                        key={useCase}
                        whileHover={{ x: 4 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{useCase}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Interaction Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent-foreground/20 rounded-2xl blur-xl opacity-50" />

            <Card className="relative glass-card shadow-intense border-l-4 border-l-primary overflow-hidden">
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none"
                style={{ backgroundSize: "1000px 100%" }}
              />

              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Brain className="w-6 h-6 text-primary" />
                  <span>Generate AI Report</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Upload your data files and provide context for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <AnimatePresence mode="wait">
                  {viewState === "input" && (
                    <motion.div
                      key="input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* File Upload */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Label className="text-base font-semibold mb-3 flex items-center space-x-2">
                          <BarChart3 className="w-5 h-5 text-primary" />
                          <span>Upload Files</span>
                        </Label>
                        <FileUpload
                          onFilesChange={setFiles}
                          accept=".csv,.xlsx"
                          multiple={true}
                        />
                      </motion.div>

                      {/* Context Input */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-3"
                      >
                        <Label
                          htmlFor="context-input"
                          className="text-base font-semibold flex items-center space-x-2"
                        >
                          <Brain className="w-5 h-5 text-primary" />
                          <span>What should I focus on?</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="context-input"
                            placeholder="e.g., revenue trends, churn analysis, top customers"
                            value={context}
                            onChange={(e: any) => setContext(e.target.value)}
                            className="h-12 text-base glass-card border-2 focus:border-primary transition-all"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {examplePrompts.map((prompt, idx) => (
                            <motion.div
                              key={idx}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setContext(prompt)}
                                className="text-xs glass-card border-primary/20 hover:border-primary"
                              >
                                {prompt}
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Options */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center justify-between p-5 glass-card rounded-xl border-2 border-primary/20 shadow-md"
                      >
                        <div className="space-y-1">
                          <Label
                            htmlFor="include-charts"
                            className="text-sm font-semibold cursor-pointer flex items-center space-x-2"
                          >
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span>Include charts in report</span>
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Generate visual representations of key metrics
                          </p>
                        </div>
                        <Switch
                          id="include-charts"
                          checked={includeCharts}
                          onCheckedChange={setIncludeCharts}
                        />
                      </motion.div>

                      {/* Helper Text */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Alert className="glass-card border-2 border-primary/30 shadow-md">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <AlertDescription className="text-sm leading-relaxed">
                            AI will analyze uploaded files and generate a
                            concise executive summary and suggested actions.
                          </AlertDescription>
                        </Alert>
                      </motion.div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <GenerateButton
                          onClick={handleGenerate}
                          disabled={files.length === 0}
                        />
                        {files.length > 0 && (
                          <Button
                            variant="ghost"
                            onClick={handleClear}
                            className="w-full"
                          >
                            Clear all
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {viewState === "loading" && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 py-8"
                    >
                      <div className="text-center space-y-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="inline-block"
                        >
                          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            Analyzing your data...
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            This may take a few moments
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                      </div>
                    </motion.div>
                  )}

                  {viewState === "success" && result && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertDescription className="text-green-800 dark:text-green-200">
                          Report generated successfully!
                        </AlertDescription>
                      </Alert>

                      {/* Summary */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">
                          Executive Summary
                        </h3>
                        <p className="text-foreground leading-relaxed">
                          {result.summary}
                        </p>
                      </div>

                      {/* Key Insights */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Key Insights</h3>
                        <ul className="space-y-2">
                          {result.keyInsights.map((insight, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-2"
                            >
                              <span className="text-primary font-semibold flex-shrink-0">
                                •
                              </span>
                              <span className="text-foreground">{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Suggested Actions */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">
                          Suggested Actions
                        </h3>
                        <ul className="space-y-2">
                          {result.suggestedActions.map((action, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-2"
                            >
                              <span className="text-primary font-semibold flex-shrink-0">
                                {idx + 1}.
                              </span>
                              <span className="text-foreground">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button onClick={handleDownloadPDF} className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button
                          onClick={handleCopySummary}
                          variant="outline"
                          className="flex-1"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Summary
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Full Report
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        onClick={handleClear}
                        className="w-full"
                      >
                        Create New Report
                      </Button>
                    </motion.div>
                  )}

                  {viewState === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 py-4"
                    >
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                      <div className="flex gap-3">
                        <Button onClick={handleGenerate} className="flex-1">
                          Retry
                        </Button>
                        <Button
                          onClick={handleClear}
                          variant="outline"
                          className="flex-1"
                        >
                          Start Over
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
