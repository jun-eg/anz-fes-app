import { getLatestShiftData } from "@/actions/shiftAction";
import { processFestivalShiftsWithLangChain } from "../admin/schedule-llm";

type Props = {
  day: 1 | 2 | 3 | 4;
};

const CreateShift = async ({ day }: Props) => {
  const data = await getLatestShiftData();

  const plan = await processFestivalShiftsWithLangChain({
    day,
    data,
  });

  console.log(plan);

  const planJson = (() => {
    try {
      return JSON.stringify(plan, null, 2);
    } catch (error) {
      console.error("Failed to stringify plan:", error);
      return null;
    }
  })();

  if (!planJson) {
    return (
      <div>
        プランの表示に失敗しました。詳細はサーバーログを確認してください。
      </div>
    );
  }

  return (
    <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {planJson}
    </pre>
  );
};

export default CreateShift;
