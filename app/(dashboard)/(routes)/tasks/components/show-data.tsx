import { DataTable } from "@/components/ui/data-table";
import { Task } from "@prisma/client";
import { columns } from "./columns";
import Header from "@/components/ui/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { styles } from "@/app/styles";
interface TaskDataProps {
  data: Task[];
}
const TaskData = async ({ data }: TaskDataProps) => {
  return (
    <div className="">
      <div className="flex flex-col space-y-5">
        <div className="flex justify-between">
          <Header title="Tasks" />
          <Link href="/tasks/create">
            <Button
              className={`flex gap-x-1 px-6 ${styles.primaryBgColor} text-white dark:bg-white hover:${styles.primaryColor}  dark:hover:bg-white`}
            >
              <Plus size={20} />
              Create
            </Button>
          </Link>
        </div>
        {/* @ts-ignore */}
        <DataTable columns={columns} data={data} searchKey="status" />
      </div>
    </div>
  );
};

export default TaskData;
