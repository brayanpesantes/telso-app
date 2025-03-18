interface Props {
  params: Promise<{
    id: string;
  }>;
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}
