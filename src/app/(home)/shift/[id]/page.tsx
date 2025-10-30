import { ShiftTable } from "@/components/features/shift/ShiftTable";
import { ShiftData01 } from "@/data/shiftData01";
import { shiftData02 } from "@/data/shiftData02";
import { shiftData03 } from "@/data/shiftData03";
import { shiftData04 } from "@/data/shiftData04";

type PageProps = {
  params: Promise<{ id: string }>;
};

const pageNo = [ShiftData01, shiftData02, shiftData03, shiftData04];
const dayList = ["11月1日", "11月2日", "11月3日", "11月4日"];

const ShiftSubmitPage = async ({ params }: PageProps) => {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-4 pt-4">
      <h1 className="pl-4 text-2xl font-bold">{dayList[Number(id)]}シフト表</h1>
      <ShiftTable data={pageNo[Number(id)].results} />
    </div>
  );
};

export default ShiftSubmitPage;
