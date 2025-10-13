"use client";

import { resShiftData } from "@/types";
import { createContext, useContext, useState } from "react";

type ShiftDateContextType = {
  shiftDatas: resShiftData[];
  setShiftDatas: React.Dispatch<React.SetStateAction<resShiftData[]>>;
};

type Props = {
  children: React.ReactNode;
  initialShiftDatas: resShiftData[] | [];
};

export const ShiftDatasContext = createContext<ShiftDateContextType>({
  shiftDatas: [],
  setShiftDatas: () => {},
});

export const ShiftProvider = ({ children, initialShiftDatas }: Props) => {
  const [shiftDatas, setShiftDatas] =
    useState<resShiftData[]>(initialShiftDatas);

  return (
    <ShiftDatasContext.Provider value={{ shiftDatas, setShiftDatas }}>
      {children}
    </ShiftDatasContext.Provider>
  );
};

export const useShiftDatas = () => {
  const ctx = useContext(ShiftDatasContext);

  if (!ctx) {
    throw new Error("useShiftDatas must be used within a ShiftProvider");
  }

  return ctx;
};
