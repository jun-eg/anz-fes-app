export type SheetRes = {
  range: string;
  majorDimension: string;
  values: string[][];
};

export type resShiftData = {
  timestamp: { headerName: string; value: string };
  studentId: { headerName: string; value: string };
  name: { headerName: string; value: string };
  mail: { headerName: string; value: string };
  grade: { headerName: string; value: string };
  cook: { headerName: string; value: string };
  frends: { headerName: string; value: string };
  oneDay: { headerName: string; value: string };
  twoDay: { headerName: string; value: string };
  threeDay: { headerName: string; value: string };
  fourDay: { headerName: string; value: string };
};

export type resData = {
  data: SheetRes;
};
