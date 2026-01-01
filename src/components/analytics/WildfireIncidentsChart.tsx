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

const wildfireIncidentsData = [
  { year: "2020", incidents: 9639 },
  { year: "2021", incidents: 8835 },
  { year: "2022", incidents: 7490 },
  { year: "2023", incidents: 7127 },
  { year: "2024", incidents: 8024 },
];

const formatNumber = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

const COLORS = {
  primary: "#1E40AF",
};

const WildfireIncidentsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wildfire Incidents by Year</CardTitle>
        <CardDescription>
          Number of reported incidents in California
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={wildfireIncidentsData}>
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
                "Incidents",
              ]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "2px solid hsl(var(--border))",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="incidents"
              stroke={COLORS.primary}
              strokeWidth={2}
              name="Number of Incidents"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WildfireIncidentsChart;
