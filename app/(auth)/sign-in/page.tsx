"use client";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import Skeleton from "@/components/ui/skeleton";
import { selectGoogleButton } from "@/lib/redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/input-field";

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
export type signInFormType = z.infer<typeof signInFormSchema>;

const SignInPage: React.FC = () => {
  const { data: isGoogleButtonLoaded, signInAction } =
    useAuth(selectGoogleButton);

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
    await signInAction({ user: data });
  };

  return (
    <div className="py-10 h-full flex flex-col justify-center items-center xs:gap-4">
      <h1 className="text-3xl font-semibold">Sign In to Kuckoo!</h1>
      <div className="xs:w-full xs:p-5 xs:gap-3 xs1:w-[30rem] xs1:p-10 xs1:gap-6 flex flex-col rounded-md bg-zinc-950 border border-zinc-800">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputField
            error={errors.email?.message}
            label="Email"
            type="email"
            {...register("email")}
          />
          <InputField
            error={errors.password?.message}
            label="Password"
            type="password"
            {...register("password")}
          />
          <button
            disabled={isSubmitting}
            className="bg-primary-500 text-sm rounded-md py-2  disabled:cursor-wait transition-all active:scale-[0.95]"
          >
            Sign In
          </button>
        </form>
        <div className="flex gap-2 items-center w-full">
          <span className="flex-1 bg-zinc-800 h-[0.01rem]" />
          <h1 className="text-zinc-600 text-md">or</h1>
          <span className="flex-1 bg-zinc-800 h-[0.01rem]" />
        </div>
        <div className="flex justify-center">
          {isGoogleButtonLoaded ? (
            <GoogleLogin
              onSuccess={handleSignInWithGoogle}
              theme="filled_black"
            />
          ) : (
            <Skeleton className="w-60 h-10" />
          )}
        </div>
      </div>
      <div className=" flex justify-center gap-2">
        <span>Don&apos;t have an account?</span>
        <span className="text-primary-500 hover:underline">
          <Link href="/sign-up">Sign Up</Link>
        </span>
      </div>
    </div>
  );
};

export default SignInPage;
