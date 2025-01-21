import { Bell, ChartPie, Compass, Home, History } from "lucide-react";

type DockItem = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    route: string;
};

export const dockItems: DockItem[] = [
    { icon: ChartPie, label: "Analytics", route: "/analytics" },
    { icon: Home, label: "Home", route: "/dashboard" },
    { icon: History, label: "Changelogs", route: "/changes" },
] as const;