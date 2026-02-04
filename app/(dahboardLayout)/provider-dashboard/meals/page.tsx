import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function MealsPage() {
  return (
    <div>
      <div className="flex justify-end">
        <Link href="/provider-dashboard/add-meals">
          <Button className="border-green-300 hover:bg-green-500" variant="outline">Add Meals</Button>
        </Link>
      </div>
    </div>
  );
}
