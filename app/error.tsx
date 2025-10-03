"use client";
import { AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full rounded-2xl bg-white dark:bg-zinc-950 shadow-xl p-8 text-center space-y-6 border border-zinc-800">
        <div className="flex justify-center">
          <div className="bg-red-100 dark:bg-red-900/40 p-3 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Oops! Something went wrong
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            We’re sorry for the inconvenience. Please try again or come back
            later.
          </p>
          {process.env.NODE_ENV === "development" && (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400 font-mono">
              {error.message}
            </p>
          )}
        </div>

        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-white font-medium shadow hover:bg-primary-700 dark:hover:bg-primary-500 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
