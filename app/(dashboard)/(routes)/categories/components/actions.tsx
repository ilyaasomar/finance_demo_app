"use client";
import React, { useState } from "react";
import { FileEdit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { CategoryColumn } from "./columns";
import DialogModal from "@/components/ui/modal";
import { styles } from "@/app/styles";
interface ActionsProps {
  categoryData: CategoryColumn;
}
const Actions = ({ categoryData }: ActionsProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/categories/${categoryData.id}`);
      toast.success("Product deleted successfully!");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data);
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
      {categoryData.login_user_id && (
        <div className="flex items-center gap-x-2">
          <div
            className={`w-7 h-7 flex items-center rounded-md ${styles.secondaryBgColor}`}
            onClick={() => {
              router.push(`/categories/${categoryData.id}`);
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
      )}
    </>
  );
};

export default Actions;
