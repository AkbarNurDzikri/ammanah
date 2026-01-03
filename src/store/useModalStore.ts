import { create } from "zustand";
import React from "react";

export interface ModalConfig {
  title?: string;
  description?: string;
  content: React.ReactNode;
  className?: string;
}

interface ModalState {
  isOpen: boolean;
  title?: string;
  description?: string;
  content: React.ReactNode | null;
  className?: string;
  onOpen: (config: ModalConfig) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: "",
  description: "",
  content: null,
  className: "",
  onOpen: (config) =>
    set({
      isOpen: true,
      title: config.title,
      description: config.description,
      content: config.content,
      className: config.className,
    }),
  onClose: () =>
    set({
      isOpen: false,
      title: "",
      description: "",
      content: null,
      className: "",
    }),
}));
