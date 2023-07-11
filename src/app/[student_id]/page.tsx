import Register from "@/components/Register";

export default async function StudentIDPage({
  params,
}: {
  params: { student_id: string };
}) {
  return (
    <div>
      <Register params={params} />
    </div>
  );
}
