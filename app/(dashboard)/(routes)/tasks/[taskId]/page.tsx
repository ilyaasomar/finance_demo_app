import React from "react";
import db from "@/lib/db";
import TaskForm from "./form";

const TaskPage = async ({ params }: { params: { taskId: string } }) => {
  let task: any = null;
  if (params.taskId !== "create") {
    task = await db.task.findUnique({
      where: { id: params.taskId },
    });
  }

  return (
    <div className="gap-4 p-4 md:gap-8 md:p-6">
      <TaskForm initialData={task} />
    </div>
  );
};

export default TaskPage;
