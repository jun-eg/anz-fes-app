import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { resShiftData } from "@/types";
import { Button } from "../ui/button";

type Props = {
  shiftData: resShiftData;
};

const ShiftLogCard = ({ shiftData }: Props) => {
  const cells = Object.values(shiftData || {}) as {
    headerName: string;
    value: string;
  }[];
  return (
    <Card className="w-full max-w-sm">
      <CardHeader></CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {cells.map((cell) => (
            <div key={cell.headerName} className="">
              <div className="font-semibold text-xs">{cell.headerName}</div>
              <div className="text-xs">{cell.value}</div>
            </div>
          ))}
          <Button variant="outline" asChild>
            <a href="https://forms.gle/8X6dFte8fxRPFtgz5">シフト再提出formへ</a>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
};

export default ShiftLogCard;
