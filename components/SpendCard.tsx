import React, { ElementType, useEffect, useState } from 'react';
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from './ui/skeleton';
import CurrencyIcon from './CurrencyIcon';

const SpendCard: React.FC<{
  Icon: ElementType;
  name: string;
  time: string;
  amount: string;
  currency: "DollarSign" | "IndianRupee" | "EuroIcon";
}> = ({ name, time, amount, Icon, currency }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="flex items-center justify-between w-full p-2 my-1 bg-slate-600/5">
        <div className="flex items-center justify-center">
          <span className="m-2">
            <Skeleton className="h-[1.8rem] aspect-square" />
          </span>
          <div>
            <Skeleton className="h-[.8rem] w-[6rem] mb-1" />
            <Skeleton className="h-[.8rem] w-[3rem]" />
          </div>
        </div>
        <div className="text-red-500">
          <Skeleton className="h-[.8rem] w-16" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex items-center justify-between w-full p-2 my-1 bg-slate-600/5">
      <div className="flex items-center justify-center">
        <span className="m-2">
          <Icon />
        </span>
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{time}</CardDescription>
        </div>
      </div>
      <div className="text-red-500">
        <p className="flex items-center justify-center">
          - <CurrencyIcon icon={currency} size={15} /> {amount}
        </p>
      </div>
    </Card>
  );
};

export default SpendCard;
