"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/useModalStore";

export const GlobalModal = () => {
  const { isOpen, title, description, content, className, onClose } =
    useModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={className}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto">{content}</div>
      </DialogContent>
    </Dialog>
  );
};
export const useGlobalModal = () => {
  const onOpen = useModalStore((s) => s.onOpen);
  const onClose = useModalStore((s) => s.onClose);

  return {
    openModal: onOpen,
    closeModal: onClose,
  };
};
