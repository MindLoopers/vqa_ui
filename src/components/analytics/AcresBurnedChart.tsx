import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const acresBurnedData = [
  { year: "2020", acres: 4397809 },
  { year: "2021", acres: 2568948 },
  { year: "2022", acres: 362455 },
  { year: "2023", acres: 324917 },
  { year: "2024", acres: 1050012 },
];

const formatNumber = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

const COLORS = {
  primary: "#1E40AF",
};

const AcresBurnedChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acres Burned by Year</CardTitle>
        <CardDescription>
          Total affected area in California
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={acresBurnedData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="year"
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={formatNumber}
            />
            <Tooltip
              formatter={(value) => [value.toLocaleString(), "Acres"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "2px solid hsl(var(--border))",
              }}
            />
            <Legend />
            <Bar
              dataKey="acres"
              fill={COLORS.primary}
              name="Acres Burned"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AcresBurnedChart;
