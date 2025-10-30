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

const roleColors: Record<string, string> = {
  準備: "bg-green-300",
  会計: "bg-blue-300",
  責任者: "bg-pink-300",
  売込: "bg-yellow-300",
  片付け: "bg-purple-300",
};

export const ShiftTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="border border-gray-400 text-sm">
        <thead>
          <tr>
            <th className="border px-2">名前</th>
            {times.map((t) => (
              <th key={t} className="border px-1">
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((member) => (
            <tr key={member.memberId}>
              <td className="border px-2">{member.name}</td>
              {times.map((t, idx) => {
                const active = member.assigned.find(
                  (a) => t >= a.start && t < a.end
                );
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
