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
  IndianRupee,
} from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import NumberTicker from "@/components/ui/number-ticker";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDialogContext } from "@/components/contexts/useDialogContext";
import CurrencyIcon from "@/components/CurrencyIcon";
import { useSpendContext } from "@/components/contexts/useSpendContext";

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

const spendDataInitial: SpendItem[] = [
  {
    name: "Shopping",
    icon: ShoppingCart,
    date: "2025-01-20",
    time: "14:30",
    amount: 120.5,
  },
  {
    name: "Transport",
    icon: Bus,
    date: "2025-01-19",
    time: "08:15",
    amount: 15.0,
  },
  {
    name: "Dining",
    icon: Utensils,
    date: "2025-01-18",
    time: "19:00",
    amount: 45.75,
  },
  {
    name: "Entertainment",
    icon: Film,
    date: "2025-01-17",
    time: "20:45",
    amount: 30.0,
  },
  {
    name: "Utilities",
    icon: Lightbulb,
    date: "2025-01-15",
    time: "10:00",
    amount: 80.25,
  },
  {
    name: "Healthcare",
    icon: HeartPulse,
    date: "2025-01-14",
    time: "16:00",
    amount: 60.0,
  },
  {
    name: "Education",
    icon: BookOpen,
    date: "2025-01-13",
    time: "09:30",
    amount: 200.0,
  },
  {
    name: "Internet",
    icon: Wifi,
    date: "2025-01-12",
    time: "12:00",
    amount: 50.0,
  },
  {
    name: "Phone Bill",
    icon: Smartphone,
    date: "2025-01-11",
    time: "11:00",
    amount: 25.0,
  },
  {
    name: "Gifts",
    icon: Gift,
    date: "2025-01-10",
    time: "18:00",
    amount: 75.0,
  },
  {
    name: "Gifts2",
    icon: Gift,
    date: "2025-01-10",
    time: "18:00",
    amount: 75.0,
  },
];



const Page = () => {
  const currency = "IndianRupee"
  const { isDialogOpen, closeDialog } = useDialogContext();
  const { spendData,setSpendData } = useSpendContext();
  const [newSpend, setNewSpend] = useState<{ name: string; date: string; time: string; amount: string; icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>> }>({ name: "", date: "", time: "", amount: "", icon: ShoppingCart });
  const [selectedIcon, setSelectedIcon] = useState<React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>>(ShoppingCart);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setSpendData(spendDataInitial); 
      setLoading(false);
    };

    fetchData();
  }, [setSpendData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSpend((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSpend = () => {
    if (newSpend.name && newSpend.date && newSpend.time && newSpend.amount) {
      setSpendData((prev) => [
        ...prev,
        { ...newSpend, amount: parseFloat(newSpend.amount), icon: selectedIcon }
      ]);
      setNewSpend({ name: "", date: "", time: "", amount: "", icon: ShoppingCart });
      setSelectedIcon(ShoppingCart);
    }
  };

  const toPascalCase = (str: string) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const groupedByDate = spendData.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = { total: 0, items: [] };
    }
    acc[item.date].total += item.amount;
    acc[item.date].items.push(item);
    return acc;
  }, {} as Record<string, { total: number; items: SpendItem[] }>);

  // Sort the dates in ascending order
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // Helper function to format the date as "DD/MM/YYYY"
  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <main className="relative flex flex-col items-center gap-2 h-[81dvh]">
        {
          loading ? (
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
                  <NumberTicker className="text-red-500" value={parseInt((Object.values(groupedByDate).reduce((acc, { total }) => acc + total, 0)).toFixed(0), 10) || 0.01} />
                </span>.{(Object.values(groupedByDate).reduce((acc, { total }) => acc + total, 0)).toFixed(2).split(".")[1]}
              </h2>
            </>
          )
        }

        <ScrollArea className="w-full overflow-y-auto card-container p-4">
          {sortedDates.length === 0 ?
            <>Moye Moye</>
            : sortedDates.map((date) => (
              <div key={date}>
                <div className="sticky top-0 flex justify-between p-2 font-semibold bg-background">
                  <p>{formatDate(date)}</p> {/* Changed to use the formatDate function */}
                  <p className="flex items-center">
                  <CurrencyIcon icon={currency} /> {groupedByDate[date].total.toFixed(2)}
                  </p>
                </div>
                {groupedByDate[date].items.map((data, index) => (
                  <SpendCard key={index} currency={currency} Icon={data.icon} name={toPascalCase(data.name)} time={data.time} amount={data.amount.toFixed(2)} />
                ))}
              </div>
            ))}
        </ScrollArea>

        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent className="rounded-xl">
            <DialogTitle>
              <div className="pb-2 text-lg text-center font-semibold">Add New Spend</div>
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
                  <div key={index} className="p-4  rounded cursor-pointer hover:bg-slate-500/10 " onClick={() => setSelectedIcon(Icon)}>
                    <Icon className={`h-8 w-8 ${selectedIcon === Icon ? 'text-blue-500' : 'text-gray-600'}`} />
                  </div>
                ))}
              </div>

              <DialogClose
                onClick={handleAddSpend}
                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded">
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
