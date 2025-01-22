"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { useState, useEffect } from "react";
import CurrencyIcon from "@/components/CurrencyIcon";
import { ShoppingCart } from "lucide-react";

const iconMap: { [key: string]: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>> } = {
  ShoppingCart,
};

const AnalyticsPage = () => {
  const { user } = useUser();
  const [spendData, setSpendData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpendData = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(`/api/spends?userId=${user.id}`);
        if (!response.ok) throw new Error("Failed to fetch spends");
        const data = await response.json();

        // Transform the data to include the actual icon component
        const transformedData = data.map((spend: any) => ({
          ...spend,
          icon: iconMap[spend.icon] || ShoppingCart,
        }));

        setSpendData(transformedData);
      } catch (error) {
        console.error("Error fetching spends:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSpendData();
    }
  }, [user]);

  // Group data by date and calculate totals
  const dailySpending = Object.entries(
    spendData.reduce((acc, item) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = { date, total: 0, count: 0 };
      }
      acc[date].total += item.amount;
      acc[date].count += 1;
      return acc;
    }, {} as Record<string, { date: string; total: number; count: number }>)
  )
    .map(([, value]) => ({
      ...value,
      date: formatDate(new Date(value.date)),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate category-wise spending
  const categorySpending = spendData.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = 0;
    }
    acc[item.name] += item.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(categorySpending).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  const totalSpent = spendData.reduce((sum, item) => sum + item.amount, 0);
  const averageSpend =
    spendData.length > 0 ? totalSpent / spendData.length : 0;
  const highestSpend = Math.max(...spendData.map((item) => item.amount));

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-[81dvh]">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CurrencyIcon icon="IndianRupee" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSpent.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Spend</CardTitle>
            <CurrencyIcon icon="IndianRupee" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageSpend.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Spend</CardTitle>
            <CurrencyIcon icon="IndianRupee" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highestSpend.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Spending Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[210px] w-full" config={{}}>
            <BarChart data={dailySpending}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload) return null;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Date
                          </span>
                          <span className="font-bold">
                            {payload[0]?.payload.date}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Amount
                          </span>
                          <span className="font-bold">
                            {
                              payload[0]?.value && !isNaN(Number(payload[0]?.value))
                                ? `₹${Number(payload[0]?.value).toFixed(2)}`
                                : "₹0.00"
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="total"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Category Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px] w-full" config={{}}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Spending Trend Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Spending Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[210px] w-full" config={{}}>
            <LineChart data={dailySpending}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;