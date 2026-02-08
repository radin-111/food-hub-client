"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export default function MealsSearchBar({ categories }: { categories: Object[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(categories)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;

    const params = new URLSearchParams(searchParams.toString());
    
    params.set("search", search);
    params.set("page", "1"); 

    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex items-center gap-3 rounded-xl border bg-background p-3 shadow-sm focus-within:ring-2 focus-within:ring-primary">
        <Input
          name="search"
          defaultValue={searchParams.get("search") || ""}
          placeholder="Search meals by name, cuisine, or category…"
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button type="submit" className="rounded-lg px-6">
          Search
        </Button>
      </div>
    </form>
  );
}
