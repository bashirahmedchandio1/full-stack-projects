import { Cell, Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface CategoryData {
  name: string;
  amount: number;
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "#6366f1",
  "#f43f5e",
  "#10b981",
  "#f59e0b",
];

const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig;

export default function CategoryBreakdownChart({
  data,
}: {
  data: CategoryData[];
}) {
  if (!data || data.length === 0) {
    return (
      <Card className="rounded-[2.5rem] border-zinc-100 shadow-sm h-full flex flex-col justify-center items-center p-10 text-zinc-400">
        <p>No expense data for categorization</p>
      </Card>
    );
  }

  return (
    <Card className="rounded-[2.5rem] border-zinc-100 shadow-sm overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold px-2">
          Category Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-square w-full max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="amount"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.slice(0, 6).map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs font-medium text-zinc-500 truncate">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
