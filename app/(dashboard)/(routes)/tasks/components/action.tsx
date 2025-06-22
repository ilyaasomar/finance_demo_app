"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TaskColumn } from "./columns";
import DialogModal from "@/components/ui/modal";

import { FileEdit, Trash, Eye } from "lucide-react";
import { styles } from "@/app/styles";
import DetailModal from "@/components/ui/details-modal";
interface ActionsProps {
  data: TaskColumn;
}
const Actions = ({ data }: ActionsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/tasks/${data.id}`);
      toast.success("Task deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <DialogModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <DetailModal
        isModalOpen={detailOpen}
        onModalClose={() => setDetailOpen(false)}
        loading={loading}
      />
      <div className="flex items-center gap-x-2">
        <div
          className={`w-7 h-7 flex items-center rounded-md ${styles.secondaryBgColor}`}
          onClick={() => {
            router.push(`/tasks/${data.id}`);
          }}
        >
          <FileEdit
            size={10}
            className="text-white w-full h-full p-1 cursor-pointer"
          />
        </div>
        <div
          className="w-7 h-7 flex items-center rounded-md bg-red-600"
          onClick={() => setOpen(true)}
        >
          <Trash className="text-white w-full h-full p-1 cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Actions;
