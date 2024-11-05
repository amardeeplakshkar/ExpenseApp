import { Bell, ChartPie, Compass, Home, History } from "lucide-react";

type DockItem = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    route: string;
};

export const dockItems: DockItem[] = [
    { icon: ChartPie, label: "Stats", route: "/stats" },
    { icon: Compass, label: "Explore", route: "/explore" },
    { icon: Home, label: "Home", route: "/dashboard" },
    { icon: Bell, label: "Notifications", route: "/notifications" },
    { icon: History, label: "Activity", route: "/activity" },
] as const;