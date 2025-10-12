import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.sheetId}/values/フォームの回答%201?key=${process.env.shiftDataApiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Google Sheets API error:", errorData);
    }
    const data = await res.json();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("get shiftData failed:", (error as Error).message);
    return NextResponse.json(
      {
        message:
          "シフトデータの取得に失敗しました。時間をおいて再度お試しください。",
      },
      { status: 500 }
    );
  }
}
