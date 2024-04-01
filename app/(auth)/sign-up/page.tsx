"use client";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useAuth } from "@/hooks/auth/auth";
import Link from "next/link";
import { selectGoogleButton } from "@/lib/redux/features/auth/authSlice";
import Skeleton from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpFormRegEx } from "@/utils/regex";
import { zodResolver } from "@hookform/resolvers/zod";
import { graphqlClient } from "@/lib/graphql";
import toast from "react-hot-toast";
import { createUserWithEmailAndPasswordMutation } from "@/graphql/mutations/user";
import { useRouter } from "@/hooks/router/router";
import {
  isEmailExistQuery,
  isUsernameExistQuery,
} from "@/graphql/queries/user";
import InputField from "@/components/input-field";

const signUpFormSchema = z.object({
  name: z
    .string()
    .regex(
      signUpFormRegEx.fullNameRegEx,
      "Must follow this format -> 'John Doe'"
    )
    .min(3, "Name must be at least 3 characters long"),
  username: z
    .string()
    .regex(
      signUpFormRegEx.usernameRegEx,
      "Only alphanumeric characters allowed (a-z, 0-9)"
    )
    .min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Must follow this format -> johndoe@example.com"),
  password: z
    .string()
    .regex(
      signUpFormRegEx.passwordRegEx,
      "Password should contain at least 1 uppercase, 1 lowercase, 1 numeric and 1 special character"
    )
    .min(8, "Password must be at least 8 characters long"),
});

type signUpFormType = z.infer<typeof signUpFormSchema>;

const SignUpPage: React.FC = () => {
  const { data: isGoogleButtonLoaded, signInAction } =
    useAuth(selectGoogleButton);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<signUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });

  // onClick Google (Sign in and Sign up with Google)
  const handleSignInWithGoogle = async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    signInAction({ googleToken });
  };

  // Sign Up with the User Data
  const onSubmit = async (data: signUpFormType) => {
    const { name, username, email, password } = data;

    const usernamePromise = graphqlClient.request(isUsernameExistQuery, {
      username,
    });
    const emailPromise = graphqlClient.request(isEmailExistQuery, {
      email,
    });
    const [usernameResponse, emailResponse] = await Promise.all([
      usernamePromise,
      emailPromise,
    ]);
    const { isUsernameExist } = usernameResponse;
    const { isEmailExist } = emailResponse;
    if (isUsernameExist) return toast.error("Username already exist");
    if (isEmailExist) return toast.error("Email Address already exist");

    const firstName = name.slice(0, name.indexOf(" "));
    const lastName = name.slice(name.indexOf(" ") + 1);
    const user = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    const { createUserWithEmailAndPassword } = await graphqlClient.request(
      createUserWithEmailAndPasswordMutation,
      { user }
    );
    if (!createUserWithEmailAndPassword)
      return toast.error("User could not register. Try again later..");

    toast.success("Sign Up successful");
    router.push("/sign-in");
  };

  return (
    <>
      <h1 className="text-3xl font-semibold">Sign Up to Twitter</h1>
      <div className="flex flex-col gap-6 p-10 w-1/4 rounded-md bg-zinc-950 border border-zinc-800">
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

        <div className="flex gap-2 items-center w-full">
          <span className="flex-1 bg-zinc-800 h-[0.01rem]"></span>
          <h1 className="text-zinc-600 text-md">or</h1>
          <span className="flex-1 bg-zinc-800 h-[0.01rem]"></span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputField
            error={errors.name?.message}
            label="Name"
            type="text"
            {...register("name")}
          />
          <InputField
            error={errors.username?.message}
            label="Username"
            type="text"
            {...register("username")}
          />
          <InputField
            error={errors.email?.message}
            label="Email Address"
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
            className="bg-[#1D9BF0] text-sm text-white rounded-md py-2 border border-zinc-700 disabled:cursor-wait active:scale-[0.95] transition-all"
          >
            Create my Account
          </button>
        </form>
      </div>
      <div className="flex justify-center gap-2">
        <span>Already have an account?</span>
        <span className="text-[#1D9BF0] hover:underline">
          <Link href="/sign-in">Sign In</Link>
        </span>
      </div>
    </>
  );
};

export default SignUpPage;
