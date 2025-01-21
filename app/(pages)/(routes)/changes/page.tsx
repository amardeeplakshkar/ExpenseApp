"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Confetti } from "@/components/ui/confetti";

const ChangesPage = () => {
  const [loading, setLoading] = useState(true);
  const [readmeContent, setReadmeContent] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const upcomingUpdates = [
    {
      version: "2.0.0",
      features: [
        "Export expenses to CSV/PDF",
        "Multiple currency support",
        "Budget planning and alerts",
        "Expense categories customization",
      ],
    },
    {
      version: "1.2.0",
      features: [
        "Launch as PWA",
        "Dark/Light mode improvements",
        "Enhanced analytics with more charts",
        "Expense search and filtering",
        "Share expenses via links",
      ],
    },
  ];

  const changelog = [
    {
      version: "1.1.0",
      date: "2025-01-21",
      changes: [
        "Data persistence with MongoDB integration",
        "Added analytics dashboard",
        "Implemented expense tracking",
        "Added user authentication",
        "Dark mode support",
      ],
    },
    {
      version: "1.0.0",
      date: "2024-03-01",
      changes: [
        "Initial release",
        "Basic expense tracking",
        "User interface setup",
      ],
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col h-[81dvh] overflow-y-auto p-4 space-y-4">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[81dvh] w-full p-2 space-y-1">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">📋 Upcoming Updates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingUpdates.map((update) => (
            <div key={update.version} className="space-y-2">
              <h3 className="text-lg font-semibold">Version {update.version}</h3>
              <ul className="list-disc list-inside space-y-1">
                {update.features.map((feature, index) => (
                  <li key={index} className="text-muted-foreground">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">📝 Changelog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {changelog.map((release) => (
            <div key={release.version} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Version {release.version}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {release.date}
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1">
                {release.changes.map((change, index) => (
                  <li key={index} className="text-muted-foreground">
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default ChangesPage;