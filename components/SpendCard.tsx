import React, { ElementType } from 'react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IndianRupee } from 'lucide-react';

const SpendCard: React.FC<{ Icon: ElementType ,name: string; time: string; amount: string }> = ({ name, time, amount, Icon }) => {
  return (
    <>
      <Card className='flex items-center justify-between w-full p-2 my-1 bg-slate-600/5'>
        <div className='flex items-center justify-center'>
          <span className='m-2'>
            <Icon className="" />
          </span>
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{time}</CardDescription>
          </div>
        </div>
        <div className='text-red-500'>
          <p className='flex items-center justify-center'>- <IndianRupee size={15} /> {amount}</p>
        </div>
      </Card>
    </>
  );
};

export default SpendCard;
