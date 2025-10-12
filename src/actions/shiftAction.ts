import { resData, resShiftData, SheetRes } from "@/types";

export const getShiftData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/shift`, { cache: "no-store" });

  if (!res.ok) {
    console.error("Failed to fetch shift data:", res.statusText);
    throw new Error(
      "シフトデータの取得に失敗しました。時間をおいて再度お試しください。"
    );
  }

  const data: resData = await res.json();

  const headers = data.data.values[0];
  const rows = data.data.values.slice(1);

  const mappedData: resShiftData[] = rows.map((row) => ({
    timestamp: { headerName: headers[0], value: row[0] || "" },
    studentId: { headerName: headers[1], value: row[1] || "" },
    name: { headerName: headers[2], value: row[2] || "" },
    mail: { headerName: headers[10], value: row[10] || "" },
    grade: { headerName: headers[3], value: row[3] || "" },
    cook: { headerName: headers[4], value: row[4] || "" },
    frends: { headerName: headers[5], value: row[5] || "" },
    oneDay: { headerName: headers[6], value: row[6] || "" },
    twoDay: { headerName: headers[7], value: row[7] || "" },
    threeDay: { headerName: headers[8], value: row[8] || "" },
    fourDay: { headerName: headers[9], value: row[9] || "" },
  }));

  return mappedData;
};
