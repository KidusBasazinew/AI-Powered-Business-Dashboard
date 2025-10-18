"use client";

import React, { useState, useCallback } from "react";
import { Upload, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Papa from "papaparse";

// Utility to format file sizes
const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export function FileUpload({ onParsed }: { onParsed?: (data: any[]) => void }) {
  const [files, setFiles] = useState<any[]>([]);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // ✅ FIXED: properly closed parentheses and braces
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: any) => {
          console.log("✅ Parsed CSV:", results.data);
          setParsedData(results.data);
          onParsed?.(results.data); // send parsed data to parent
        },
      });

      setFiles([{ id: Date.now(), name: file.name, size: file.size }]);
    },
    [onParsed]
  );

  // Remove file
  const removeFile = (id: number) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-muted"
        }`}
        whileHover={{ scale: 1.01 }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) {
            Papa.parse(file, {
              header: true,
              skipEmptyLines: true,
              complete: (results: any) => {
                console.log("✅ Parsed CSV:", results.data);
                setParsedData(results.data);
                onParsed?.(results.data);
              },
            });
            setFiles([{ id: Date.now(), name: file.name, size: file.size }]);
          }
        }}
      >
        <input
          type="file"
          id="file-input"
          className="hidden"
          onChange={handleFileUpload}
          accept=".csv"
        />

        <label
          htmlFor="file-input"
          className="cursor-pointer flex flex-col items-center space-y-3"
        >
          <motion.div
            animate={
              isDragging ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }
            }
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="absolute inset-0 bg-primary/10 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Upload className="w-14 h-14 text-primary relative z-10" />
          </motion.div>

          <div>
            <p className="text-lg font-semibold text-foreground mb-2">
              Drag CSV here or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Accepts only .csv files
            </p>
          </div>
        </label>
      </motion.div>

      {/* File list */}
      <AnimatePresence mode="popLayout">
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center justify-between p-4 rounded-xl border-2 border-primary/10 shadow-sm"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  className="flex-shrink-0 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parsed CSV preview */}
      {parsedData.length > 0 && (
        <div className="mt-4 p-4 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">Parsed Data Preview</h3>
          <pre className="text-sm max-h-64 overflow-auto bg-muted p-3 rounded-md">
            {JSON.stringify(parsedData.slice(0, 5), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
