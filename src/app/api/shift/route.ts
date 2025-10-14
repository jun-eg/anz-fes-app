import { NextResponse } from "next/server";

const resolveEnvValue = (value?: string) =>
  value && value.trim().length > 0 ? value.trim() : "";

export async function GET() {
  try {
    const sheetId =
      resolveEnvValue(process.env.sheetId) ||
      resolveEnvValue(process.env.SHEET_ID) ||
      "";
    const apiKey =
      resolveEnvValue(process.env.shiftDataApiKey) ||
      resolveEnvValue(process.env.SHIFT_DATA_API_KEY) ||
      "";

    if (!sheetId || !apiKey) {
      console.error("Missing required env vars for Google Sheets.", {
        sheetIdPresent: Boolean(sheetId),
        apiKeyPresent: Boolean(apiKey),
      });
      return NextResponse.json(
        { message: "Server misconfigured: missing environment variables." },
        { status: 500 }
      );
    }

    // URL-encode sheet name / range component to avoid invalid characters
    const sheetRange = encodeURIComponent("フォームの回答 1");
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;
    const res = await fetch(url);

    // Read body only once
    const body = await res.text();

    if (!res.ok) {
      let parsed: unknown = body;
      try {
        parsed = JSON.parse(body);
      } catch {
        // keep text body
      }
      console.error("Google Sheets API error:", {
        status: res.status,
        body: parsed,
      });
      return NextResponse.json(
        { message: "Failed to fetch sheet data from Google Sheets API." },
        { status: res.status }
      );
    }

    // body should contain valid JSON when ok
    const data = JSON.parse(body) as unknown;

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
