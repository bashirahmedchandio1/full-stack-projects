import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface TrendData {
  date: string;
  income: number;
  expense: number;
}

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expense: {
    label: "Expense",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function SpendingTrendsChart({ data }: { data: TrendData[] }) {
  return (
    <Card className="rounded-[2.5rem] border-zinc-100 shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold px-2">
          Spending Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full px-6 pb-6"
        >
          <AreaChart
            data={data}
            margin={{
              left: -20,
              right: 12,
              top: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="income"
              type="natural"
              fill="var(--color-income)"
              fillOpacity={0.1}
              stroke="var(--color-income)"
              strokeWidth={3}
              stackId="a"
            />
            <Area
              dataKey="expense"
              type="natural"
              fill="var(--color-expense)"
              fillOpacity={0.1}
              stroke="var(--color-expense)"
              strokeWidth={3}
              stackId="b"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
