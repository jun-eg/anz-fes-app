import ShiftLogCard from "./ShiftLogCard";
import { getLatestShiftData } from "@/actions/shiftAction";

const ShiftRequests = async () => {
  const latestDatas = await getLatestShiftData();
  // console.log("Latest Shift Data:", latestDatas);

  const cleanedData = latestDatas.map(
    ({ oneDay, twoDay, threeDay, ...rest }) => rest
  );

  console.log("Cleaned Shift Data:", cleanedData);

  return (
    <div className="flex flex-wrap gap-4 p-4 justify-center">
      {latestDatas.map((data, key) => (
        <ShiftLogCard key={key} shiftData={data} />
      ))}
    </div>
  );
};

export default ShiftRequests;
