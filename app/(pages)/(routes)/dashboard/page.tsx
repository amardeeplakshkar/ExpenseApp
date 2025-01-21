"use client";
import SpendCard from "@/components/SpendCard";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  ShoppingCart,
  Bus,
  Utensils,
  Film,
  Lightbulb,
  BaggageClaim,
  HeartPulse,
  BookOpen,
  Wifi,
  Gift,
  Hammer,
  Smartphone,
} from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import NumberTicker from "@/components/ui/number-ticker";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDialogContext } from "@/components/contexts/useDialogContext";
import CurrencyIcon from "@/components/CurrencyIcon";
import { useSpendContext } from "@/components/contexts/useSpendContext";
import { useUser } from "@clerk/nextjs";

// Define the type for a spend item
type SpendItem = {
  name: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  date: string;
  time: string;
  amount: number;
};

// Define available icons
const availableIcons = [
  { name: "Shopping", icon: ShoppingCart },
  { name: "Transport", icon: Bus },
  { name: "Dining", icon: Utensils },
  { name: "Entertainment", icon: Film },
  { name: "Utilities", icon: Lightbulb },
  { name: "Shopping", icon: BaggageClaim },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Education", icon: BookOpen },
  { name: "Internet", icon: Wifi },
  { name: "Phone Bill", icon: Smartphone },
  { name: "Gifts", icon: Gift },
  { name: "Home Improvement", icon: Hammer },
];

const iconMap: { [key: string]: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>> } = {
  ShoppingCart,
  Bus,
  Utensils,
  Film,
  Lightbulb,
  BaggageClaim,
  HeartPulse,
  BookOpen,
  Wifi,
  Gift,
  Hammer,
  Smartphone,
};

const Page = () => {
  const currency = "IndianRupee";
  const { isDialogOpen, closeDialog } = useDialogContext();
  const { spendData, setSpendData } = useSpendContext();
  const { user } = useUser();
  const [newSpend, setNewSpend] = useState<{
    name: string;
    date: string;
    time: string;
    amount: string;
    icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  }>({
    name: "",
    date: "",
    time: "",
    amount: "",
    icon: ShoppingCart,
  });
  const [selectedIcon, setSelectedIcon] = useState<
    React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>
  >(ShoppingCart);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpends = async () => {
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
      fetchSpends();
    }
  }, [user, setSpendData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSpend((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSpend = async () => {
    if (!user?.id) return;
    
    if (newSpend.name && newSpend.date && newSpend.time && newSpend.amount) {
      try {
        // Get the icon name from the selected icon component
        const iconName = Object.keys(iconMap).find(
          (key) => iconMap[key] === selectedIcon
        ) || "ShoppingCart";

        const response = await fetch("/api/spends", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            name: newSpend.name,
            date: newSpend.date,
            time: newSpend.time,
            amount: parseFloat(newSpend.amount),
            icon: iconName,
          }),
        });

        if (!response.ok) throw new Error("Failed to add spend");

        const newSpendData = await response.json();
        
        // Transform the response to include the actual icon component
        const transformedSpend = {
          ...newSpendData,
          icon: iconMap[newSpendData.icon] || ShoppingCart,
        };

        setSpendData((prev) => [transformedSpend, ...prev]);
        setNewSpend({
          name: "",
          date: "",
          time: "",
          amount: "",
          icon: ShoppingCart,
        });
        setSelectedIcon(ShoppingCart);
        closeDialog();
      } catch (error) {
        console.error("Error adding spend:", error);
      }
    }
  };

  const toPascalCase = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const groupedByDate = spendData.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = { total: 0, items: [] };
    }
    acc[item.date].total += item.amount;
    acc[item.date].items.push(item);
    return acc;
  }, {} as Record<string, { total: number; items: SpendItem[] }>);

  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <main className="relative flex flex-col items-center gap-2 h-[81dvh]">
        {loading ? (
          <>
            <Skeleton className="h-[1rem] w-[8rem] mt-[1.65rem]" />
            <Skeleton className="h-[3.75rem] w-[10rem]" />
          </>
        ) : (
          <>
            <p className="pt-[1rem] text-muted-foreground">Spends This Month</p>
            <h2 className="flex items-center justify-center text-xl text-red-500 font-[500]">
              <CurrencyIcon icon={currency} />-
              <span className="text-5xl">
                <NumberTicker
                  className="text-red-500"
                  value={parseInt(
                    Object.values(groupedByDate)
                      .reduce((acc, { total }) => acc + total, 0)
                      .toFixed(0),
                    10
                  ) || 0.01}
                />
              </span>
              .
              {Object.values(groupedByDate)
                .reduce((acc, { total }) => acc + total, 0)
                .toFixed(2)
                .split(".")[1]}
            </h2>
          </>
        )}

        <ScrollArea className="w-full overflow-y-auto card-container p-4">
          {sortedDates.length === 0 ? (
            <>No spends recorded yet</>
          ) : (
            sortedDates.map((date) => (
              <div key={date}>
                <div className="sticky top-0 flex justify-between p-2 font-semibold bg-background">
                  <p>{formatDate(date)}</p>
                  <p className="flex items-center">
                    <CurrencyIcon size={15} icon={currency} />{" "}
                    {groupedByDate[date].total.toFixed(2)}
                  </p>
                </div>
                {groupedByDate[date].items.map((data, index) => (
                  <SpendCard
                    key={index}
                    currency={currency}
                    Icon={data.icon}
                    name={toPascalCase(data.name)}
                    time={data.time}
                    amount={data.amount.toFixed(2)}
                  />
                ))}
              </div>
            ))
          )}
        </ScrollArea>

        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent className="rounded-xl">
            <DialogTitle>
              <div className="pb-2 text-lg text-center font-semibold">
                Add New Spend
              </div>
            </DialogTitle>
            <div className="flex flex-col gap-2 items-center">
              <input
                type="text"
                name="name"
                placeholder="Spend Name"
                value={newSpend.name}
                onChange={handleChange}
                className="p-2 border rounded-xl w-full"
              />
              <input
                type="date"
                name="date"
                value={newSpend.date}
                onChange={handleChange}
                className="p-2 border rounded-xl w-full"
                max={new Date().toISOString().split("T")[0]}
              />
              <input
                type="time"
                name="time"
                value={newSpend.time}
                onChange={handleChange}
                className="p-2 border rounded-xl w-full"
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={newSpend.amount}
                onChange={handleChange}
                className="p-2 border rounded-xl w-full"
              />

              <div className="flex flex-wrap justify-center m-2">
                {availableIcons.map(({ name, icon: Icon }, index) => (
                  <div
                    key={index}
                    className="p-4  rounded cursor-pointer hover:bg-slate-500/10 "
                    onClick={() => setSelectedIcon(Icon)}
                  >
                    <Icon
                      className={`h-8 w-8 ${
                        selectedIcon === Icon ? "text-blue-500" : "text-gray-600"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <DialogClose
                onClick={handleAddSpend}
                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
              >
                Add Spend
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
};

export default Page;