import ShiftLogCard from "./ShiftLogCard";
import { getLatestShiftData } from "@/actions/shiftAction";

const ShiftLogsLayout = async () => {
  const latestDatas = await getLatestShiftData();

  return (
    <div className="flex flex-wrap gap-4 p-4 justify-center">
      {latestDatas.map((data, key) => (
        <ShiftLogCard key={key} shiftData={data} />
      ))}
    </div>
  );
};

export default ShiftLogsLayout;
