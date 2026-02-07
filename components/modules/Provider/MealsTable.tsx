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
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, Eye, Trash2, Pencil } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { deleteMeal, updateMeal } from "@/Actions/provider.action";
import { toast } from "sonner";

type Meal = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: {
    id: string;
    cuisineType: string;
  };
};

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  price: z.number(),
  image: z.any().optional(),
});
type UpdateMealFormValues = z.infer<typeof formSchema>;
export default function MealsTable({ meals }: { meals: Meal[] }) {
  const [viewOpen, setViewOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleView = (meal: Meal) => {
    setSelectedMeal(meal);
    setViewOpen(true);
  };

  const handleUpdateOpen = (meal: Meal) => {
    setSelectedMeal(meal);
    setUpdateOpen(true);
  };

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
      name: selectedMeal?.name ?? "",
      description: selectedMeal?.description ?? "",
      price: selectedMeal?.price ?? 0,
      image: undefined as File | undefined,
    } as UpdateMealFormValues,
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      if (!selectedMeal) return;
      console.log(value);
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("price", String(value.price));
      // if (value.image) formData.append("image", value.image);

      // const  data  = await updateMeal(selectedMeal.id, formData);
      // console.log(data)
      // const toastId = toast.loading("Updating meal...");
      // if (data) {
      //   toast.success("Meal updated successfully", { id: toastId });
      //   setUpdateOpen(false);
      //   setPreview(null);
      // } else {
      //   toast.error("Failed to update meal", { id: toastId });
      // }
    },
  });

  useEffect(() => {
    if (selectedMeal) setPreview(selectedMeal.image);
  }, [selectedMeal]);

  if (meals.length === 0) {
    return (
      <div
        className="
    "
      >
        <div className="text-center">
          <p className="text-lg font-medium text-gray-600">
            No meals available.
          </p>
        </div>
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
                  onClick={() => handleView(meal)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleUpdateOpen(meal)}
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

              <DialogFooter>
                <Button
                  size="icon"
                  onClick={() => {
                    setViewOpen(false);
                    handleUpdateOpen(selectedMeal);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </DialogFooter>
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
                    <FieldLabel>Name</FieldLabel>
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
                name="image"
                children={(field) => (
                  <Field>
                    <FieldLabel>Meal Image</FieldLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.handleChange(file);
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="mt-2 h-40 w-full rounded-md object-cover"
                      />
                    )}
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <FieldSeparator />
            </FieldGroup>

            <DialogFooter>
              <Button type="submit">
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
