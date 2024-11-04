"use client";
import SpendCard from "@/components/SpendCard";
import { IndianRupee, PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogTrigger,
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

// Define the type for a spend item
type SpendItem = {
  name: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
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
  { name: "Groceries", icon: ShoppingCart, time: "08:30", amount: 250.75 },
  { name: "Transport", icon: Bus, time: "09:15", amount: 50.0 },
  { name: "Dining", icon: Utensils, time: "12:45", amount: 120.5 },
  { name: "Entertainment", icon: Film, time: "15:00", amount: 300.0 },
  { name: "Utilities", icon: Lightbulb, time: "17:30", amount: 200.0 },
  { name: "Shopping", icon: BaggageClaim, time: "19:00", amount: 450.0 },
  { name: "Healthcare", icon: HeartPulse, time: "21:15", amount: 100.25 },
  { name: "Education", icon: BookOpen, time: "10:30", amount: 75.0 },
  { name: "Internet", icon: Wifi, time: "11:00", amount: 60.0 },
  { name: "Phone Bill", icon: Smartphone, time: "13:30", amount: 90.0 },
];

const Page = () => {
  const [spendData, setSpendData] = useState<SpendItem[]>(spendDataInitial);
  const [newSpend, setNewSpend] = useState<{ name: string; time: string; amount: string; icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>> }>({ name: "", time: "", amount: "", icon: ShoppingCart });
  const [selectedIcon, setSelectedIcon] = useState<React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>>(ShoppingCart);

  const totalAmount = spendData.reduce((acc, item) => acc + item.amount, 0).toFixed(2);
  const Amount = totalAmount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSpend((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSpend = () => {
    if (newSpend.name && newSpend.time && newSpend.amount) {
      setSpendData((prev) => [
        ...prev,
        { ...newSpend, amount: parseFloat(newSpend.amount), icon: selectedIcon } // Use selected icon
      ]);
      setNewSpend({ name: "", time: "", amount: "", icon: ShoppingCart }); // Reset input fields
      setSelectedIcon(ShoppingCart); // Reset selected icon
    }
  };

  const toPascalCase = (str:string) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' '); 
  };
  
  return (
    <>
      <main className="relative flex flex-col items-center gap-2 h-[82dvh]">
        <p className="pt-5 text-muted-foreground">Spends This Month</p>
        <h2 className="flex items-center justify-center text-xl text-red-500 font-[500]">
          <IndianRupee />-
          <span className="text-6xl">{Amount.split(".")[0]}</span>.
          {Amount.split(".")[1]}
        </h2>

        <div className="w-full overflow-y-auto card-container max-h-[64dvh]">
          <div className="sticky top-0 flex justify-between p-2 font-semibold bg-background">
            <p>Today</p>
            <p>{totalAmount}</p>
          </div>
          {spendData.map((data, index) => (
            <SpendCard key={index} Icon={data.icon} name={toPascalCase(data.name)} time={data.time} amount={data.amount.toFixed(2)} />
          ))}
        </div>

        <Dialog>
          <DialogTrigger>
            <div className="absolute translate-x-[-3.1rem] bg-background w-dvh translate-y-[3.3rem] scale-125 p-4 bottom-0">
              <PlusCircleIcon className="text-green-500 hover:scale-110" />
            </div>
          </DialogTrigger>
          <DialogContent className="rounded-xl">
            <DialogTitle>
              <div className="flex flex-col items-center">
                <h3 className="pb-2 text-lg font-semibold">Add New Spend</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="Spend Name"
                  value={newSpend.name}
                  onChange={handleChange}
                  className="p-2 m-1 border rounded-xl"
                />
                <input
                  type="time"
                  name="time"
                  value={newSpend.time}
                  onChange={handleChange}
                  className="p-2 m-1 border rounded-xl"
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={newSpend.amount}
                  onChange={handleChange}
                  className="p-2 m-1 border rounded-xl"
                />

                {/* Icon Selection */}
                <div className="flex flex-wrap justify-center m-2">
                  {availableIcons.map(({ name, icon: Icon }, index) => (
                    <div key={index} className="p-2 m-1 rounded cursor-pointer hover:bg-slate-500/10" onClick={() => setSelectedIcon(Icon)}>
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
            </DialogTitle>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
};

export default Page;
