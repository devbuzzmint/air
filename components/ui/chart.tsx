"use client"

import * as React from 'react'
import {
  Line,
  LineChart as RechartsLineChart,
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { cn } from '@/lib/utils'

interface ChartProps {
  data: any[]
  categories: string[]
  index: string
  colors?: string[]
  className?: string
  valueFormatter?: (value: number) => string
}

export function LineChart({
  data,
  categories,
  index,
  colors = ['primary', 'muted'],
  valueFormatter = (value: number) => `${value}`,
  className
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={cn('', className)}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey={index}
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
          tickLine={{ stroke: 'hsl(var(--border))' }}
        />
        <YAxis
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
          tickLine={{ stroke: 'hsl(var(--border))' }}
          tickFormatter={valueFormatter}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload) return null
            return (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">{label}</div>
                  {payload.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: `hsl(var(--${colors[index]}))` }}
                      />
                      <span className="font-medium">
                        {valueFormatter(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          }}
        />
        {categories.map((category, index) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={`hsl(var(--${colors[index]}))`}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export function BarChart({
  data,
  categories,
  index,
  colors = ['primary'],
  valueFormatter = (value: number) => `${value}`,
  className
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={cn('', className)}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey={index}
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
          tickLine={{ stroke: 'hsl(var(--border))' }}
        />
        <YAxis
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
          tickLine={{ stroke: 'hsl(var(--border))' }}
          tickFormatter={valueFormatter}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload) return null
            return (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">{label}</div>
                  {payload.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: `hsl(var(--${colors[index]}))` }}
                      />
                      <span className="font-medium">
                        {valueFormatter(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          }}
        />
        {categories.map((category, index) => (
          <Bar
            key={category}
            dataKey={category}
            fill={`hsl(var(--${colors[index]}))`}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}