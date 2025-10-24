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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const wildfireIncidentsData = [
  { year: "2020", incidents: 9639 },
  { year: "2021", incidents: 8835 },
  { year: "2022", incidents: 7490 },
  { year: "2023", incidents: 7127 },
  { year: "2024", incidents: 8024 },
];

const acresBurnedData = [
  { year: "2020", acres: 4397809 },
  { year: "2021", acres: 2568948 },
  { year: "2022", acres: 362455 },
  { year: "2023", acres: 324917 },
  { year: "2024", acres: 1050012 },
];

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

// Updated 2024 California Wildfire Costs (more detailed)
const paymentData = [
  { category: "Initial Attack", amount: 185 },
  { category: "Aircraft Operations", amount: 285 },
  { category: "Ground Crews", amount: 325 },
  { category: "Equipment/Facilities", amount: 95 },
  { category: "Emergency Funding", amount: 425 },
  { category: "Prevention Programs", amount: 120 },
];

const firefighterResourcesData = [
  { year: "2020", personnel: 15200, engines: 850, aircraft: 45 },
  { year: "2021", personnel: 13800, engines: 720, aircraft: 38 },
  { year: "2022", personnel: 9800, engines: 520, aircraft: 28 },
  { year: "2023", personnel: 8900, engines: 480, aircraft: 25 },
  { year: "2024", personnel: 12400, engines: 680, aircraft: 35 },
];

const evacuationData = [
  { year: "2020", peopleEvacuated: 125000, evacuationOrders: 85 },
  { year: "2021", peopleEvacuated: 89000, evacuationOrders: 62 },
  { year: "2022", peopleEvacuated: 45000, evacuationOrders: 38 },
  { year: "2023", peopleEvacuated: 38000, evacuationOrders: 31 },
  { year: "2024", peopleEvacuated: 68000, evacuationOrders: 52 },
];

const structuresData = [
  { year: "2020", homes: 10488, commercial: 452, other: 1285 },
  { year: "2021", homes: 3629, commercial: 198, other: 542 },
  { year: "2022", homes: 824, commercial: 45, other: 128 },
  { year: "2023", homes: 712, commercial: 38, other: 95 },
  { year: "2024", homes: 1852, commercial: 124, other: 285 },
];

const weatherData = [
  { year: "2020", redFlagDays: 42, extremeHeatDays: 28, droughtIndex: 785 },
  { year: "2021", redFlagDays: 38, extremeHeatDays: 31, droughtIndex: 812 },
  { year: "2022", redFlagDays: 28, extremeHeatDays: 25, droughtIndex: 654 },
  { year: "2023", redFlagDays: 25, extremeHeatDays: 22, droughtIndex: 598 },
  { year: "2024", redFlagDays: 35, extremeHeatDays: 29, droughtIndex: 721 },
];

// Format numbers for display
const formatNumber = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

const formatCurrency = (value: number) => `$${value}M`;

const COLORS = {
  primary: "#1E40AF",
  secondary: "#3B82F6",
  accent: "#60A5FA",
  muted: "#93C5FD",
};

const Analytics = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar showAnalyticsMetrics={true} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-8 pt-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              California Wildfire Analytics Dashboard
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
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
          </div>

          {/* Charts Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
          </div>

          {/* Charts Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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

            <Card>
              <CardHeader>
                <CardTitle>Fire Suppression Costs 2024</CardTitle>
                <CardDescription>
                  Expenditure distribution (in millions USD)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={paymentData} margin={{ bottom: 50 }}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
