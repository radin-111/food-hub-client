"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const providerSchema = z.object({
  restaurantName: z.string().min(2, "Restaurant name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  phoneNumber: z.string().min(6, "Phone number is required"),
  website: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters"),
});
type ProviderFormValues = z.infer<typeof providerSchema>;
export function BeProviderForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const session = authClient.useSession();
  const userId = session.data?.user?.id ?? null;
  const backendUrl = env.NEXT_PUBLIC_BACKEND_URL;

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      restaurantName: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      phoneNumber: "",
      website: "",
      description: "",
    } as ProviderFormValues,

    validators: {
      onChange: providerSchema,
    },
    onSubmit: async ({ value }) => {
      if (!userId) {
        toast.error("You must be logged in");
        return;
      }

      const toastId = toast.loading("Submitting provider request...");

      try {
        const res = await fetch(`${backendUrl}/provider`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ...value }),
        });

        if (!res.ok) {
          const error = await res.json();
          toast.error(error.message || "Failed to submit", { id: toastId });
          return;
        }

        toast.success("Provider request submitted successfully 🎉", {
          id: toastId,
        });
        form.reset();
        router.push("/");
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(e.target);
      }}
      className={cn(
        "w-full max-w-lg sm:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-0",
        className,
      )}
      {...props}
    >
      <FieldGroup className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold">Become a Provider</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Register your restaurant and start selling on FoodHub
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Restaurant Name */}
          <form.Field
            name="restaurantName"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Restaurant Name</FieldLabel>
                  <Input
                    id={field.name}
                    className="h-11 text-base"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* Phone */}
          <form.Field
            name="phoneNumber"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                  <Input
                    id={field.name}
                    className="h-11 text-base"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* City */}
          <form.Field
            name="city"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>City</FieldLabel>
                  <Input
                    id={field.name}
                    className="h-11 text-base"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* Country */}
          <form.Field
            name="country"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                  <Input
                    id={field.name}
                    className="h-11 text-base"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* Postal Code */}
          <form.Field
            name="postalCode"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
                  <Input
                    id={field.name}
                    className="h-11 text-base"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* Website */}
          <form.Field
            name="website"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Website (optional)
                  </FieldLabel>
                  <Input
                    id={field.name}
                    className="h-11 text-base"
                    placeholder="https://example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </div>

        {/* Address */}
        <form.Field
          name="address"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                <Input
                  id={field.name}
                  className="h-11 text-base"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Description */}
        <form.Field
          name="description"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Textarea
                  id={field.name}
                  rows={4}
                  className="min-h-[120px] text-base"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Submit */}
        <Button className="w-full h-11 text-base" type="submit">
          Submit Provider Request
        </Button>
      </FieldGroup>
    </form>
  );
}
