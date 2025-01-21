"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { dockItems } from "@/constants/index";
import { useDialogContext } from "./contexts/useDialogContext";
import { PlusCircle } from "lucide-react";

export function DockComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const { openDialog } = useDialogContext();
  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <nav className="flex items-center justify-between mt-auto bg-background px-6 py-6">
      {dockItems.map((item, i) => (
        <div
          key={item.route}
          className={`flex flex-col items-center transition-all p-2 hover:scale-[1.5] ${pathname === item.route ? "text-primary scale-[1.5]" : "text-muted-foreground"
            }`}
        >
          {pathname === "/dashboard" && item.route === "/dashboard" ? (
             <PlusCircle
             className="cursor-pointer text-yellow-500"
             onClick={openDialog} // Open dialog on click
           />
          ) : (
            item.icon && <item.icon  onClick={() => handleNavigation(item.route)} className="cursor-pointer" />
          )}
        </div>
      ))}
    </nav>

  );
}
