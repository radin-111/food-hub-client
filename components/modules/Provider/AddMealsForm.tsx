"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";

import { X } from "lucide-react";

import { useState } from "react";
import { addMeal, uploadProviderImage } from "@/Actions/provider.action";
import { env } from "@/env";

const formSchema = z.object({
  name: z.string().min(2, "Meal name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.instanceof(File),
});

type Category = {
  id: string;
  cuisineType: string;
};



export function AddMealsForm({
  categories,
  className,
}: {
  categories: Category[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      image: undefined as unknown as File,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      
 const toastId = toast.loading("Adding meal...");
      try {
       
        const imageRes = await uploadProviderImage(value.image);

        if (!imageRes?.data?.url) {
          toast.error("Image upload failed", { id: toastId });
          return;
        }

        const { success, error } = await addMeal(value, imageRes);
        if (error) {
          toast.error("Something went wrong", { id: toastId });
          return;
        }

        if (success) {
          toast.success("Meal added successfully", { id: toastId });
          form.reset();
          setOpen(false);
          setPreview(null);
        }
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Meal</Button>
      </DialogTrigger>

      <DialogContent className={cn("sm:max-w-lg", className)}>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
          <X className="h-4 w-4" />
        </DialogClose>

        <DialogHeader>
          <DialogTitle>Add New Meal</DialogTitle>
          <DialogDescription>
            Create a new meal for your restaurant
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            form.handleSubmit(e.target);
          }}
          className="space-y-4"
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => (
                <Field>
                  <FieldLabel>Meal Name</FieldLabel>
                  <Input
                    placeholder="Chicken Burger"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <form.Field
              name="description"
              children={(field) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    placeholder="Delicious grilled chicken burger..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <form.Field
              name="price"
              children={(field) => (
                <Field>
                  <FieldLabel>Price</FieldLabel>
                  <Input
                    type="number"
                    placeholder="250"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <form.Field
              name="categoryId"
              children={(field) => (
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <select
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.cuisineType}
                      </option>
                    ))}
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <form.Field
              name="image"
              children={(field) => (
                <Field>
                  <FieldLabel>Meal Image</FieldLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      field.handleChange(file);
                      setPreview(URL.createObjectURL(file));
                    }}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-2 h-40 w-full rounded-md object-cover"
                    />
                  )}
                  <FieldDescription>
                    Upload a clear image of the meal
                  </FieldDescription>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <FieldSeparator />
          </FieldGroup>

          <DialogFooter>
            <Button type="submit">Add Meal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
