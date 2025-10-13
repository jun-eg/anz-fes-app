"use client";

import { useShiftDatas } from "@/provider/ShiftDateProvider";
import ShiftLogCard from "./ShiftLogCard";

const ShiftLogsLayout = () => {
  const { shiftDatas } = useShiftDatas();

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {shiftDatas.map((data, key) => (
        <ShiftLogCard key={key} shiftData={data} />
      ))}
    </div>
  );
};

export default ShiftLogsLayout;
