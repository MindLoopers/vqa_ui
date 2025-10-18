import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";

const wildfireIncidentsData = [
  { year: '2020', incidents: 58 },
  { year: '2021', incidents: 53 },
  { year: '2022', incidents: 68 },
  { year: '2023', incidents: 66 },
  { year: '2024', incidents: 62 },
];

const acresBurnedData = [
  { year: '2020', acres: 10000000 },
  { year: '2021', acres: 7000000 },
  { year: '2022', acres: 7500000 },
  { year: '2023', acres: 6500000 },
  { year: '2024', acres: 9000000 },
];

const visitorsByYearData = [
  { year: '2020', visitors: 8000000 },
  { year: '2021', visitors: 8500000 },
  { year: '2022', visitors: 7500000 },
  { year: '2023', visitors: 8200000 },
  { year: '2024', observers: 7800000 },
];

const visitorsByTimeData = [
  { time: 'Jan', visitors: 800 },
  { time: 'Feb', visitors: 1200 },
  { time: 'Mar', visitors: 1500 },
  { time: 'Apr', visitors: 1800 },
  { time: 'May', visitors: 2200 },
  { time: 'Jun', visitors: 2800 },
  { time: 'Jul', visitors: 3200 },
  { time: 'Aug', visitors: 3000 },
  { time: 'Sep', visitors: 2400 },
  { time: 'Oct', visitors: 1900 },
  { time: 'Nov', visitors: 1300 },
  { time: 'Dec', visitors: 1000 },
];

const severityData = [
  { category: 'Highways', value: 120 },
  { category: 'Campfires', value: 80 },
  { category: 'Lightning', value: 60 },
  { category: 'Equipment', value: 40 },
];

const paymentData = [
  { month: 'Jan', amount: 45 },
  { month: 'Feb', amount: 30 },
  { month: 'Mar', amount: 25 },
  { month: 'Apr', amount: 22 },
  { month: 'May', amount: 20 },
  { month: 'Jun', amount: 18 },
];

const Analytics = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar showAnalyticsMetrics={true} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Wildfire Analytics Dashboard</h1>
            <p className="text-muted-foreground">Historical data and trends from 2020-2024</p>
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
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="incidents" 
                      stroke="hsl(var(--primary))" 
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
                  <BarChart data={acresBurnedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="acres" fill="hsl(var(--primary))" name="Acres Burned" />
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
                  <AreaChart data={visitorsByYearData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }} 
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary) / 0.2)" 
                      name="Visitors"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Breach by Year</CardTitle>
                <CardDescription>Monthly distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={visitorsByTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="visitors" fill="hsl(var(--primary))" name="Active Breach" />
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
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={severityData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="category" type="category" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
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
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={paymentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" name="Expenses (M)" />
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
