"use client";

import { useContext, useEffect } from "react";
import ShiftLogCard from "./ShiftLogCard";
import { ShiftDatasContext, useShiftDatas } from "@/provider/ShiftDateProvider";
import { getShiftData } from "@/actions/shiftAction";
import { get } from "http";

const ShiftLogsLayout = () => {
  const { shiftDatas } = useShiftDatas();

  console.log("contextDatas", shiftDatas);
  return (
    <div className="p-4">
      <ShiftLogCard />
    </div>
  );
};

export default ShiftLogsLayout;
