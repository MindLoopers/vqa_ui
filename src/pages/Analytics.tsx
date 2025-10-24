import Sidebar from "@/components/Sidebar";
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
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const wildfireIncidentsData = [
  { year: "2020", incidents: 58291 },
  { year: "2021", incidents: 58727 },
  { year: "2022", incidents: 68583 },
  { year: "2023", incidents: 56202 },
  { year: "2024", incidents: 45000 }, // Estimated
];

const acresBurnedData = [
  { year: "2020", acres: 10270000 },
  { year: "2021", acres: 7100000 },
  { year: "2022", acres: 7662000 },
  { year: "2023", acres: 2674000 },
  { year: "2024", acres: 3500000 }, // Estimated
];

const visitorsByYearData = [
  { year: "2020", visitors: 237000000 },
  { year: "2021", visitors: 297000000 },
  { year: "2022", visitors: 312000000 },
  { year: "2023", visitors: 325000000 },
  { year: "2024", visitors: 330000000 }, // Estimated
];

const visitorsByTimeData = [
  { time: "Jan", visitors: 1200 },
  { time: "Feb", visitors: 1500 },
  { time: "Mar", visitors: 2200 },
  { time: "Apr", visitors: 3500 },
  { time: "May", visitors: 5800 },
  { time: "Jun", visitors: 8200 },
  { time: "Jul", visitors: 10500 },
  { time: "Aug", visitors: 9800 },
  { time: "Sep", visitors: 7200 },
  { time: "Oct", visitors: 4500 },
  { time: "Nov", visitors: 2800 },
  { time: "Dec", visitors: 1800 },
];

const severityData = [
  { category: "Debris Burning", value: 16500 },
  { category: "Equipment Use", value: 6800 },
  { category: "Arson", value: 11900 },
  { category: "Lightning", value: 6200 },
  { category: "Power Lines", value: 4500 },
  { category: "Campfires", value: 2800 },
  // { category: "Smoking", value: 1100 },
  // { category: "Railroads", value: 1700 },
  { category: "Other", value: 5100 },
];

const paymentData = [
  { month: "Jan", amount: 85000000 },
  { month: "Feb", amount: 65000000 },
  { month: "Mar", amount: 120000000 },
  { month: "Apr", amount: 180000000 },
  { month: "May", amount: 320000000 },
  { month: "Jun", amount: 450000000 },
  { month: "Jul", amount: 520000000 },
  { month: "Aug", amount: 480000000 },
  { month: "Sep", amount: 350000000 },
  { month: "Oct", amount: 220000000 },
  { month: "Nov", amount: 130000000 },
  { month: "Dec", amount: 90000000 },
];

const Analytics = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar showAnalyticsMetrics={true} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              Wildfire Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              Historical data and trends from 2020-2024
            </p>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Wildfire Incidents by Year</CardTitle>
                <CardDescription>Number of reported incidents</CardDescription>
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
                      tickFormatter={(value) => {
                        if (value >= 1000000)
                          return `${(value / 1000000).toFixed(1)}M`;
                        if (value >= 1000)
                          return `${(value / 1000).toFixed(0)}K`;
                        return value;
                      }}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
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
                      dataKey="incidents"
                      stroke="#1E40AF"
                      strokeWidth={2}
                      name="Number of Incidents"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acres Burned by Year</CardTitle>
                <CardDescription>Total affected area</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={acresBurnedData}
                    margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                  >
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
                      tickFormatter={(value) => {
                        if (value >= 1000000)
                          return `${(value / 1000000).toFixed(1)}M`;
                        if (value >= 1000)
                          return `${(value / 1000).toFixed(0)}K`;
                        return value;
                      }}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "2px solid hsl(var(--border))",
                      }}
                      formatter={(value) => [
                        `${value.toLocaleString()}`,
                        "Acres Burned",
                      ]}
                    />
                    <Legend />
                    <Bar dataKey="acres" fill="#1E40AF" name="Acres Burned" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Visitors Events by Year</CardTitle>
                <CardDescription>Annual visitor statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={visitorsByYearData}
                    margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                  >
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
                      tickFormatter={(value) => {
                        if (value >= 1000000)
                          return `${(value / 1000000).toFixed(1)}M`;
                        if (value >= 1000)
                          return `${(value / 1000).toFixed(0)}K`;
                        return value;
                      }}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "2px solid hsl(var(--border))",
                      }}
                      formatter={(value) => [
                        `${value.toLocaleString()}`,
                        "Visitors",
                      ]}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="#1E40AF"
                      fill="#1E40AF20"
                      name="Visitors"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Breach by Month</CardTitle>
                <CardDescription>Monthly distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={visitorsByTimeData}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="time"
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => {
                        if (value >= 1000)
                          return `${(value / 1000).toFixed(0)}K`;
                        return value;
                      }}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                      formatter={(value) => [
                        `${value.toLocaleString()}`,
                        "Active Breach",
                      ]}
                    />
                    <Legend />
                    <Bar
                      dataKey="visitors"
                      fill="#1E40AF"
                      name="Active Breach"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Severity Distribution</CardTitle>
                <CardDescription>By cause category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={severityData}
                    layout="vertical"
                    margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis type="number" />
                    <YAxis
                      dataKey="category"
                      type="category"
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Expenses 2019-2020</CardTitle>
                <CardDescription>Monthly expenditure</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={paymentData}
                    margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => {
                        if (value >= 1000000)
                          return `${(value / 1000000).toFixed(1)}M`;
                        if (value >= 1000)
                          return `${(value / 1000).toFixed(0)}K`;
                        return value;
                      }}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="amount"
                      fill="hsl(var(--primary))"
                      name="Expenses (M)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
