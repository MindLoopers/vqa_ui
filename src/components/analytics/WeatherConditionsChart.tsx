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

const weatherData = [
  { year: "2020", redFlagDays: 42, extremeHeatDays: 28, droughtIndex: 785 },
  { year: "2021", redFlagDays: 38, extremeHeatDays: 31, droughtIndex: 812 },
  { year: "2022", redFlagDays: 28, extremeHeatDays: 25, droughtIndex: 654 },
  { year: "2023", redFlagDays: 25, extremeHeatDays: 22, droughtIndex: 598 },
  { year: "2024", redFlagDays: 35, extremeHeatDays: 29, droughtIndex: 721 },
];

const COLORS = {
  primary: "#1E40AF",
  secondary: "#3B82F6",
  accent: "#60A5FA",
};

const WeatherConditionsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Conditions</CardTitle>
        <CardDescription>Annual fire weather metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weatherData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="year"
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "2px solid hsl(var(--border))",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="redFlagDays"
              stroke={COLORS.primary}
              name="Red Flag Days"
            />
            <Line
              type="monotone"
              dataKey="extremeHeatDays"
              stroke={COLORS.secondary}
              name="Extreme Heat Days"
            />
            <Line
              type="monotone"
              dataKey="droughtIndex"
              stroke={COLORS.accent}
              name="Drought Index"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeatherConditionsChart;
