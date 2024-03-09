"use client";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useAuth } from "@/hooks/auth/auth";
import Link from "next/link";
import Skeleton from "@/components/ui/skeleton";
import { selectGoogleButton } from "@/redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type signInFormType = z.infer<typeof signInFormSchema>;

const SignInPage: React.FC = () => {
  const { useAuthDispatcher, useAuthStore } = useAuth();
  const { signInAction } = useAuthDispatcher();
  const isGoogleButtonLoaded = useAuthStore(selectGoogleButton);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<signInFormType>({
    resolver: zodResolver(signInFormSchema),
  });

  // onClick Google
  const handleSignInWithGoogle = async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    signInAction({ googleToken });
  };

  // Sign In with Email and Password
  const onSubmit = async (data: signInFormType) => {
    signInAction({ user: data });
    // await new Promise((res) => setTimeout(() => res("ok"), 1000));
  };

  return (
    <>
      <h1 className="text-3xl font-semibold">Sign In to Twitter</h1>
      <div className="flex flex-col gap-6 p-10 w-1/4 rounded-md bg-zinc-950 border border-zinc-800">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              className="rounded-md bg-zinc-950 border-[0.01rem] border-zinc-800 px-4 py-2 focus:outline-none focus:border-[#1D9BF0] focus:ring-1"
            />
            {errors.email && (
              <h3 className="text-xs text-red-500 italic">
                * {errors.email.message as string}
              </h3>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              name="password"
              id="password"
              className="rounded-md bg-zinc-950 border-[0.01rem] border-zinc-800 px-4 py-2 focus:outline-none focus:border-[#1D9BF0] focus:ring-1"
            />
            {errors.password && (
              <h3 className="text-xs text-red-500 italic">
                * {errors.password.message as string}
              </h3>
            )}
          </div>
          <button
            disabled={isSubmitting}
            className="bg-[#1D9BF0] text-sm text-white rounded-md py-2 border border-zinc-700 disabled:cursor-wait transition-all active:scale-[0.95]"
          >
            Sign In
          </button>
        </form>
        <div className="flex gap-2 items-center w-full">
          <span className="flex-1 bg-zinc-800 h-[0.01rem]"></span>
          <h1 className="text-zinc-600 text-md">or</h1>
          <span className="flex-1 bg-zinc-800 h-[0.01rem]"></span>
        </div>
        <div className="flex justify-center">
          {isGoogleButtonLoaded ? (
            <GoogleLogin
              onSuccess={handleSignInWithGoogle}
              theme="filled_black"
              useOneTap
            />
          ) : (
            <Skeleton className="w-60 h-10" />
          )}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <span>Don't have an account?</span>
        <span className="text-[#1D9BF0] hover:underline">
          <Link href="/sign-up">Sign Up</Link>
        </span>
      </div>
    </>
  );
};

export default SignInPage;
