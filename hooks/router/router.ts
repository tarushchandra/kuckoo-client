"use client";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter as useBaseRouter } from "next/navigation";
import * as Nprogress from "nprogress";

export const useRouter = () => {
  const router = useBaseRouter();
  const { push, replace } = router;

  router.replace = (href: string, options?: NavigateOptions | undefined) => {
    Nprogress.start();
    replace(href, options);
  };

  router.push = (href: string, options?: NavigateOptions | undefined) => {
    Nprogress.start();
    push(href, options);
  };

  return router;
};
