import React from "react";
import db from "@/lib/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import TaskData from "./components/show-data";
const TaskPage = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const userId = session?.user?.id;

  const tasks: any = await db.task.findMany({
    where: { user_id: userId },
    orderBy: { status: "desc" },
  });

  const formattedTask = tasks.map((task: any, index: number) => ({
    serialNumber: index + 1,
    id: task.id,
    subject: task.subject,
    status: task.status,
    priority: task.priority,
    description: task.description,
    expected_start_date: new Date(
      task.expected_start_date
    ).toLocaleDateString(),
    expected_end_date: new Date(task.expected_end_date).toLocaleDateString(),
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  }));
  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <TaskData data={formattedTask} />
    </div>
  );
};

export default TaskPage;
