"use client";
import React from "react";
import { ResponsiveContainer, LineChart, Line, Area } from "recharts";

export default function Sparkline({ data = [], color = "#34D399", height = 40 }) {
  if (!data || data.length === 0) return null;
  const points = data.map((d, i) => ({ x: i, v: Number(d) || 0 }));
  const max = points.length ? Math.max(...points.map((p) => p.v)) : 0;
  const gradientId = `spark-${String(color).replace(/[^a-z0-9]/gi, "")}-${height}`;
  return (
    <div style={{ width: 112, height: height }} className="inline-block">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.6} />
              <stop offset="100%" stopColor={color} stopOpacity={0.06} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke="none" fill={`url(#${gradientId})`} />
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
