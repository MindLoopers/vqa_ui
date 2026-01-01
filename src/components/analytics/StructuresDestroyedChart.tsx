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

const structuresData = [
  { year: "2020", homes: 10488, commercial: 452, other: 1285 },
  { year: "2021", homes: 3629, commercial: 198, other: 542 },
  { year: "2022", homes: 824, commercial: 45, other: 128 },
  { year: "2023", homes: 712, commercial: 38, other: 95 },
  { year: "2024", homes: 1852, commercial: 124, other: 285 },
];

const formatNumber = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

const COLORS = {
  primary: "#1E40AF",
  secondary: "#3B82F6",
  accent: "#60A5FA",
};

const StructuresDestroyedChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Structures Destroyed</CardTitle>
        <CardDescription>
          Buildings lost to wildfires by type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={structuresData}>
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
              formatter={(value) => [
                value.toLocaleString(),
                "Structures",
              ]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "2px solid hsl(var(--border))",
              }}
            />
            <Legend />
            <Bar dataKey="homes" fill={COLORS.primary} name="Homes" />
            <Bar
              dataKey="commercial"
              fill={COLORS.secondary}
              name="Commercial"
            />
            <Bar dataKey="other" fill={COLORS.accent} name="Other" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StructuresDestroyedChart;
