import React from "react";

type Assignment = {
  slotId: string;
  date: string;
  start: string;
  end: string;
  role: string;
};

type MemberShift = {
  memberId: string;
  name: string;
  assigned: Assignment[];
};

type Props = {
  data: MemberShift[];
};

const times = Array.from({ length: (22 - 8) * 2 + 1 }, (_, i) => {
  const hour = 8 + Math.floor(i / 2);
  const min = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${min}`;
});

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const roleColors: Record<string, string> = {
  準備: "bg-gray-300",
  会計: "bg-blue-300",
  呼び込み: "bg-pink-300",
  調理: "bg-yellow-300",
  調理責任者: "bg-orange-300",
  クリーンパトロール: "bg-green-300",
  片付け: "bg-gray-300",
  列整理: "bg-purple-300",
};

export const ShiftTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-auto max-h-[600px] max-w-full">
      <table className="border border-gray-400 text-sm border-collapse">
        <thead className="bg-white">
          <tr>
            <th className="border px-2 sticky left-0 top-0 z-20 bg-white">
              名前
            </th>
            {times.map((t) => (
              <th key={t} className="border px-1 sticky top-0 z-10 bg-white">
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((member) => (
            <tr key={member.memberId}>
              <td className="border px-2 sticky left-0 bg-white z-10 text-nowrap">
                {member.name}
              </td>
              {times.map((t, idx) => {
                const tMin = toMinutes(t);
                const active = member.assigned.find((a) => {
                  const s = toMinutes(a.start);
                  const e = toMinutes(a.end);

                  return tMin >= s && tMin < e;
                });
                return (
                  <td
                    key={idx}
                    className={`border text-center ${
                      active ? roleColors[active.role] || "bg-gray-200" : ""
                    }`}
                  >
                    {active?.role || ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
