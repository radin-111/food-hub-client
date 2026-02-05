"use client";

import { useState } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { env } from "@/env";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { addCategories } from "@/Actions/category.action";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

const backendUrl = env.NEXT_PUBLIC_BACKEND_URL;

export default function AddCategories() {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
    },

    validators: {
      onSubmit: categorySchema,
    },

    onSubmit: async ({ value }: any) => {
      const toastId = toast.loading("Adding category...");

      try {
        const { success } = await addCategories(value);

        if (success) {
          toast.success("Category added successfully", { id: toastId });

          setOpen(false);
          form.reset();
        }
      } catch (error) {
       ;
        toast.error("Failed to add category", { id: toastId });
      }
    },
  });

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Category</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>Create a new meal category.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(e.target);
            }}
            className="space-y-4"
          >
            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Category Name
                      </FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="Enter category name"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
            <DialogFooter>
              <Button
                type="submit"
                variant="outline"
                className="border-green-300 hover:bg-green-500"
              >
                Add Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
