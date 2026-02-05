"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { updateCategories } from "@/Actions/category.action";
import { toast } from "sonner";

type Category = {
  id: string;
  cuisineType: string;
};

export default function AllCategories({ data }: { data: Category[] }) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categoryName, setCategoryName] = useState("");

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-10">
        No categories found
      </div>
    );
  }

  const handleUpdateClick = (category: Category) => {
    setSelectedCategory(category);
    setCategoryName(category.cuisineType);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!selectedCategory) return;
    const updatedCategory = {
      id: selectedCategory.id,
      cuisineType: categoryName,
    };

  

    toast.info("Updating category...");

    try {
      const success = await updateCategories(updatedCategory);
      if (success) {
        toast.success("Category updated successfully");
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      toast.error("An error occurred while updating the category");
    }

    setOpen(false);
  };

  return (
    <>
      <div className="max-w-4xl my-2 rounded-xl border bg-background shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Food Categories</h2>
          <p className="text-sm text-muted-foreground">
            Manage available cuisine categories
          </p>
        </div>

        <Table>
          <TableCaption className="py-4">
            List of available food categories
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[140px]">ID</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead className="text-right w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={item.id}
                className={`
                  ${index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                  hover:bg-muted transition-colors
                `}
              >
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {item.id}
                </TableCell>

                <TableCell className="font-medium">
                  {item.cuisineType}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateClick(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium">Category Name</label>
              <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
