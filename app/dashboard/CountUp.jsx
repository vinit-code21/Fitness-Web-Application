"use client";
import { useEffect, useState, useRef } from "react";

export default function CountUp({ end = 0, duration = 800, formatter }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef();

  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const to = Number(end) || 0;

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOutQuad approximation
      const current = Math.round(from + (to - from) * eased);
      setValue(current);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration]);

  if (formatter) return <span>{formatter(value)}</span>;
  return <span>{value}</span>;
}
