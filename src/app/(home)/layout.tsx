import { getShiftData } from "@/actions/shiftAction";
import { ShiftProvider } from "@/provider/ShiftDateProvider";
import { ReactNode } from "react";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const initialDataa = await getShiftData();

  return (
    <ShiftProvider initialShiftDatas={initialDataa}>{children}</ShiftProvider>
  );
};

export default HomeLayout;
