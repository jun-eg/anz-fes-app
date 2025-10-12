import { getShiftData } from "@/actions/shiftAction";

const shiftLogsPage = async () => {
  const shiftData = await getShiftData();
  console.log(shiftData);

  return (
    <>
      <div>シフトlog</div>
      <pre className="text-sm">{JSON.stringify(shiftData, null, 2)}</pre>
    </>
  );
};

export default shiftLogsPage;
