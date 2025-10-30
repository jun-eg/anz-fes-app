import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const menues = [
    {
      name: "シフト提出",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSf2wO3Kt0e20jxupo97TP7r2Thm-qy-OhXI3MOQhyncdXeJkw/viewform?usp=header",
      status: "closed",
    },
    { name: "シフト希望確認", href: "/shiftLogs", status: "closed" },
    { name: "管理者ページ", href: "/admin", status: "closed" },
    { name: "11月1日シフト表", href: "/shift/0", status: "open" },
    { name: "11月2日シフト表", href: "/shift/1", status: "open" },
    { name: "11月3日シフト表", href: "/shift/2", status: "open" },
    { name: "11月4日シフト表", href: "/shift/3", status: "open" },
  ];

  return (
    <div className="p-8 flex flex-col items-center gap-4 font-mono h-full">
      <div className="text-xl pb-10">あんず。シフト提出サイト</div>
      <div className="flex flex-col gap-4  h-full ">
        {menues.map((item) => (
          <Button
            key={item.name}
            variant="outline"
            disabled={item.status === "closed"}
          >
            <Link href={item.href}>{item.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
