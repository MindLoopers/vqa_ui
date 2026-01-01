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

const paymentData = [
  { category: "Initial Attack", amount: 185 },
  { category: "Aircraft Operations", amount: 285 },
  { category: "Ground Crews", amount: 325 },
  { category: "Equipment/Facilities", amount: 95 },
  { category: "Emergency Funding", amount: 425 },
  { category: "Prevention Programs", amount: 120 },
];

const formatCurrency = (value: number) => `$${value}M`;

const COLORS = {
  primary: "#1E40AF",
};

const SuppressionCostsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fire Suppression Costs 2024</CardTitle>
        <CardDescription>
          Expenditure distribution (in millions USD)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={paymentData} margin={{ bottom: 50, left: 20 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="category"
              stroke="hsl(var(--muted-foreground))"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={formatCurrency}
            />
            <Tooltip
              formatter={(value) => [`$${value}M`, "Amount"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "2px solid hsl(var(--border))",
              }}
            />
            <Bar
              dataKey="amount"
              fill={COLORS.primary}
              name="Cost (M)"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SuppressionCostsChart;
