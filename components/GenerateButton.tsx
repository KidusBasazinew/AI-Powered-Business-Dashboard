import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function GenerateButton({
  onClick,
  disabled = false,
  loading = false,
}: GenerateButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className="relative"
    >
      {/* Glow effect on hover */}
      {!disabled && !loading && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-600 rounded-lg blur opacity-30"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <Button
        onClick={onClick}
        disabled={disabled || loading}
        className="relative w-full h-14 text-lg font-bold  bg-primary hover:from-primary-600 hover:via-primary-700 hover:to-primary text-primary-foreground transition-all duration-500 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
        data-testid="generate-button"
        aria-label="Generate AI summary"
        aria-pressed={loading}
      >
        {/* Animated shine effect */}
        <motion.div
          className="absolute inset-0 "
          animate={loading ? {} : { x: ["-200%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />

        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mr-2"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <span>Generating Magic...</span>
          </>
        ) : (
          <>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 mr-2" />
            </motion.div>
            <span className="relative z-10">Generalize</span>
          </>
        )}
      </Button>
    </motion.div>
  );
}
