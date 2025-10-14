import { getShiftData } from "@/actions/shiftAction";
import { ShiftProvider } from "@/provider/ShiftDateProvider";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  let initialShiftDatas: Awaited<ReturnType<typeof getShiftData>> = [];

  try {
    initialShiftDatas = await getShiftData();
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error while fetching shift data.";
    console.error("HomeLayout failed to load shift data:", message);
  }

  return (
    <ShiftProvider initialShiftDatas={initialShiftDatas}>
      {children}
    </ShiftProvider>
  );
};

export default HomeLayout;
