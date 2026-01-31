"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import { authClient } from "@/lib/auth-client";
import { env } from "@/env";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MailCheck } from "lucide-react";
const formSchema = z.object({
  name: z.string("Enter your name"),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string("Enter your password")
    .min(8, "Password must be at least 8 characters long"),
});
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [sentEmail, setSentEmail] = useState(false)
  const googleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: env.NEXT_PUBLIC_FRONTEND_URL,
    });
  };
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }: any) => {
      const toastId = toast.loading("Signing up...");

      try {
        const { error } = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
        });
        if (error?.status === 401) {
          toast.error("Invalid email or password", { id: toastId });
        } else {
          toast.success("Sign up successfully", { id: toastId });
          setSentEmail(true)
        }
      } catch (error) {
        toast.error("Failed to sign up", { id: toastId });
      }
    },
  });
  if (sentEmail) {
    return (
    //  import { MailCheck } from "lucide-react";

<div className="flex min-h-[60vh] items-center justify-center px-4">
  <div className="w-full max-w-md rounded-2xl border bg-background/80 backdrop-blur-xl p-8 shadow-xl">
    
    {/* Icon */}
    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg">
      <MailCheck className="h-7 w-7" />
    </div>

    {/* Text */}
    <div className="text-center space-y-3">
      <h2 className="text-3xl font-bold tracking-tight">
        Verify your email
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        We’ve sent a verification link to your email address.
        Please check your inbox and follow the instructions to
        activate your account.
      </p>
    </div>

    {/* Action */}
    <div className="mt-8">
      <Button
        className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
        onClick={() => router.push("/login")}
      >
        Go to Login
      </Button>
    </div>

    {/* Sub text */}
    <p className="mt-4 text-center text-xs text-muted-foreground">
      Didn’t receive the email? Check your spam folder.
    </p>
  </div>
</div>

    );
  }else{
    return(
      <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(e.target);
      }}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  placeholder="Enter your name"
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <Field>
          <Button type="submit">Sign up</Button>
        </Field>
        <Button variant="outline" type="button" onClick={() => googleSignIn()}>
          <FcGoogle />
          Sign up with Google
        </Button>
        <FieldDescription className="px-6 text-center">
          Already have an account? <Link href="/login">Sign in</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
    )
  }
}