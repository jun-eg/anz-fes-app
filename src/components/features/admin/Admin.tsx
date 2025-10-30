import { Button } from "@/components/ui/button";
import Link from "next/link";

const Admin = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Button variant="outline">
        <Link href="/admin/shift/1">11月1日シフト作成</Link>
      </Button>
      <Button variant="outline">
        <Link href="/admin/shift/2">11月2日シフト作成</Link>
      </Button>
      <Button variant="outline">
        <Link href="/admin/shift/3">11月3日シフト作成</Link>
      </Button>
      <Button variant="outline">
        <Link href="/admin/shift/4">11月4日シフト作成</Link>
      </Button>
    </div>
  );
};

export default Admin;
