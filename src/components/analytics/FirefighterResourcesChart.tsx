import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const firefighterResourcesData = [
  { year: "2020", personnel: 15200, engines: 850, aircraft: 45 },
  { year: "2021", personnel: 13800, engines: 720, aircraft: 38 },
  { year: "2022", personnel: 9800, engines: 520, aircraft: 28 },
  { year: "2023", personnel: 8900, engines: 480, aircraft: 25 },
  { year: "2024", personnel: 12400, engines: 680, aircraft: 35 },
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

const FirefighterResourcesChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Firefighter Resources</CardTitle>
        <CardDescription>
          Annual deployment of firefighting assets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={firefighterResourcesData}>
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
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "2px solid hsl(var(--border))",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="personnel"
              stroke={COLORS.primary}
              name="Personnel"
            />
            <Line
              type="monotone"
              dataKey="engines"
              stroke={COLORS.secondary}
              name="Engines"
            />
            <Line
              type="monotone"
              dataKey="aircraft"
              stroke={COLORS.accent}
              name="Aircraft"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FirefighterResourcesChart;
