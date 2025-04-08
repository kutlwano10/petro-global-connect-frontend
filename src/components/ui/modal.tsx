"use client";
import { useEffect, useRef, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed  text-text-secondary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 z-50 rounded-lg p-6 w-full max-w-md bg-surface shadow-xl backdrop:bg-black/50"
    >
      <div className="space-y-4">
        {title && (
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-primary hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
        )}
        {children}
      </div>
    </dialog>
  );
}