import { NextResponse } from "next/server";
import {
  fetchSheetValues,
  ShiftApiError,
  ShiftConfigError,
} from "@/lib/shiftData";

export async function GET() {
  try {
    const data = await fetchSheetValues();
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof ShiftConfigError) {
      console.error("Shift API configuration error:", error.message);
      return NextResponse.json(
        { message: "Server misconfigured: missing environment variables." },
        { status: 500 }
      );
    }

    if (error instanceof ShiftApiError) {
      console.error("Google Sheets API error:", {
        status: error.status,
        body: error.body,
      });
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }

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
