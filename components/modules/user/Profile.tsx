"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { uploadImage } from "@/Actions/provider.action";
import { updateUserProfile } from "@/Actions/user.actions";

type ProviderProfile = {
  restaurantName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  website: string;
  description: string;
};

type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "PROVIDER" | "CUSTOMER" | "ADMIN";
  status: string;
  image: string | null;
  providerProfiles: ProviderProfile | null;
};

const profileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  providerProfiles: z
    .object({
      restaurantName: z.string().min(2),
      address: z.string().min(3),
      city: z.string().min(2),
      country: z.string().min(2),
      postalCode: z.string().min(2),
      phoneNumber: z.string().min(5),
      website: z.string().optional(),
      description: z.string().optional(),
    })
    .nullable(),
});

type ProfileSchemaType = z.infer<typeof profileSchema>;

interface ProfileProps {
  user: UserProfile;
}

export default function Profile({ user }: ProfileProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user.image);

  const form = useForm({
    defaultValues: {
      name: user.name,
      phone: user.phone ?? "",
      providerProfiles: user.providerProfiles,
    } as ProfileSchemaType,
    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating profile...");

      try {
        let imageUrl = user.image || "";

        if (selectedImage) {
          const uploadRes = await uploadImage(selectedImage);

          imageUrl = uploadRes?.data?.url;
        }

        const payload: any = {
          name: value.name,
          phone: value.phone,
        };

        payload.image = imageUrl;

        if (user.role === "PROVIDER" && value.providerProfiles) {
          payload.providerProfiles = {
            restaurantName: value.providerProfiles.restaurantName,
            address: value.providerProfiles.address,
            city: value.providerProfiles.city,
            country: value.providerProfiles.country,
            postalCode: value.providerProfiles.postalCode,
            phoneNumber: value.providerProfiles.phoneNumber,
            website: value.providerProfiles.website,
            description: value.providerProfiles.description,
          };
        }

        const { success } = await updateUserProfile(payload);

        if (success) {
          toast.success("Profile updated successfully", { id: toastId });
        } else {
          toast.error("Failed to update profile", { id: toastId });
        }
      } catch (error) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  const handleImageChange = (file: File) => {
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-8"
      >
        <FieldGroup>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Profile Settings</h1>
              <p className="text-sm text-muted-foreground">
                Manage your account information
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline">{user.role}</Badge>
              <Badge>{user.status}</Badge>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border">
              <Image
                src={
                  preview ||
                  "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                }
                alt="profile"
                fill
                className="object-cover"
              />
            </div>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleImageChange(e.target.files[0])
              }
            />
          </div>

          <form.Field
            name="name"
            children={(field) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input value={user.email} disabled />
            <FieldDescription>Email cannot be changed</FieldDescription>
          </Field>

          <form.Field
            name="phone"
            children={(field) => (
              <Field>
                <FieldLabel>Phone</FieldLabel>
                <Input
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          {user.providerProfiles && (
            <>
              <FieldSeparator>Restaurant Information</FieldSeparator>

              {[
                "restaurantName",
                "address",
                "city",
                "country",
                "postalCode",
                "phoneNumber",
                "website",
                "description",
              ].map((fieldName) => (
                <form.Field
                  key={fieldName}
                  name={`providerProfiles.${fieldName}` as any}
                  children={(field) => (
                    <Field>
                      <FieldLabel>
                        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                      </FieldLabel>
                      {fieldName === "description" ? (
                        <Textarea
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      ) : (
                        <Input
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />
              ))}
            </>
          )}

          <Field>
            <Button type="submit" className="w-full md:w-auto">
              Save Changes
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
