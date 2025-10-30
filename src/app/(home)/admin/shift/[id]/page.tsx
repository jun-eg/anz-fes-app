import ShiftPage from "@/components/features/shift/shift";

type PageProps = {
  params: Promise<{ id: string }>;
};

type Day = 1 | 2 | 3 | 4;

const parseDay = (value: string): Day | undefined => {
  const num = Number(value);
  if (num === 1 || num === 2 || num === 3 || num === 4) {
    return num as Day;
  }
  return undefined;
};

const shift = async ({ params }: PageProps) => {
  const { id } = await params;
  const day = parseDay(id);

  if (!day) {
    return <div>不正な day 値です</div>;
  }
  return <ShiftPage day={day} />;
};

export default shift;
