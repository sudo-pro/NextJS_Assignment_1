import { redirect } from "next/navigation";
import { getUser } from "~/app/actions/auth/getUser";

export default async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/signup");
  }

  const task = await get

  return (
    <div>
      <h1>Task</h1>
      <p>Task ID: {id}</p>
    </div>
  );
};
