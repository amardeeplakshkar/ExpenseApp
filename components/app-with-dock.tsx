"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { dockItems } from "@/constants/index"; 

export function DockComponent() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <nav className="flex items-center justify-around mt-auto bg-background p-2">
      {dockItems.map((item) => (
        <Button
          key={item.route}
          variant="ghost"
          className={`flex flex-col items-center p-2  hover:scale-110 ${pathname === item.route ? "text-primary" : "text-muted-foreground"
            }`}
          onClick={() => handleNavigation(item.route)}
        >
          <item.icon/>
          <span className="text-[.7rem]">{item.label}</span>
        </Button>
      ))}
    </nav>
  );
}
