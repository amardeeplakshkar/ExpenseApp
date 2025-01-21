'use client'
// src/components/contexts/useSpendContext.ts
import React, { createContext, useState, useContext } from 'react';
import { SpendItem } from '@/types'; // You can adjust the path as per your project structure

interface SpendContextType {
  spendData: SpendItem[];
  setSpendData: React.Dispatch<React.SetStateAction<SpendItem[]>>;
}

const SpendContext = createContext<SpendContextType | undefined>(undefined);

export const useSpendContext = () => {
  const context = useContext(SpendContext);
  if (!context) {
    throw new Error('useSpendContext must be used within a SpendProvider');
  }
  return context;
};

export const SpendProvider: React.FC<{ children: React.ReactNode }>  = ({ children }) => {
  const [spendData, setSpendData] = useState<SpendItem[]>([]);

  return (
    <SpendContext.Provider value={{ spendData, setSpendData }}>
      {children}
    </SpendContext.Provider>
  );
};
