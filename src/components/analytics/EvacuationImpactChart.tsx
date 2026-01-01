import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const evacuationData = [
  { year: "2020", peopleEvacuated: 125000, evacuationOrders: 85 },
  { year: "2021", peopleEvacuated: 89000, evacuationOrders: 62 },
  { year: "2022", peopleEvacuated: 45000, evacuationOrders: 38 },
  { year: "2023", peopleEvacuated: 38000, evacuationOrders: 31 },
  { year: "2024", peopleEvacuated: 68000, evacuationOrders: 52 },
];

const formatNumber = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

const COLORS = {
  primary: "#1E40AF",
  secondary: "#3B82F6",
};

const EvacuationImpactChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evacuation Impact</CardTitle>
        <CardDescription>
          People evacuated and evacuation orders issued
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={evacuationData}>
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
                "People/Orders",
              ]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "2px solid hsl(var(--border))",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="peopleEvacuated"
              stroke={COLORS.primary}
              fill={`${COLORS.primary}20`}
              name="People Evacuated"
            />
            <Area
              type="monotone"
              dataKey="evacuationOrders"
              stroke={COLORS.secondary}
              fill={`${COLORS.secondary}20`}
              name="Evacuation Orders"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EvacuationImpactChart;
