"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
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
import { X, Eye, Trash2, Pencil } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { deleteMeal, updateMeal, uploadImage } from "@/Actions/provider.action";
import { toast } from "sonner";

type Category = {
  id: string;
  cuisineType: string;
};

type Meal = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
};

const formSchema = z.object({
  name: z.string().min(2, "Meal name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.instanceof(File).optional(),
});

type UpdateMealFormValues = z.infer<typeof formSchema>;

type UpdateMealPayload = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
};

export default function MealsTable({
  meals,
  categories,
}: {
  meals: Meal[];
  categories: Category[];
}) {
  const [viewOpen, setViewOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDelete = async (mealId: string) => {
    const toastId = toast.loading("Deleting meal...");
    const res = await deleteMeal(mealId);

    if (res.success) {
      toast.success("Meal deleted successfully", { id: toastId });
    } else {
      toast.error("Failed to delete meal", { id: toastId });
    }
  };

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      image: undefined,
    } as UpdateMealFormValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!selectedMeal) return;
      const toastId = toast.loading("Updating meal...");
      try {
        let imageUrl = selectedMeal.image;

        if (value.image instanceof File) {
          const imageRes = await uploadImage(value.image);

          if (!imageRes?.data?.url) {
            toast.error("Image upload failed", { id: toastId });
            return;
          }

          imageUrl = imageRes.data.url;
        }

        const payload: UpdateMealPayload = {
          name: value.name,
          description: value.description,
          price: value.price,
          categoryId: value.categoryId,
          image: imageUrl,
        };
        
        const { success } = await updateMeal(selectedMeal.id, payload as any);

        if (success) {
          toast.success("Meal updated successfully", { id: toastId });
          setUpdateOpen(false);
          setPreview(null);
          form.reset();
        } else {
          toast.error("Failed to update meal", { id: toastId });
        }
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  useEffect(() => {
    if (selectedMeal && updateOpen) {
      form.setFieldValue("name", selectedMeal.name);
      form.setFieldValue("description", selectedMeal.description);
      form.setFieldValue("price", selectedMeal.price);
      form.setFieldValue("categoryId", selectedMeal.category.id);
      setPreview(selectedMeal.image);
    }
  }, [selectedMeal, updateOpen]);

  if (meals.length === 0) {
    return (
      <div className="text-center">
        <p className="text-lg font-medium text-gray-600">No meals available.</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableCaption className="py-4">List of available meals</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {meals.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>
                <img
                  src={meal.image}
                  className="h-12 w-12 rounded-md object-cover"
                />
              </TableCell>
              <TableCell>{meal.name}</TableCell>
              <TableCell>{meal.category.cuisineType}</TableCell>
              <TableCell>{meal.price}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setSelectedMeal(meal);
                    setViewOpen(true);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setSelectedMeal(meal);
                    setUpdateOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(meal.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </DialogClose>

          {selectedMeal && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMeal.name}</DialogTitle>
                <DialogDescription>
                  {selectedMeal.category.cuisineType}
                </DialogDescription>
              </DialogHeader>

              <img
                src={selectedMeal.image}
                className="h-48 w-full rounded-md object-cover"
              />

              <p className="text-sm">{selectedMeal.description}</p>
              <p className="font-semibold">Price: {selectedMeal.price}</p>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </DialogClose>

          <DialogHeader>
            <DialogTitle>Update Meal</DialogTitle>
            <DialogDescription>
              Update meal details including category
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
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
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
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
                        className="mt-2 h-40 w-full rounded-md object-cover"
                      />
                    )}
                    <FieldDescription>
                      Upload a new image if needed
                    </FieldDescription>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <FieldSeparator />
            </FieldGroup>

            <DialogFooter>
              <Button type="submit">Update Meal</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
