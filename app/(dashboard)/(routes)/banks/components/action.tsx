"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AccountColumn } from "./columns";
import DialogModal from "@/components/ui/modal";

import { FileEdit, Trash } from "lucide-react";
import { styles } from "@/app/styles";
interface ActionsProps {
  data: AccountColumn;
}
const Actions = ({ data }: ActionsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/accounts/${data.id}`);
      toast.success("Account deleted successfully!");
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
      <div className="flex items-center gap-x-2">
        <div
          className={`w-7 h-7 flex items-center rounded-md ${styles.secondaryBgColor}`}
          onClick={() => {
            router.push(`/banks/${data.id}`);
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
