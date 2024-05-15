"use client";
import { useRouter as usePagesRouter } from "next/router";
import { useRouter as useAppRouter } from "next-nprogress-bar";
import { useEffect } from "react";
import { useRouter } from "next-nprogress-bar";

// const useRouter = () => {
//   const pagesRouter = usePagesRouter();

//   useEffect(() => {
//     const handleRouteChange = () => {
//       window.scrollTo(0, 0);
//     };

//     pagesRouter.events.on("routeChangeComplete", handleRouteChange);

//     return () => {
//       pagesRouter.events.off("routeChangeComplete", handleRouteChange);
//     };
//   }, [pagesRouter]);

//   const appRouter = useAppRouter();
//   return appRouter;
// };

// const useRouter = () => {
//   const router = useAppRouter();

//   useEffect(() => {
//     window.addEventListener("popstate", () => {
//       window.scrollTo(0, 0);
//     });
//   }, [router]);
// };

export { useRouter };
