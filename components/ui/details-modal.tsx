import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DetailModalProps {
  isModalOpen: boolean;
  onModalClose: () => void;
  loading: boolean;
}
const DetailModal = ({
  isModalOpen,
  onModalClose,
  loading,
}: DetailModalProps) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogDescription>{/* <DetailTable /> */}</DialogDescription>
        <DialogFooter>
          <Button
            onClick={onModalClose}
            disabled={loading}
            variant="destructive"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
