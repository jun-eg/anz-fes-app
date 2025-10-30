import { Suspense } from "react";
import CreateShift from "./CreateShift";

type Props = {
  day: 1 | 2 | 3 | 4;
};

const ShiftPage = ({ day }: Props) => {
  if (!day) return <div>不正な day 値です</div>;
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          シフトプランを生成しています…
        </div>
      }
    >
      <CreateShift day={day} />
    </Suspense>
  );
};

export default ShiftPage;
