import { useCallback, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FileWithPreview extends File {
  id: string;
}

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

export function FileUpload({
  onFilesChange,
  accept = ".csv,.xlsx",
  multiple = true,
}: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => {
        const extension = "." + file.name.split(".").pop()?.toLowerCase();
        return accept.split(",").some((ext) => ext.trim() === extension);
      });

      if (droppedFiles.length > 0) {
        const filesWithId = droppedFiles.map((file) =>
          Object.assign(file, {
            id: `${file.name}-${Date.now()}-${Math.random()}`,
          })
        ) as FileWithPreview[];

        const newFiles = multiple ? [...files, ...filesWithId] : filesWithId;
        setFiles(newFiles);
        onFilesChange(newFiles);
      }
    },
    [files, multiple, accept, onFilesChange]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];

    const filesWithId = selectedFiles.map((file) =>
      Object.assign(file, { id: `${file.name}-${Date.now()}-${Math.random()}` })
    ) as FileWithPreview[];

    const newFiles = multiple ? [...files, ...filesWithId] : filesWithId;
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const removeFile = (fileId: string) => {
    const newFiles = files.filter((f) => f.id !== fileId);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300
          ${
            isDragging
              ? "border-primary bg-primary/10 shadow-glow scale-[1.02]"
              : "border-border glass-card hover:border-primary/50 hover:shadow-elevated hover:scale-[1.01]"
          }
        `}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        data-testid="file-dropzone"
      >
        <input
          type="file"
          id="file-input"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          aria-label="Upload files"
        />

        <label
          htmlFor="file-input"
          className="cursor-pointer flex flex-col items-center space-y-3"
          aria-describedby="upload-instructions"
        >
          <motion.div
            animate={
              isDragging ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }
            }
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Upload className="w-14 h-14 text-primary relative z-10" />
          </motion.div>

          <div>
            <p
              className="text-lg font-semibold text-foreground mb-2"
              id="upload-instructions"
            >
              Drag CSV(s) here or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Accepts {accept} files {multiple && "• Multiple files supported"}
            </p>
          </div>
        </label>
      </motion.div>

      {/* File List */}
      <AnimatePresence mode="popLayout">
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
            role="list"
            aria-label="Uploaded files"
          >
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center justify-between p-4 glass-card rounded-xl border-2 border-primary/20 shadow-md"
                data-testid="file-item"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
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
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
