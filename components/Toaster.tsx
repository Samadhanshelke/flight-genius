"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { MdCheckCircle, MdClose, MdError, MdInfo } from "react-icons/md";

type ToastType = "error" | "success" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<ToastType, string> = {
  error: "border-genius-error bg-white text-gray-900",
  success: "border-genius-success bg-white text-gray-900",
  info: "border-genius-500 bg-white text-gray-900",
};

const toastIcons: Record<ToastType, ReactNode> = {
  error: <MdError className="text-genius-error text-xl shrink-0" />,
  success: <MdCheckCircle className="text-genius-success text-xl shrink-0" />,
  info: <MdInfo className="text-genius-500 text-xl shrink-0" />,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = "error") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 6000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-[min(24rem,calc(100vw-3rem))]"
        aria-live="polite"
        aria-relevant="additions"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            role="status"
            className={`animate-toast flex items-start gap-3 rounded-xl border-l-4 px-4 py-3 shadow-lg ${toastStyles[item.type]}`}
          >
            {toastIcons[item.type]}
            <p className="flex-1 text-sm font-medium leading-5 pt-0.5">{item.message}</p>
            <button
              type="button"
              onClick={() => dismiss(item.id)}
              className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <MdClose className="text-lg" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
