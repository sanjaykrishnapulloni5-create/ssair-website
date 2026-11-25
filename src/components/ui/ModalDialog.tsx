"use client";

import React, { useEffect, useRef, type ReactNode } from "react";

interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  maxWidthClass?: string;
}

/**
 * Accessible native <dialog> top-layer modal implementing Modern Web Guidance:
 * - Uses showModal() for native inert backdrop, focus containment & Esc dismissal
 * - Supports closedby="any" with Safari pointerdown/pointerup outside-click fallback
 * - Uses CSS overscroll-behavior: contain on dialog:modal and ::backdrop
 */
export function ModalDialog({
  open,
  onClose,
  labelledBy,
  children,
  maxWidthClass = "max-w-3xl",
}: ModalDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      onClose();
    };

    dialog.addEventListener("close", handleClose);

    // Fallback light-dismiss for browsers without native dialog closedby="any"
    let cleanupOutside: (() => void) | undefined;
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      const isOutside = (e: PointerEvent) => {
        const r = dialog.getBoundingClientRect();
        return (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        );
      };
      let pressedOutside = false;
      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = isOutside(e);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && isOutside(e) && dialog.open) {
          dialog.close();
        }
        pressedOutside = false;
      };
      dialog.addEventListener("pointerdown", onPointerDown);
      dialog.addEventListener("pointerup", onPointerUp);
      cleanupOutside = () => {
        dialog.removeEventListener("pointerdown", onPointerDown);
        dialog.removeEventListener("pointerup", onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
      cleanupOutside?.();
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      {...({ closedby: "any" } as Record<string, string>)}
      className={`ssair-dialog w-full ${maxWidthClass} rounded-3xl shadow-2xl`}
    >
      {open ? children : null}
    </dialog>
  );
}

export default ModalDialog;
