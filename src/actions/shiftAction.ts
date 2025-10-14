import { resData, resShiftData, SheetRes } from "@/types";

export const getShiftData = async () => {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

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
    timestamp: { headerName: headers[0], value: row[0] || "なし" },
    studentId: { headerName: headers[1], value: row[1] || "なし" },
    name: { headerName: headers[2], value: row[2] || "なし" },
    mail: { headerName: headers[10], value: row[10] || "なし" },
    grade: { headerName: headers[3], value: row[3] || "なし" },
    cook: { headerName: headers[4], value: row[4] || "なし" },
    frends: { headerName: headers[5], value: row[5] || "なし" },
    oneDay: { headerName: headers[6], value: row[6] || "なし" },
    twoDay: { headerName: headers[7], value: row[7] || "なし" },
    threeDay: { headerName: headers[8], value: row[8] || "なし" },
    fourDay: { headerName: headers[9], value: row[9] || "なし" },
  }));

  return mappedData;
};
