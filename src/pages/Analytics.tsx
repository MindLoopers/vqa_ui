import Sidebar from "@/components/Sidebar";
import WildfireIncidentsChart from "@/components/analytics/WildfireIncidentsChart";
import AcresBurnedChart from "@/components/analytics/AcresBurnedChart";
import WeatherConditionsChart from "@/components/analytics/WeatherConditionsChart";
import StructuresDestroyedChart from "@/components/analytics/StructuresDestroyedChart";
import FirefighterResourcesChart from "@/components/analytics/FirefighterResourcesChart";
import EvacuationImpactChart from "@/components/analytics/EvacuationImpactChart";
import WildfireCausesChart from "@/components/analytics/WildfireCausesChart";
import SuppressionCostsChart from "@/components/analytics/SuppressionCostsChart";

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
            <WildfireIncidentsChart />
            <AcresBurnedChart />
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <WeatherConditionsChart />
            <StructuresDestroyedChart />
          </div>

          {/* Charts Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <FirefighterResourcesChart />
            <EvacuationImpactChart />
          </div>

          {/* Charts Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <WildfireCausesChart />
            <SuppressionCostsChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
