'use client'

import React, { createContext, useContext, useState } from "react";

type DialogContextType = {
  openDialog: () => void;
  closeDialog: () => void;
  isDialogOpen: boolean;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, isDialogOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("useDialogContext must be used within a DialogProvider");
  return context;
};
