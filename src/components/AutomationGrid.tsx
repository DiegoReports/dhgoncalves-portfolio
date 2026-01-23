import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface GridCell {
  id: string;
  row: number;
  col: number;
  isActive: boolean;
  opacity: number;
}

const AutomationGrid = () => {
  const [activeCells, setActiveCells] = useState<Set<string>>(new Set());
  const [tracePath, setTracePath] = useState<{ x: number; y: number }[]>([]);
  
  const cols = 20;
  const rows = 12;
  const cellSize = 60;

  const activateRandomCells = useCallback(() => {
    const newActiveCells = new Set<string>();
    const numActive = Math.floor(Math.random() * 5) + 3;
    
    for (let i = 0; i < numActive; i++) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      newActiveCells.add(`${row}-${col}`);
    }
    
    setActiveCells(newActiveCells);
  }, []);

  const generateTracePath = useCallback(() => {
    const path: { x: number; y: number }[] = [];
    let x = Math.floor(Math.random() * cols);
    let y = Math.floor(Math.random() * rows);
    
    for (let i = 0; i < 8; i++) {
      path.push({ x: x * cellSize, y: y * cellSize });
      const direction = Math.random() > 0.5;
      if (direction) {
        x = Math.min(cols - 1, Math.max(0, x + (Math.random() > 0.5 ? 1 : -1)));
      } else {
        y = Math.min(rows - 1, Math.max(0, y + (Math.random() > 0.5 ? 1 : -1)));
      }
    }
    
    setTracePath(path);
  }, []);

  useEffect(() => {
    activateRandomCells();
    generateTracePath();
    
    const cellInterval = setInterval(activateRandomCells, 2500);
    const pathInterval = setInterval(generateTracePath, 4000);
    
    return () => {
      clearInterval(cellInterval);
      clearInterval(pathInterval);
    };
  }, [activateRandomCells, generateTracePath]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ minWidth: cols * cellSize, minHeight: rows * cellSize }}
      >
        <defs>
          <pattern
            id="grid-pattern"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground/[0.05] dark:text-foreground/[0.05]"
              style={{ stroke: "hsl(var(--grid-color))" }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        
        {/* Animated trace path */}
        {tracePath.length > 1 && (
          <motion.path
            d={`M ${tracePath.map(p => `${p.x + cellSize/2} ${p.y + cellSize/2}`).join(' L ')}`}
            fill="none"
            strokeWidth="1"
            style={{ stroke: "hsl(var(--grid-accent))" }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
            transition={{ duration: 3, ease: "easeInOut" }}
            key={tracePath.map(p => `${p.x}-${p.y}`).join(',')}
          />
        )}
      </svg>

      {/* Glowing cells */}
      <div className="absolute inset-0">
        {Array.from(activeCells).map((cellId) => {
          const [row, col] = cellId.split('-').map(Number);
          return (
            <motion.div
              key={cellId}
              className="absolute"
              style={{
                left: col * cellSize,
                top: row * cellSize,
                width: cellSize,
                height: cellSize,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <div 
                className="w-full h-full"
                style={{ backgroundColor: "hsl(var(--grid-accent))" }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Floating data nodes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: "hsl(var(--grid-accent))",
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default AutomationGrid;