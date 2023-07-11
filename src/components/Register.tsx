export default function Register({
  params,
}: {
  params: { student_id: string };
}) {
  async function addItem() {
    "use server";

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
      method: "POST",
      body: JSON.stringify({
        ssid: process.env.NEXT_PUBLIC_SSID!,
        sheet_name: "1001教室",
        student_id: params.student_id,
        activity_type: "enter",
      }),
    });
    const json = await res.json();
    console.log(json);
  }
  return (
    <div>
      <form action={addItem}>
        <button type="submit">send</button>
      </form>
    </div>
  );
}
