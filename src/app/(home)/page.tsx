import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8 flex flex-col items-center gap-4 font-mono h-full">
      <div className="text-xl pb-10">あんず。シフト提出サイト</div>
      <div className="flex flex-col gap-4  h-full ">
        <Button variant="outline">
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSf2wO3Kt0e20jxupo97TP7r2Thm-qy-OhXI3MOQhyncdXeJkw/viewform?usp=header">
            シフト提出
          </Link>
        </Button>
        <Button variant="outline">
          <Link href="/shiftLogs">シフト希望確認</Link>
        </Button>
      </div>
    </div>
  );
}
