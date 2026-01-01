import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trendText?: string;
  showTrend?: boolean;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  subtitle,
  trendText,
  showTrend = false,
}) => {
  return (
    <Card className="bg-background">
      <CardHeader className="pb-2 py-2 text-center">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 text-center">
        <div className="text-2xl font-bold text-primary">{value}</div>
        {showTrend && trendText && (
          <p className="text-xs text-muted-foreground flex items-center justify-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
            {trendText}
          </p>
        )}
        {subtitle && !showTrend && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
