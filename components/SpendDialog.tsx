import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";

const SpendDialog = ({
  newSpend,
  handleChange,
  handleAddSpend,
  availableIcons,
  selectedIcon,
  setSelectedIcon,
}: {
  newSpend: { name: string; date: string; time: string; amount: string; icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>> };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddSpend: () => void;
  availableIcons: { name: string; icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>> }[];
  selectedIcon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  setSelectedIcon: React.Dispatch<React.SetStateAction<React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>>>;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="absolute right-0 bottom-[5dvh] scale-125 p-4">
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
              className="p-2 m-1 border rounded-xl w-[70%]"
            />
            <input
              type="date"
              name="date"
              value={newSpend.date}
              onChange={handleChange}
              className="p-2 m-1 border rounded-xl"
              max={new Date().toISOString().split("T")[0]}
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
              className="p-2 border rounded-xl w-[70%]"
            />

            <div className="flex flex-wrap justify-center m-2">
              {availableIcons.map(({ name, icon: Icon }, index) => (
                <div
                  key={index}
                  className="p-4 rounded cursor-pointer hover:bg-slate-500/10"
                  onClick={() => setSelectedIcon(Icon)}
                >
                  <Icon className={`h-8 w-8 ${selectedIcon === Icon ? "text-blue-500" : "text-gray-600"}`} />
                </div>
              ))}
            </div>

            <DialogClose onClick={handleAddSpend} className="px-4 py-2 mt-2 text-white bg-blue-500 rounded">
              Add Spend
            </DialogClose>
          </div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default SpendDialog;
