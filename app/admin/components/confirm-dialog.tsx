"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmState {
  open: boolean;
  title: string;
  message: string;
  resolve: ((value: boolean) => void) | null;
}

/**
 * Hook that provides a custom confirmation dialog matching the admin design system.
 * Returns [confirm, ConfirmDialog] — call confirm() like the native one (returns a Promise<boolean>).
 *
 * Usage:
 *   const [confirmDelete, ConfirmDialog] = useConfirm();
 *   async function handleDelete(id) {
 *     if (!(await confirmDelete("Delete this post?"))) return;
 *     ...
 *   }
 *   return <><ConfirmDialog />...</>
 */
export function useConfirm() {
  const [state, setState] = useState<ConfirmState>({
    open: false,
    title: "",
    message: "",
    resolve: null,
  });

  const confirm = useCallback(
    (message: string, title: string = "Confirm Delete") => {
      return new Promise<boolean>((resolve) => {
        setState({ open: true, title, message, resolve });
      });
    },
    []
  );

  const handleConfirm = useCallback(() => {
    state.resolve?.(true);
    setState((s) => ({ ...s, open: false, resolve: null }));
  }, [state.resolve]);

  const handleCancel = useCallback(() => {
    state.resolve?.(false);
    setState((s) => ({ ...s, open: false, resolve: null }));
  }, [state.resolve]);

  function ConfirmDialog() {
    const cancelRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (state.open) {
        cancelRef.current?.focus();
        const handler = (e: KeyboardEvent) => {
          if (e.key === "Escape") handleCancel();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
      }
    }, [state.open]);

    if (!state.open) return null;

    return (
      <div className="admin-confirm-overlay" onClick={handleCancel}>
        <div
          className="admin-confirm-dialog"
          onClick={(e) => e.stopPropagation()}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          aria-describedby="confirm-message"
        >
          <div className="admin-confirm-icon">
            <AlertTriangle size={22} />
          </div>
          <div className="admin-confirm-body">
            <h3 id="confirm-title" className="admin-confirm-title">
              {state.title}
            </h3>
            <p id="confirm-message" className="admin-confirm-message">
              {state.message}
            </p>
          </div>
          <div className="admin-confirm-actions">
            <button
              ref={cancelRef}
              onClick={handleCancel}
              className="admin-btn-subtle"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="admin-btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return [confirm, ConfirmDialog] as const;
}
