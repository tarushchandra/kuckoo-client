import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full rounded-2xl bg-white dark:bg-zinc-950 shadow-xl p-8 text-center space-y-6 border border-zinc-800">
        <div className="flex justify-center">
          <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full">
            <SearchX className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Page not found
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-white font-medium shadow hover:bg-primary-700 dark:hover:bg-primary-500 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
