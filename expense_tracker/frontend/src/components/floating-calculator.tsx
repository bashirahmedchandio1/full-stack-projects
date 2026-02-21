import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calculator,
  Minus,
  X,
  Maximize2,
  Minimize2,
  Divide,
  Plus,
  Equal,
  Delete,
  Hash,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export default function FloatingCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [isNewNumber, setIsNewNumber] = useState(true);

  const calculate = (first: number, second: number, op: string) => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "×":
        return first * second;
      case "÷":
        return second !== 0 ? first / second : 0;
      default:
        return second;
    }
  };

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    const current = parseFloat(display);
    if (prevValue === null) {
      setPrevValue(current);
    } else if (operator) {
      const result = calculate(prevValue, current, operator);
      setPrevValue(result);
      setDisplay(String(result));
    }
    setOperator(op);
    setIsNewNumber(true);
  };

  const handleEqual = () => {
    if (prevValue === null || !operator) return;
    const current = parseFloat(display);
    const result = calculate(prevValue, current, operator);
    setDisplay(String(result));
    setPrevValue(null);
    setOperator(null);
    setIsNewNumber(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setIsNewNumber(true);
  };

  const handleBackscape = () => {
    if (display.length === 1) {
      setDisplay("0");
      setIsNewNumber(true);
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-poppins">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-brand text-white rounded-full flex items-center justify-center shadow-xl shadow-brand/30 hover:scale-110 active:scale-95 transition-transform"
          >
            <Calculator className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              height: isMinimized ? "64px" : "480px",
              width: "320px",
            }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className={cn(
              "bg-white border border-zinc-100 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col",
              isMinimized && "rounded-[1.5rem]",
            )}
          >
            {/* Header */}
            <div className="bg-zinc-900 p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-brand" />
                <span className="text-xs font-black tracking-widest uppercase">
                  Quick Calc
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors group"
                >
                  <X className="w-4 h-4 group-hover:text-red-400" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col flex-1"
                >
                  {/* Display */}
                  <div className="bg-zinc-50 p-6 flex flex-col items-end justify-center min-h-[100px] border-b border-zinc-100 italic">
                    <span className="text-zinc-400 text-sm font-medium h-5">
                      {prevValue !== null
                        ? `${prevValue} ${operator || ""}`
                        : ""}
                    </span>
                    <span className="text-4xl font-black text-zinc-900 tracking-tighter truncate max-w-full">
                      {display}
                    </span>
                  </div>

                  {/* Keys */}
                  <div className="p-4 grid grid-cols-4 gap-2 flex-1 pt-6">
                    {/* Row 1 */}
                    <CalcButton
                      onClick={handleClear}
                      className="bg-red-50 text-red-500 hover:bg-red-100"
                    >
                      AC
                    </CalcButton>
                    <CalcButton
                      onClick={handleBackscape}
                      className="bg-zinc-50 text-zinc-500 hover:bg-zinc-100"
                    >
                      <Delete className="w-4 h-4" />
                    </CalcButton>
                    <CalcButton
                      onClick={() => handleOperator("÷")}
                      className="bg-brand/5 text-brand hover:bg-brand/10"
                    >
                      <Divide className="w-4 h-4" />
                    </CalcButton>
                    <CalcButton
                      onClick={() => handleOperator("×")}
                      className="bg-brand/5 text-brand hover:bg-brand/10"
                    >
                      <X className="w-4 h-4" />
                    </CalcButton>

                    {/* Row 2 */}
                    <CalcButton onClick={() => handleNumber("7")}>7</CalcButton>
                    <CalcButton onClick={() => handleNumber("8")}>8</CalcButton>
                    <CalcButton onClick={() => handleNumber("9")}>9</CalcButton>
                    <CalcButton
                      onClick={() => handleOperator("-")}
                      className="bg-brand/5 text-brand hover:bg-brand/10"
                    >
                      <Minus className="w-4 h-4" />
                    </CalcButton>

                    {/* Row 3 */}
                    <CalcButton onClick={() => handleNumber("4")}>4</CalcButton>
                    <CalcButton onClick={() => handleNumber("5")}>5</CalcButton>
                    <CalcButton onClick={() => handleNumber("6")}>6</CalcButton>
                    <CalcButton
                      onClick={() => handleOperator("+")}
                      className="bg-brand/5 text-brand hover:bg-brand/10"
                    >
                      <Plus className="w-4 h-4" />
                    </CalcButton>

                    {/* Row 4 */}
                    <CalcButton onClick={() => handleNumber("1")}>1</CalcButton>
                    <CalcButton onClick={() => handleNumber("2")}>2</CalcButton>
                    <CalcButton onClick={() => handleNumber("3")}>3</CalcButton>
                    <CalcButton
                      onClick={handleEqual}
                      className="bg-brand text-white hover:bg-brand-dark row-span-2 shadow-lg shadow-brand/20"
                    >
                      <Equal className="w-5 h-5" />
                    </CalcButton>

                    {/* Row 5 */}
                    <CalcButton
                      onClick={() => handleNumber("0")}
                      className="col-span-2"
                    >
                      0
                    </CalcButton>
                    <CalcButton onClick={() => handleNumber(".")}>.</CalcButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {isMinimized && (
              <div
                className="flex-1 flex items-center justify-center p-2 bg-zinc-800 text-brand font-black text-sm italic tracking-widest cursor-pointer"
                onClick={() => setIsMinimized(false)}
              >
                CLICK TO EXPAND
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CalcButton({
  children,
  onClick,
  className,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-full min-h-[50px] rounded-2xl font-black text-lg transition-all active:scale-95 border-none",
        !className?.includes("bg-") &&
          "bg-zinc-50 hover:bg-zinc-100 text-zinc-900",
        className,
      )}
    >
      {children}
    </Button>
  );
}
