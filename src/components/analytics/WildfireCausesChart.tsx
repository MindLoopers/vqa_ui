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
  ResponsiveContainer,
} from "recharts";

const severityData = [
  { category: "Equipment Use", value: 1850 },
  { category: "Power Lines", value: 1620 },
  { category: "Arson", value: 1480 },
  { category: "Lightning", value: 1350 },
  { category: "Debris Burning", value: 980 },
  { category: "Campfires", value: 450 },
  { category: "Railroads", value: 320 },
  { category: "Smoking", value: 210 },
  { category: "Other", value: 764 },
];

const formatNumber = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

const COLORS = {
  primary: "#1E40AF",
};

const WildfireCausesChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wildfire Causes Distribution</CardTitle>
        <CardDescription>
          Primary causes of California wildfires
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={severityData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
            />
            <XAxis
              type="number"
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={formatNumber}
            />
            <YAxis
              dataKey="category"
              type="category"
              stroke="hsl(var(--muted-foreground))"
              width={5}
            />
            <Tooltip
              formatter={(value) => [value, "Incidents"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
            />
            <Bar
              dataKey="value"
              fill={COLORS.primary}
              name="Incidents"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WildfireCausesChart;
