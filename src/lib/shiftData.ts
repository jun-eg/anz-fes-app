import { SheetRes } from "@/types";

const SHEET_RANGE = encodeURIComponent("フォームの回答 1");

const resolveEnvValue = (value?: string) =>
  value && value.trim().length > 0 ? value.trim() : "";

export class ShiftConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShiftConfigError";
  }
}

export class ShiftApiError extends Error {
  status: number;
  body: string;

  constructor(message: string, status: number, body: string) {
    super(message);
    this.name = "ShiftApiError";
    this.status = status;
    this.body = body;
  }
}

export const resolveSheetCredentials = () => {
  const sheetId = resolveEnvValue(process.env.sheetId) || "";
  const apiKey = resolveEnvValue(process.env.shiftDataApiKey) || "";

  if (!sheetId || !apiKey) {
    throw new ShiftConfigError("googleSheetIdまたは、apiKeyがundefindです。");
  }

  return { sheetId, apiKey };
};

export const fetchSheetValues = async (): Promise<SheetRes> => {
  const { sheetId, apiKey } = resolveSheetCredentials();

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${SHEET_RANGE}?key=${apiKey}`;
  const res = await fetch(url, { cache: "no-store" });

  const body = await res.text();

  if (!res.ok) {
    let parsed: string = body;
    try {
      parsed = JSON.parse(body);
    } catch {}

    throw new ShiftApiError(
      "Failed to fetch sheet data from Google Sheets API.",
      res.status,
      parsed
    );
  }

  return JSON.parse(body) as SheetRes;
};
